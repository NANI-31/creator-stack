import axios from "../../../services/api";
import type { Notification } from "../../../types";

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  page: number;
  pages: number;
}

export interface AdminNotificationsApiResponse {
  success: boolean;
  message: string;
  data: NotificationsResponse;
}

export interface NotificationFilters {
  status?: "read" | "unread";
  type?: string;
  priority?: string;
  category?: string;
  limit?: number;
  page?: number;
}

export const getAdminNotifications = async (
  filters: NotificationFilters = {}
) => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.type) params.append("type", filters.type);
  if (filters.priority) params.append("priority", filters.priority);
  if (filters.category) params.append("category", filters.category);
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.page) params.append("page", filters.page.toString());

  return await axios.get<AdminNotificationsApiResponse>(
    `/admin/notifications?${params.toString()}`
  );
};

export const markNotificationAsRead = async (id: string) => {
  return await axios.patch(`/admin/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async () => {
  return await axios.patch("/admin/notifications/read-all");
};

export const deleteNotification = async (id: string) => {
  return await axios.delete(`/admin/notifications/${id}`);
};

export const clearReadNotifications = async () => {
  return await axios.delete("/admin/notifications/clear-read");
};
