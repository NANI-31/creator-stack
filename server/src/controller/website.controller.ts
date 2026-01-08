import { Request, Response } from "express";
import Website from "../model/website.model";
import Category from "../model/category.model";
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

    return sendResponse(res, 200, true, "Websites fetched successfully", {
      websites,
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

    return sendResponse(res, 200, true, "Trending websites fetched", websites);
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

    return sendResponse(
      res,
      200,
      true,
      "Website details fetched successfully",
      website
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};
