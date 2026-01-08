import React, { useState, useEffect, useCallback } from "react";
import { HiCheck, HiTrash, HiRefresh } from "react-icons/hi";
import NotificationList from "../components/NotificationList";
import NotificationDetail from "../components/NotificationDetail";
import {
  getAdminNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearReadNotifications,
} from "../services/adminNotification.service";
import type { Notification } from "../../../types";
import { toast } from "react-hot-toast";

const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [stats, setStats] = useState({ total: 0, unreadCount: 0 });

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getAdminNotifications({
        status: filter === "unread" ? "unread" : undefined,
        limit: 50, // Fetch more for scrolling list
      });
      setNotifications(data.notifications);
      setStats({ total: data.total, unreadCount: data.unreadCount });

      // Update selected notification if it exists in new list, else deselect if deleted
      if (selectedNotification) {
        const found = data.notifications.find(
          (n) => n._id === selectedNotification._id
        );
        if (found) {
          setSelectedNotification(found);
        } else {
          // Keep it selected but maybe mark as deleted? Or just deselect if not found?
          // If we support pagination, it might be on another page.
          // For now, let's keep it if we have it in state, but logic might need refinement.
        }
      }
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  }, [filter, selectedNotification]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleSelect = async (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      await handleMarkRead(notification._id!, false); // Don't refresh list yet, optimistically update
    }
  };

  const handleMarkRead = async (id: string, refresh = true) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n: Notification) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
      setStats((prev) => ({
        ...prev,
        unreadCount: Math.max(0, prev.unreadCount - 1),
      }));
      if (selectedNotification?._id === id) {
        setSelectedNotification((prev) =>
          prev ? { ...prev, isRead: true } : null
        );
      }
      if (refresh) fetchNotifications();
    } catch (error) {
      //   toast.error("Failed to update notification");
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this notification?"))
      return;

    try {
      await deleteNotification(id);
      setNotifications((prev) =>
        prev.filter((n: Notification) => n._id !== id)
      );
      if (selectedNotification?._id === id) {
        setSelectedNotification(null);
      }
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) =>
        prev.map((n: Notification) => ({ ...n, isRead: true }))
      );
      setStats((prev) => ({ ...prev, unreadCount: 0 }));
      toast.success("All marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  const handleClearRead = async () => {
    if (!window.confirm("Delete all read notifications?")) return;
    try {
      await clearReadNotifications();
      fetchNotifications();
      toast.success("Cleared read notifications");
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
      {/* List Column */}
      <div className="w-full md:w-1/3 min-w-[320px] bg-white rounded-4xl shadow-sm flex flex-col overflow-hidden border border-(--color-secondary)/10">
        {/* Header */}
        <div className="p-4 border-b border-(--color-secondary)/10 bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-(--color-sextary)">Inbox</h2>
            <div className="flex gap-2">
              <button
                onClick={fetchNotifications}
                className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                title="Refresh"
              >
                <HiRefresh
                  size={18}
                  className={isLoading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                filter === "all"
                  ? "bg-white text-(--color-tertiary) shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                filter === "unread"
                  ? "bg-white text-(--color-tertiary) shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Unread
              {stats.unreadCount > 0 && (
                <span className="ml-2 bg-(--color-tertiary) text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {stats.unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-2 border-b border-(--color-secondary)/10 flex justify-between items-center bg-white">
          <div className="text-xs text-gray-400 px-2">
            {stats.total} messages
          </div>
          <div className="flex gap-1">
            <button
              onClick={handleMarkAllRead}
              className="p-1.5 text-gray-500 hover:text-(--color-tertiary) hover:bg-(--color-tertiary)/10 rounded-lg text-xs font-medium flex items-center gap-1"
            >
              <HiCheck size={14} /> Mark all read
            </button>
            <button
              onClick={handleClearRead}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg text-xs font-medium flex items-center gap-1"
            >
              <HiTrash size={14} /> Clear read
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading && notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : (
            <NotificationList
              notifications={notifications}
              selectedId={selectedNotification?._id}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onMarkRead={(id, e) => {
                e.stopPropagation();
                handleMarkRead(id);
              }}
            />
          )}
        </div>
      </div>

      {/* Detail Column */}
      <div className="flex-1 bg-white rounded-4xl shadow-sm overflow-hidden border border-(--color-secondary)/10 hidden md:flex flex-col">
        <NotificationDetail
          notification={selectedNotification}
          onDelete={(id) => handleDelete(id)}
          onMarkRead={(id) => handleMarkRead(id)}
        />
      </div>
    </div>
  );
};

export default AdminNotifications;
