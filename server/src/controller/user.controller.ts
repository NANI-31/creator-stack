import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Website from "../model/website.model";
import { sendResponse, sendError } from "../utils/responseHandler";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    // In a real app, you would also fetch ratings and comments count
    const contributionsCount = await Website.countDocuments({ author: userId });
    const approvedCount = await Website.countDocuments({
      author: userId,
      status: "Approved",
    });

    // Aggregate upvotes from all user-contributed websites
    const websites = await Website.find({ author: userId });
    const totalUpvotes = websites.reduce(
      (acc, site) => acc + (site.stats.upvotes || 0),
      0
    );
    const avgRating =
      websites.length > 0
        ? websites.reduce((acc, site) => acc + (site.stats.rating || 0), 0) /
          websites.length
        : 0;

    return sendResponse(
      res,
      200,
      true,
      "Dashboard stats fetched successfully",
      {
        stats: {
          contributed: contributionsCount,
          approved: approvedCount,
          upvotes: totalUpvotes,
          rating: Number(avgRating.toFixed(1)),
          comments: 0, // Placeholder
        },
      }
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const getMyContributions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const websites = await Website.find({ author: userId })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, true, "User contributions fetched", websites);
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const toggleSavedWebsite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { websiteId } = req.params;

    const user = await import("../model/user.model").then((m) =>
      m.default.findById(userId)
    );

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const isSaved = user.savedWebsites.includes(websiteId as any);

    if (isSaved) {
      user.savedWebsites = user.savedWebsites.filter(
        (id) => id.toString() !== websiteId
      );
    } else {
      user.savedWebsites.push(websiteId as any);
    }

    await user.save();

    return sendResponse(
      res,
      200,
      true,
      isSaved ? "Website removed from saved" : "Website saved successfully",
      { isSaved: !isSaved }
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const getSavedWebsites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { category, sort, limit = 10, page = 1 } = req.query;

    // Build population filter
    const match: any = {};
    if (category) {
      const cat = await import("../model/category.model").then((m) =>
        m.default.findOne({ slug: category as string })
      );
      if (cat) match.category = cat._id;
    }

    // Build sort options
    const sortOptions: any = {};
    if (sort === "trending") sortOptions["stats.upvotes"] = -1;
    else if (sort === "top-rated") sortOptions["stats.rating"] = -1;
    else sortOptions.createdAt = -1; // Default to newest

    const user = await import("../model/user.model").then((m) =>
      m.default.findById(userId).populate({
        path: "savedWebsites",
        match,
        options: {
          sort: sortOptions,
          limit: Number(limit),
          skip: (Number(page) - 1) * Number(limit),
        },
        populate: [
          { path: "category", select: "name slug" },
          { path: "author", select: "username fullName" },
        ],
      })
    );

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    // Since we are monitoring simple list, we need total count for pagination for the filtered result.
    // However, finding total count with population match is tricky in one go.
    // A simpler approach for 'total' of SAVED websites matching criteria:

    // 1. Get ALL saved IDs.
    // 2. Count Websites where _id IN savedIDs AND match criteria.
    const fullUser = await import("../model/user.model").then((m) =>
      m.default.findById(userId)
    );

    const savedIds = fullUser?.savedWebsites || [];
    const query = { _id: { $in: savedIds }, ...match };
    const total = await Website.countDocuments(query);

    return sendResponse(res, 200, true, "Saved websites fetched", {
      websites: user.savedWebsites,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};
