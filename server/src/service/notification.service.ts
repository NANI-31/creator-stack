import Notification from "../model/notification.model";
import mongoose from "mongoose";

export const createNotification = async (data: {
  recipient: mongoose.Types.ObjectId | string;
  title: string;
  message: string;
  type?: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  link?: string;
}) => {
  try {
    const notification = await Notification.create(data);
    return notification;
  } catch (err: any) {
    console.error("Error creating notification:", err.message);
    return null;
  }
};

export const getUnreadCount = async (
  userId: string | mongoose.Types.ObjectId
) => {
  try {
    return await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });
  } catch (err: any) {
    return 0;
  }
};
