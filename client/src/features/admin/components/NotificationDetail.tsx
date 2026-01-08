import React from "react";
import type { Notification } from "../../../types";
import { format } from "date-fns";
import {
  HiCheckCircle,
  HiExclamation,
  HiExclamationCircle,
  HiInformationCircle,
  HiTrash,
  HiExternalLink,
  HiCheck,
} from "react-icons/hi";
import Button from "../../../components/ui/Button";

interface NotificationDetailProps {
  notification: Notification | null;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({
  notification,
  onDelete,
  onMarkRead,
}) => {
  if (!notification) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-(--color-quinary)/50 p-8 text-center bg-(--color-primary)/5 rounded-[2rem]">
        <div className="w-16 h-16 bg-(--color-secondary)/10 rounded-full flex items-center justify-center mb-4">
          <HiInformationCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-(--color-sextary) mb-1">
          Select a notification
        </h3>
        <p>Choose an item from the list to view details and take action.</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return <HiCheckCircle className="text-green-500" size={32} />;
      case "WARNING":
        return <HiExclamation className="text-yellow-500" size={32} />;
      case "ERROR":
        return <HiExclamationCircle className="text-red-500" size={32} />;
      default:
        return <HiInformationCircle className="text-blue-500" size={32} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Detail Header */}
      <div className="p-6 border-b border-(--color-secondary)/20 flex justify-between items-start bg-white rounded-t-3xl">
        <div className="flex gap-4">
          <div className="mt-1">{getIcon(notification.type)}</div>
          <div>
            <h2 className="text-xl font-bold text-(--color-sextary) leading-snug">
              {notification.title}
            </h2>
            <div className="flex items-center gap-3 mt-2 text-sm text-(--color-quinary)">
              <span>{format(new Date(notification.createdAt), "PPpp")}</span>
              <span className="w-1 h-1 bg-current rounded-full" />
              <span className="capitalize">{notification.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-white/50">
        <div className="prose max-w-none text-(--color-quinary)">
          <p className="whitespace-pre-wrap leading-relaxed text-base">
            {notification.message}
          </p>
        </div>

        {notification.link && (
          <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-(--color-sextary)">
                Related Resource
              </p>
              <p className="text-xs text-gray-500 truncate max-w-xs xl:max-w-md">
                {notification.link}
              </p>
            </div>
            <a
              href={notification.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-(--color-tertiary) hover:bg-(--color-tertiary)/10 rounded-xl transition-colors"
            >
              <HiExternalLink size={20} />
            </a>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="p-6 border-t border-(--color-secondary)/20 bg-white rounded-b-3xl">
        <div className="flex flex-wrap gap-4 justify-end">
          {!notification.isRead && (
            <Button
              variant="outline"
              onClick={() => onMarkRead(notification._id!)}
              className="flex items-center gap-2"
            >
              <HiCheck size={18} />
              Mark as Read
            </Button>
          )}

          <Button
            variant="danger"
            onClick={() => onDelete(notification._id!)}
            className="flex items-center gap-2"
          >
            <HiTrash size={18} />
            Delete
          </Button>

          {notification.link && (
            <a href={notification.link} target="_blank" rel="noreferrer">
              <Button className="flex items-center gap-2">
                <HiExternalLink size={18} />
                View Details
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
