import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Notification from "../model/notification.model";
import { sendResponse, sendError } from "../utils/responseHandler";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const notifications = await Notification.find({ recipient: userId }).sort({
      createdAt: -1,
    });

    const unreadCount = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });

    return sendResponse(res, 200, true, "Notifications fetched successfully", {
      notifications,
      unreadCount,
    });
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipient: userId },
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
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    await Notification.updateMany({ recipient: userId }, { isRead: true });

    return sendResponse(res, 200, true, "All notifications marked as read");
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};

export const deleteNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      recipient: userId,
    });

    if (!notification) {
      return sendError(res, 404, "Notification not found");
    }

    return sendResponse(res, 200, true, "Notification deleted");
  } catch (err: any) {
    return sendError(res, 500, "Internal Server Error", err.message);
  }
};
