import { Request, Response } from "express";
import AuditLog from "../model/auditLog.model";
import { sendResponse, sendError } from "../utils/responseHandler";
import { logger } from "../config/logger";

// @desc    Get all audit logs
// @route   GET /api/admin/audit-logs
// @access  Admin, Moderator
export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 20,
      adminId,
      action,
      entityType,
      entityId,
      startDate,
      endDate,
      search,
    } = req.query;

    const query: any = {};

    // Filters
    if (adminId) query.adminId = adminId;
    if (action) query.action = action;
    if (entityType) query.entityType = entityType;
    if (entityId) query.entityId = entityId;

    // Date Range Filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate as string);
      if (endDate) query.createdAt.$lte = new Date(endDate as string);
    }

    // Search (Admin Name or Entity ID if valid objectId)
    if (search) {
      // If search looks like an ObjectId, search by entityId or adminId
      // Else search by adminName regex
      const searchRegex = new RegExp(search as string, "i");
      query.$or = [{ adminName: searchRegex }];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const logs = await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await AuditLog.countDocuments(query);

    return sendResponse(res, 200, true, "Audit logs fetched successfully", {
      logs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error: any) {
    logger.error(`Error fetching audit logs: ${error.message}`);
    return sendError(res, 500, "Failed to fetch audit logs");
  }
};
