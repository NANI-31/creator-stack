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
