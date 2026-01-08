import api from "../../../services/api";
import type { Notification } from "../../../types";

export const notificationApi = {
  getAll: () =>
    api.get<{
      success: boolean;
      data: { notifications: Notification[]; unreadCount: number };
    }>("/notifications"),

  markAsRead: (id: string) =>
    api.patch<{ success: boolean; data: Notification }>(
      `/notifications/${id}/read`
    ),

  markAllAsRead: () =>
    api.patch<{ success: boolean; message: string }>("/notifications/read-all"),

  delete: (id: string) =>
    api.delete<{ success: boolean; message: string }>(`/notifications/${id}`),
};
