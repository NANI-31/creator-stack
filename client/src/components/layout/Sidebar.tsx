import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineGlobeAlt,
  HiOutlineUserCircle,
  HiOutlineBookmark,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlinePlusCircle,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

import { useAppSelector } from "../../app/hooks";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { user } = useAppSelector((state) => state.auth);
  const menuItems = [
    { name: "Dashboard Overview", icon: HiOutlineHome, path: "/dashboard" },
    { name: "Explore Websites", icon: HiOutlineGlobeAlt, path: "/websites" },
    {
      name: "My Contributions",
      icon: HiOutlineUserCircle,
      path: "/my-contributions",
    },
    { name: "Submit Website", icon: HiOutlinePlusCircle, path: "/submit" },
    { name: "Saved / Bookmarked", icon: HiOutlineBookmark, path: "/saved" },
    { name: "Activity", icon: HiOutlineChartBar, path: "/activity" },
    { name: "Settings", icon: HiOutlineCog, path: "/settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 md:top-20 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] bg-(--color-secondary)/30 backdrop-blur-xl border-r border-(--color-secondary)/40 transition-all duration-300 z-40 
        ${
          isCollapsed
            ? "w-20 -translate-x-full md:translate-x-0"
            : "w-64 translate-x-0"
        }
      `}
    >
      <div className="flex flex-col h-full py-6">
        {/* Toggle Button (Desktop Only) */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-4 w-6 h-6 bg-white border border-(--color-secondary)/40 rounded-full items-center justify-center text-quaternary shadow-sm hover:scale-110 transition-transform hidden md:flex"
        >
          {isCollapsed ? (
            <HiChevronRight size={14} />
          ) : (
            <HiChevronLeft size={14} />
          )}
        </button>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative
                ${
                  isActive
                    ? "bg-quaternary text-white shadow-lg shadow-orange-500/20"
                    : "text-(--color-quinary)/70 hover:bg-(--color-secondary)/40 hover:text-(--color-sextary)"
                }
              `}
            >
              <item.icon size={22} className={isCollapsed ? "mx-auto" : ""} />
              {!isCollapsed && (
                <span className="font-semibold text-sm">{item.name}</span>
              )}

              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1 bg-(--color-sextary) text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Info (Bottom) */}
        {!isCollapsed && (
          <div className="px-4 py-4 mt-auto">
            <div className="p-4 bg-white/40 rounded-2xl border border-white/60">
              <p className="text-[10px] font-bold text-quaternary uppercase tracking-widest mb-1">
                Status
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-(--color-sextary)">
                  {user?.role || "Contributor"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
