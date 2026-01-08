import { Request, Response } from "express";
import mongoose from "mongoose";
import Category from "../model/category.model";
import { sendResponse, sendError } from "../utils/responseHandler";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ websiteCount: -1 });
    return sendResponse(
      res,
      200,
      true,
      "Categories fetched successfully",
      categories
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, icon, color } = req.body;

    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }],
    });
    if (existingCategory) {
      return sendError(res, 400, "Category already exists");
    }

    const category = new Category({ name, slug, description, icon, color });
    await category.save();

    return sendResponse(
      res,
      201,
      true,
      "Category created successfully",
      category
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category) {
      return sendError(res, 404, "Category not found");
    }
    return sendResponse(
      res,
      200,
      true,
      "Category updated successfully",
      category
    );
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reassignTo } = req.body;

    if (reassignTo) {
      await mongoose
        .model("Website")
        .updateMany({ category: id }, { category: reassignTo });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return sendError(res, 404, "Category not found");
    }
    return sendResponse(res, 200, true, "Category deleted successfully");
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};
