import { Request, Response } from "express";
import User from "../model/user.model";
import Website from "../model/website.model";
import Report from "../model/report.model";
import Settings from "../model/settings.model";
import { sendResponse, sendError } from "../utils/responseHandler";

// Allowed values for validation
const ALLOWED_ROLES = [
  "Developer",
  "Designer",
  "Creator",
  "Editor",
  "Moderator",
  "Admin",
];
const ALLOWED_USER_STATUSES = ["Active", "Suspended", "Banned"];
const ALLOWED_SUBMISSION_STATUSES = ["Pending", "Approved", "Rejected"];
const ALLOWED_REPORT_STATUSES = ["Pending", "Resolved", "Dismissed"];

// --- Submissions ---

export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    const query: any = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const submissions = await Website.find(query)
      .populate("category", "name")
      .populate("author", "username email avatar")
      .sort({ createdAt: -1 });

    return sendResponse(
      res,
      200,
      true,
      "Submissions fetched successfully",
      submissions
    );
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status value
    if (!status || !ALLOWED_SUBMISSION_STATUSES.includes(status)) {
      return sendError(
        res,
        400,
        `Invalid status. Allowed values: ${ALLOWED_SUBMISSION_STATUSES.join(
          ", "
        )}`
      );
    }

    const website = await Website.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!website) {
      return sendError(res, 404, "Submission not found");
    }

    return sendResponse(res, 200, true, "Submission status updated", website);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

// --- Users ---

export const getAdminUsers = async (req: Request, res: Response) => {
  try {
    const { role, status, search } = req.query;
    const query: any = {};

    if (role && role !== "All") {
      query.role = role;
    }

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, "Users fetched successfully", users);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role value
    if (!role || !ALLOWED_ROLES.includes(role)) {
      return sendError(
        res,
        400,
        `Invalid role. Allowed values: ${ALLOWED_ROLES.join(", ")}`
      );
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendResponse(res, 200, true, "User role updated", user);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, banReason } = req.body;

    // Validate status value
    if (!status || !ALLOWED_USER_STATUSES.includes(status)) {
      return sendError(
        res,
        400,
        `Invalid status. Allowed values: ${ALLOWED_USER_STATUSES.join(", ")}`
      );
    }

    // Require reason for banning
    if (status === "Banned" && !banReason) {
      return sendError(res, 400, "A ban reason is required.");
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status, banReason },
      { new: true }
    );

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendResponse(res, 200, true, "User status updated", user);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

// --- Reports ---

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const { type, status } = req.query;
    const query: any = {};

    if (type && type !== "All") {
      query.type = type;
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const reports = await Report.find(query)
      .populate("reporter", "username email")
      .sort({ createdAt: -1 });

    return sendResponse(
      res,
      200,
      true,
      "Reports fetched successfully",
      reports
    );
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, resolutionNotes } = req.body;

    // Validate status value
    if (!status || !ALLOWED_REPORT_STATUSES.includes(status)) {
      return sendError(
        res,
        400,
        `Invalid status. Allowed values: ${ALLOWED_REPORT_STATUSES.join(", ")}`
      );
    }

    const report = await Report.findByIdAndUpdate(
      id,
      {
        status,
        resolutionNotes,
        resolvedBy: (req as any).user._id,
      },
      { new: true }
    );

    if (!report) {
      return sendError(res, 404, "Report not found");
    }

    return sendResponse(res, 200, true, "Report status updated", report);
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

// --- Analytics ---

export const getAdminAnalytics = async (req: Request, res: Response) => {
  try {
    const totalWebsites = await Website.countDocuments();
    const approvedWebsites = await Website.countDocuments({
      status: "Approved",
    });
    const pendingWebsites = await Website.countDocuments({ status: "Pending" });
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "Active" });
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: "Pending" });

    // Calculate Average Rating
    const ratingResult = await Website.aggregate([
      { $match: { status: "Approved" } },
      { $group: { _id: null, avg: { $avg: "$stats.rating" } } },
    ]);
    const avgRating =
      ratingResult.length > 0 ? ratingResult[0].avg.toFixed(1) : "0.0";

    // Category Distribution
    const categories = await Website.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Top Content
    const topContent = await Website.find({ status: "Approved" })
      .sort({ "stats.upvotes": -1 })
      .limit(5)
      .select("name category stats");

    // Mock growth series
    const userGrowth = [
      { label: "Mon", value: 40 },
      { label: "Tue", value: 65 },
      { label: "Wed", value: 45 },
      { label: "Thu", value: 90 },
      { label: "Fri", value: 75 },
      { label: "Sat", value: 30 },
      { label: "Sun", value: 55 },
    ];

    return sendResponse(res, 200, true, "Analytics fetched successfully", {
      kpis: {
        totalSubmissions: {
          value: totalWebsites,
          trend: "+12%",
          isPositive: true,
        },
        activeUsers: { value: activeUsers, trend: "+5%", isPositive: true },
        pendingReviews: {
          value: pendingWebsites,
          trend: "-8%",
          isPositive: true,
        },
        activeReports: {
          value: pendingReports,
          trend: "+2",
          isPositive: false,
        },
        engagementRate: { value: "18.4", trend: "+2.1%", isPositive: true },
        avgRating: { value: avgRating, trend: "+0.2", isPositive: true },
      },
      categoryDistribution: categories.map((c) => ({
        name: c._id || "Uncategorized",
        count: c.count,
      })),
      topContent: topContent.map((w: any) => ({
        title: w.name,
        category: w.category,
        views: w.stats?.upvotes || 0,
        rating: w.stats?.rating || 0,
      })),
      userGrowth, // Frontend expects userGrowth
    });
  } catch (error: any) {
    console.error("Analytics Error:", error);
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

// --- Settings ---

export const getAdminSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return sendResponse(
      res,
      200,
      true,
      "Settings fetched successfully",
      settings
    );
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};

export const updateAdminSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    return sendResponse(
      res,
      200,
      true,
      "Settings updated successfully",
      settings
    );
  } catch (error: any) {
    return sendError(res, 500, "Internal Server Error", error.message);
  }
};
