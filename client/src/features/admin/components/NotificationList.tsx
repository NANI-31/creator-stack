import React from "react";
import type { Notification } from "../../../types";
import { format } from "date-fns";
import {
  HiCheckCircle,
  HiExclamation,
  HiExclamationCircle,
  HiInformationCircle,
  HiTrash,
} from "react-icons/hi";
import clsx from "clsx";

interface NotificationListProps {
  notifications: Notification[];
  selectedId?: string;
  onSelect: (notification: Notification) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onMarkRead: (id: string, e: React.MouseEvent) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications = [],
  selectedId,
  onSelect,
  onDelete,
  onMarkRead,
}) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-(--color-quinary)/50">
        <HiInformationCircle size={48} className="mb-4 opacity-20" />
        <p>No notifications found</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return <HiCheckCircle className="text-green-500" size={20} />;
      case "WARNING":
        return <HiExclamation className="text-yellow-500" size={20} />;
      case "ERROR":
        return <HiExclamationCircle className="text-red-500" size={20} />;
      default:
        return <HiInformationCircle className="text-blue-500" size={20} />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="divide-y divide-(--color-secondary)/20">
      {notifications.map((notification) => (
        <div
          key={notification._id}
          onClick={() => onSelect(notification)}
          className={clsx(
            "p-4 cursor-pointer hover:bg-(--color-secondary)/5 transition-colors relative group",
            selectedId === notification._id
              ? "bg-(--color-secondary)/10 border-l-4 border-(--color-tertiary)"
              : "border-l-4 border-transparent",
            !notification.isRead && "bg-blue-50/50"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 shrink-0">{getIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4
                  className={clsx(
                    "text-sm font-medium truncate pr-8",
                    !notification.isRead
                      ? "text-(--color-sextary) font-bold"
                      : "text-(--color-quinary)"
                  )}
                >
                  {notification.title}
                </h4>
                <span className="text-xs text-(--color-quinary)/60 shrink-0 whitespace-nowrap ml-2">
                  {format(new Date(notification.createdAt), "MMM d, h:mm a")}
                </span>
              </div>
              <p
                className={clsx(
                  "text-sm line-clamp-2",
                  !notification.isRead
                    ? "text-(--color-quinary)"
                    : "text-(--color-quinary)/70"
                )}
              >
                {notification.message}
              </p>

              <div className="flex items-center gap-2 mt-2">
                {notification.priority && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getPriorityColor(
                      notification.priority
                    )}`}
                  >
                    {notification.priority}
                  </span>
                )}
                {notification.category && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {notification.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions (Hover) */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
            {!notification.isRead && (
              <button
                onClick={(e) => onMarkRead(notification._id!, e)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                title="Mark as read"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              </button>
            )}
            <button
              onClick={(e) => onDelete(notification._id!, e)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
              title="Delete"
            >
              <HiTrash size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
