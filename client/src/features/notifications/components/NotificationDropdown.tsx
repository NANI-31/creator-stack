import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineMailOpen,
} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../slice/notification.slice";
import { formatDistanceToNow } from "date-fns";

const NotificationDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { notifications, isLoading, unreadCount } = useAppSelector(
    (state) => state.notifications
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markNotificationRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return <HiOutlineCheckCircle className="text-green-500" size={20} />;
      case "WARNING":
        return (
          <HiOutlineExclamationCircle className="text-orange-500" size={20} />
        );
      case "ERROR":
        return (
          <HiOutlineExclamationCircle className="text-red-500" size={20} />
        );
      default:
        return <HiOutlineClock className="text-blue-500" size={20} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-4xl shadow-2xl border border-(--color-secondary)/30 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-(--color-secondary)/20 bg-(--color-primary)/20 flex items-center justify-between">
        <h3 className="text-base font-black text-(--color-sextary)">
          Notifications
        </h3>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-[10px] uppercase tracking-widest font-black text-quaternary hover:text-(--color-sextary) transition-colors flex items-center gap-1"
          >
            <HiOutlineMailOpen size={14} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-100 overflow-y-auto custom-scrollbar">
        {isLoading && notifications.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-tertiary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-(--color-quinary)/40">
              Loading notifications...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-(--color-primary) rounded-3xl flex items-center justify-center text-quaternary/30 mx-auto">
              <HiOutlineBell size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-(--color-sextary)">
                All caught up!
              </p>
              <p className="text-xs font-medium text-(--color-quinary)/50">
                No new notifications at the moment.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-(--color-secondary)/10">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`group p-5 flex gap-4 transition-all hover:bg-(--color-primary)/30 relative ${
                  !notification.isRead ? "bg-(--color-primary)/10" : ""
                }`}
                onClick={() =>
                  !notification.isRead && handleMarkAsRead(notification._id)
                }
              >
                {!notification.isRead && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-tertiary rounded-full" />
                )}
                <div
                  className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${
                    notification.type === "SUCCESS"
                      ? "bg-green-50"
                      : notification.type === "WARNING"
                      ? "bg-orange-50"
                      : "bg-blue-50"
                  }`}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <p
                      className={`text-sm font-black leading-tight ${
                        !notification.isRead
                          ? "text-(--color-sextary)"
                          : "text-(--color-quinary)/80"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <span className="text-[10px] font-bold text-(--color-quinary)/40 whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-(--color-quinary)/60 line-clamp-2">
                    {notification.message}
                  </p>
                  {notification.link && (
                    <Link
                      to={notification.link}
                      className="inline-block pt-1 text-[10px] font-black text-quaternary border-b border-transparent hover:border-quaternary transition-all uppercase tracking-widest"
                      onClick={onClose}
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50/50 border-t border-(--color-secondary)/20 text-center">
        <Link
          to="/activity"
          className="text-[10px] font-black text-(--color-quinary)/40 hover:text-quaternary uppercase tracking-widest transition-colors"
          onClick={onClose}
        >
          View all activity
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;
