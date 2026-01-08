import { Request, Response } from "express";
import Notification from "../model/notification.model";
import { sendResponse, sendError } from "../utils/responseHandler";
import { logger } from "../config/logger";

// @desc    Get all notifications for admin
// @route   GET /api/admin/notifications
// @access  Admin, Moderator
export const getAdminNotifications = async (req: Request, res: Response) => {
  try {
    const {
      status,
      type,
      priority,
      category,
      limit = 20,
      page = 1,
    } = req.query;

    const query: any = {};

    // For admin, we might want to fetch notifications addressed to them specifically OR system-wide alerts
    // But typically an "Admin Notification Center" shows system alerts and moderation tasks.
    // For now, let's assume we fetch notifications where the recipient is the current admin user
    // OR notifications that are "System" wide broadcast (if we implement that later).
    // Based on the user request, it seems like a personal inbox for the admin user containing system alerts.

    // However, the request says "Notifications for admins and moderators".
    // Let's stick to the current user's notifications for now, but ensure we populate related data properly.
    if ((req as any).user) {
      query.recipient = (req as any).user._id;
    }

    if (status) {
      if (status === "unread") query.isRead = false;
      if (status === "read") query.isRead = true;
    }

    if (type) query.type = type;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    const skip = (Number(page) - 1) * Number(limit);

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Notification.countDocuments(query);

    // Calculate unread count for the badge
    const unreadCount = await Notification.countDocuments({
      recipient: (req as any).user?._id,
      isRead: false,
    });

    return sendResponse(res, 200, true, "Notifications fetched successfully", {
      notifications,
      total,
      unreadCount,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error: any) {
    logger.error(`Error fetching admin notifications: ${error.message}`);
    return sendError(res, 500, "Failed to fetch notifications");
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/admin/notifications/:id/read
// @access  Admin, Moderator
export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipient: (req as any).user?._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return sendError(res, 404, "Notification not found");
    }

    return sendResponse(
      res,
      200,
      true,
      "Notification marked as read",
      notification
    );
  } catch (error: any) {
    logger.error(`Error marking notification as read: ${error.message}`);
    return sendError(res, 500, "Failed to update notification");
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/admin/notifications/read-all
// @access  Admin, Moderator
export const markAllNotificationsAsRead = async (
  req: Request,
  res: Response
) => {
  try {
    await Notification.updateMany(
      { recipient: (req as any).user?._id, isRead: false },
      { isRead: true }
    );

    return sendResponse(
      res,
      200,
      true,
      "All notifications marked as read",
      null
    );
  } catch (error: any) {
    logger.error(`Error marking all notifications as read: ${error.message}`);
    return sendError(res, 500, "Failed to update notifications");
  }
};

// @desc    Delete a notification
// @route   DELETE /api/admin/notifications/:id
// @access  Admin, Moderator
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      recipient: (req as any).user?._id,
    });

    if (!notification) {
      return sendError(res, 404, "Notification not found");
    }

    return sendResponse(res, 200, true, "Notification deleted", null);
  } catch (error: any) {
    logger.error(`Error deleting notification: ${error.message}`);
    return sendError(res, 500, "Failed to delete notification");
  }
};

// @desc    Delete all read notifications
// @route   DELETE /api/admin/notifications/clear-read
// @access  Admin, Moderator
export const clearReadNotifications = async (req: Request, res: Response) => {
  try {
    await Notification.deleteMany({
      recipient: (req as any).user?._id,
      isRead: true,
    });

    return sendResponse(res, 200, true, "Read notifications cleared", null);
  } catch (error: any) {
    logger.error(`Error clearing read notifications: ${error.message}`);
    return sendError(res, 500, "Failed to clear notifications");
  }
};
