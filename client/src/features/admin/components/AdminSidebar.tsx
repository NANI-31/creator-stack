import React from "react";
import {
  HiOutlineViewGrid,
  HiOutlineGlobeAlt,
  HiOutlineCollection,
  HiOutlineChatAlt,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineLogout,
  HiOutlineUser,
} from "react-icons/hi";
import { NavLink, Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import type { IconType } from "react-icons";

interface NavItem {
  name: string;
  path: string;
  icon: IconType;
  exact?: boolean;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const navigation: NavSection[] = [
    {
      title: "Main",
      items: [
        {
          name: "Dashboard",
          path: "/admin",
          icon: HiOutlineViewGrid,
          exact: true,
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          name: "Website Submissions",
          path: "/admin/submissions",
          icon: HiOutlineGlobeAlt,
          badge: 12,
        },
        {
          name: "Categories",
          path: "/admin/categories",
          icon: HiOutlineCollection,
        },
        {
          name: "Comments & Reports",
          path: "/admin/moderation",
          icon: HiOutlineChatAlt,
          badge: 3,
        },
      ],
    },
    {
      title: "Users",
      items: [
        {
          name: "Users Management",
          path: "/admin/users",
          icon: HiOutlineUsers,
        },
        {
          name: "Roles / Moderators",
          path: "/admin/roles",
          icon: HiOutlineShieldCheck,
        },
      ],
    },
    {
      title: "Insights",
      items: [
        {
          name: "Analytics",
          path: "/admin/analytics",
          icon: HiOutlineChartBar,
        },
        {
          name: "Audit Logs",
          path: "/admin/audit-logs",
          icon: HiOutlineClipboardList,
        },
      ],
    },
    {
      title: "System",
      items: [
        { name: "Settings", path: "/admin/settings", icon: HiOutlineCog },
        {
          name: "Notifications",
          path: "/admin/notifications",
          icon: HiOutlineBell,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-sextary/40 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 bg-white border-r border-(--color-secondary)/30 z-50 transition-all duration-300 transform lg:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-(--color-secondary)/10">
            <div
              className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              <div className="w-8 h-8 bg-linear-to-br from-tertiary to-quaternary rounded-lg flex items-center justify-center text-white shrink-0">
                <span className="font-black text-xs">CS</span>
              </div>
              <span className="font-black text-(--color-sextary) whitespace-nowrap">
                Admin Panel
              </span>
            </div>

            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-xl text-(--color-quinary)/40 hover:bg-(--color-primary) hover:text-quaternary transition-colors"
            >
              {isCollapsed ? (
                <HiOutlineChevronRight size={20} />
              ) : (
                <HiOutlineChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
            {navigation.map((section, idx) => (
              <div key={section.title} className={idx !== 0 ? "mt-8" : ""}>
                <div
                  className={`px-6 mb-3 flex items-center h-4 transition-all duration-300 ${
                    isCollapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  {!isCollapsed ? (
                    <span className="text-[10px] font-black text-(--color-quinary)/30 uppercase tracking-[0.2em]">
                      {section.title}
                    </span>
                  ) : (
                    <div className="w-4 h-px bg-(--color-secondary)/20" />
                  )}
                </div>

                <div className="px-3 space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) => `
                        group relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200
                        ${
                          isActive
                            ? "bg-quaternary text-white shadow-lg shadow-orange-500/20"
                            : "text-(--color-quinary)/60 hover:bg-(--color-primary) hover:text-(--color-sextary)"
                        }
                      `}
                    >
                      <item.icon size={22} className="shrink-0" />

                      {!isCollapsed && (
                        <span className="text-sm font-bold truncate flex-1">
                          {item.name}
                        </span>
                      )}

                      {item.badge && (
                        <span
                          className={`
                          flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-[10px] font-bold
                          ${
                            isCollapsed
                              ? "absolute top-2 right-2 border-2 border-white"
                              : ""
                          }
                          bg-tertiary text-white
                        `}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="fixed left-20 ml-2 px-3 py-2 bg-sextary text-white text-xs font-bold rounded-xl opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-[60] shadow-xl">
                          {item.name}
                        </div>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer: Profile */}
          <div className="p-4 border-t border-(--color-secondary)/10">
            <div
              className={`bg-(--color-primary)/20 rounded-[2rem] p-2 transition-all duration-300 ${
                isCollapsed ? "items-center" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-white rounded-2xl bg-white shadow-sm flex items-center justify-center text-quaternary font-black text-sm shrink-0 overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.fullName.charAt(0) || "A"
                  )}
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-(--color-sextary) truncate">
                      {user?.fullName || "Admin User"}
                    </p>
                    <p className="text-[10px] font-bold text-quaternary uppercase tracking-wider">
                      Admin
                    </p>
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-(--color-secondary)/20">
                  <Link
                    to="/profile"
                    className="flex-1 flex items-center justify-center p-2 rounded-xl text-(--color-quinary)/40 hover:bg-white hover:text-quaternary transition-all"
                    title="View Profile"
                  >
                    <HiOutlineUser size={18} />
                  </Link>
                  <button
                    className="flex-1 flex items-center justify-center p-2 rounded-xl text-(--color-quinary)/40 hover:bg-red-50 hover:text-red-500 transition-all"
                    title="Logout"
                  >
                    <HiOutlineLogout size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
