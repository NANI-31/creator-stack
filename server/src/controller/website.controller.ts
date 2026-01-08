import { Request, Response } from "express";
import Website from "../model/website.model";
import Category from "../model/category.model";
import Vote from "../model/vote.model";
import { sendResponse, sendError } from "../utils/responseHandler";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createWebsite = async (req: AuthRequest, res: Response) => {
  try {
    const { name, url, description, categorySlug, tags, thumbnail } = req.body;

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return sendError(res, 404, "Category not found");
    }

    const website = new Website({
      name,
      url,
      description,
      category: category._id,
      tags,
      thumbnail,
      author: req.user?._id,
    });

    await website.save();

    // Increment website count in category
    category.websiteCount += 1;
    await category.save();

    return sendResponse(
      res,
      201,
      true,
      "Website submitted successfully",
      website
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const getAllWebsites = async (req: Request, res: Response) => {
  try {
    const { category, sort, limit = 10, page = 1 } = req.query;
    const query: any = { status: "Approved" };

    if (category) {
      const cat = await Category.findOne({ slug: category as string });
      if (cat) query.category = cat._id;
    }

    const sortQuery: any = {};
    if (sort === "trending") sortQuery["stats.upvotes"] = -1;
    else if (sort === "top-rated") sortQuery["stats.rating"] = -1;
    else sortQuery.createdAt = -1;

    const websites = await Website.find(query)
      .populate("category", "name slug")
      .populate("author", "username fullName")
      .sort(sortQuery)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Website.countDocuments(query);

    const userId = (req as AuthRequest).user?._id;
    let websitesWithVote: any[] = websites;

    if (userId) {
      const userVotes = await Vote.find({
        user: userId,
        target: { $in: websites.map((w) => w._id) },
        targetType: "Website",
      });

      const voteMap = new Map(
        userVotes.map((v) => [v.target.toString(), v.voteType])
      );

      websitesWithVote = websites.map((website) => {
        const websiteObj = website.toObject();
        (websiteObj as any).userVote =
          voteMap.get(website._id.toString()) || null;
        return websiteObj;
      });
    }

    return sendResponse(res, 200, true, "Websites fetched successfully", {
      websites: websitesWithVote,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const getTrending = async (req: Request, res: Response) => {
  try {
    const websites = await Website.find({ status: "Approved" })
      .populate("category", "name slug")
      .sort({ "stats.upvotes": -1 })
      .limit(8);

    const userId = (req as AuthRequest).user?._id;
    let websitesWithVote: any[] = websites;

    if (userId) {
      const userVotes = await Vote.find({
        user: userId,
        target: { $in: websites.map((w) => w._id) },
        targetType: "Website",
      });

      const voteMap = new Map(
        userVotes.map((v) => [v.target.toString(), v.voteType])
      );

      websitesWithVote = websites.map((website) => {
        const websiteObj = website.toObject();
        (websiteObj as any).userVote =
          voteMap.get(website._id.toString()) || null;
        return websiteObj;
      });
    }

    return sendResponse(
      res,
      200,
      true,
      "Trending websites fetched",
      websitesWithVote
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const getWebsiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const website = await Website.findById(id)
      .populate("category", "name slug icon color")
      .populate("author", "username fullName avatar");

    if (!website) {
      return sendError(res, 404, "Website not found");
    }

    const userId = (req as AuthRequest).user?._id;
    const websiteObj = website.toObject();

    if (userId) {
      const vote = await Vote.findOne({
        user: userId,
        target: id,
        targetType: "Website",
      });
      (websiteObj as any).userVote = vote ? vote.voteType : null;
    }

    return sendResponse(
      res,
      200,
      true,
      "Website details fetched successfully",
      websiteObj
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const voteWebsite = async (req: any, res: Response) => {
  try {
    const { id: websiteId } = req.params;
    const { voteType } = req.body; // "upvote" or "downvote"
    const userId = req.user?._id;

    if (!voteType || !["upvote", "downvote"].includes(voteType)) {
      return sendError(res, 400, "Invalid vote type");
    }

    const website = await Website.findById(websiteId);
    if (!website) {
      return sendError(res, 404, "Website not found");
    }

    const Vote = (await import("../model/vote.model")).default;

    const existingVote = await Vote.findOne({
      user: userId,
      target: websiteId,
      targetType: "Website",
    });

    let updatedWebsite;

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Toggle Off
        await Vote.findByIdAndDelete(existingVote._id);

        const update =
          voteType === "upvote"
            ? { $inc: { "stats.upvotes": -1 } }
            : { $inc: { "stats.downvotes": -1 } };

        updatedWebsite = await Website.findByIdAndUpdate(websiteId, update, {
          new: true,
        });

        return sendResponse(res, 200, true, "Vote removed successfully", {
          upvotes: updatedWebsite?.stats.upvotes || 0,
          downvotes: updatedWebsite?.stats.downvotes || 0,
          userVote: null,
        });
      } else {
        // Switch Vote Type
        existingVote.voteType = voteType;
        await existingVote.save();

        const update =
          voteType === "upvote"
            ? { $inc: { "stats.upvotes": 1, "stats.downvotes": -1 } }
            : { $inc: { "stats.upvotes": -1, "stats.downvotes": 1 } };

        updatedWebsite = await Website.findByIdAndUpdate(websiteId, update, {
          new: true,
        });

        return sendResponse(res, 200, true, "Vote updated successfully", {
          upvotes: updatedWebsite?.stats.upvotes || 0,
          downvotes: updatedWebsite?.stats.downvotes || 0,
          userVote: voteType,
        });
      }
    }

    // New Vote
    const newVote = new Vote({
      user: userId,
      target: websiteId,
      targetType: "Website",
      voteType,
    });
    await newVote.save();

    const update =
      voteType === "upvote"
        ? { $inc: { "stats.upvotes": 1 } }
        : { $inc: { "stats.downvotes": 1 } };

    updatedWebsite = await Website.findByIdAndUpdate(websiteId, update, {
      new: true,
    });

    return sendResponse(res, 200, true, "Vote recorded successfully", {
      upvotes: updatedWebsite?.stats.upvotes || 0,
      downvotes: updatedWebsite?.stats.downvotes || 0,
      userVote: voteType,
    });
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};
