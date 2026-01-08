import React, { useState } from "react";
import {
  HiSearch,
  HiBell,
  HiMenuAlt2,
  HiOutlineChevronDown,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchScope, setSearchScope] = useState("All");
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard";
    if (path.includes("/admin/submissions")) return "Submissions";
    if (path.includes("/admin/users")) return "Users";
    if (path.includes("/admin/reports")) return "Reports";
    return "Admin Panel";
  };

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white border-b border-(--color-secondary)/30 z-50 flex items-center px-4 md:px-8 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4 lg:w-64">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-(--color-quinary) hover:bg-(--color-primary) rounded-xl transition-colors"
        >
          <HiMenuAlt2 size={24} />
        </button>

        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-tertiary to-quaternary rounded-lg flex items-center justify-center text-white shadow-lg">
              <span className="font-black text-xs">CS</span>
            </div>
            <span className="hidden sm:block font-black text-(--color-sextary) text-lg tracking-tight">
              CreatorStack
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-(--color-secondary)/30">
            <span className="bg-quaternary/10 text-quaternary text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
              Admin
            </span>
            <span className="text-xs font-bold text-(--color-quinary)/40">
              /
            </span>
            <span className="text-xs font-bold text-(--color-sextary)">
              {getPageTitle()}
            </span>
          </div>
        </div>
      </div>

      {/* Center Section: Search */}
      <div className="hidden lg:flex flex-1 justify-center max-w-2xl px-8">
        <div className="relative w-full group">
          <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pr-2 border-r border-transparent group-focus-within:border-(--color-secondary)/30 transition-all">
            <select
              value={searchScope}
              onChange={(e) => setSearchScope(e.target.value)}
              className="bg-transparent text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest outline-none cursor-pointer hover:text-(--color-sextary)"
            >
              <option>All</option>
              <option>Websites</option>
              <option>Users</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search websites, users, or reports..."
            className="w-full bg-(--color-primary)/30 border border-transparent focus:border-quaternary/30 focus:bg-white rounded-2xl py-2 pl-24 pr-10 outline-none text-sm font-medium transition-all"
          />
          <HiSearch
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/30"
            size={18}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2.5 text-(--color-quinary)/50 hover:text-quaternary hover:bg-(--color-primary) rounded-2xl transition-all relative"
          >
            <HiBell size={22} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-tertiary border-2 border-white rounded-full" />
          </button>

          {isNotificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-(--color-secondary)/30 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-(--color-secondary)/10 bg-(--color-primary)/10 flex justify-between items-center">
                  <h3 className="text-sm font-black text-(--color-sextary)">
                    Admin Notifications
                  </h3>
                  <span className="text-[10px] font-bold text-quaternary bg-white px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-(--color-primary)/20 cursor-pointer border-b border-(--color-secondary)/5 transition-colors">
                    <p className="text-xs font-black text-(--color-sextary)">
                      New submission: "Figma Plugins"
                    </p>
                    <p className="text-[10px] text-(--color-quinary)/60 mt-1">
                      Pending approval from community.
                    </p>
                    <p className="text-[9px] font-bold text-(--color-quinary)/40 mt-2 uppercase">
                      2 mins ago
                    </p>
                  </div>
                  <div className="p-4 hover:bg-(--color-primary)/20 cursor-pointer border-b border-(--color-secondary)/5 transition-colors">
                    <p className="text-xs font-black text-(--color-sextary)">
                      Reported comment: @johndoe
                    </p>
                    <p className="text-[10px] text-(--color-quinary)/60 mt-1">
                      Spam detection triggered on tool #142.
                    </p>
                    <p className="text-[9px] font-bold text-(--color-quinary)/40 mt-2 uppercase">
                      1 hour ago
                    </p>
                  </div>
                </div>
                <button className="w-full py-3 text-[10px] font-black text-quaternary hover:bg-quaternary hover:text-white uppercase tracking-widest transition-all">
                  View All Admin Logs
                </button>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 hover:bg-(--color-primary) rounded-2xl transition-all"
          >
            <div className="w-9 h-9 border-2 border-quaternary rounded-xl bg-white flex items-center justify-center text-quaternary font-black text-sm shadow-sm overflow-hidden">
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
            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-(--color-sextary) leading-tight">
                {user?.fullName || "Admin User"}
              </p>
              <p className="text-[10px] font-black text-quaternary uppercase tracking-widest opacity-70">
                Administrator
              </p>
            </div>
            <HiOutlineChevronDown
              className={`text-(--color-quinary)/40 transition-transform duration-300 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
              size={14}
            />
          </button>

          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-(--color-secondary)/30 z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-5 py-3 border-b border-(--color-secondary)/10 mb-1">
                  <p className="text-xs font-black text-(--color-sextary)">
                    {user?.email || "admin@creatorstack.com"}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-5 py-2.5 text-xs font-bold text-(--color-quinary)/70 hover:text-quaternary hover:bg-(--color-primary) transition-all"
                >
                  <HiOutlineUser size={18} /> Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-3 px-5 py-2.5 text-xs font-bold text-(--color-quinary)/70 hover:text-quaternary hover:bg-(--color-primary) transition-all"
                >
                  <HiOutlineCog size={18} /> Settings
                </Link>
                <Link
                  to="/admin/logs"
                  className="flex items-center gap-3 px-5 py-2.5 text-xs font-bold text-(--color-quinary)/70 hover:text-quaternary hover:bg-(--color-primary) transition-all"
                >
                  <HiOutlineClipboardList size={18} /> Admin Logs
                </Link>
                <div className="h-px bg-(--color-secondary)/10 my-1 mx-2" />
                <button className="w-full flex items-center gap-3 px-5 py-2.5 text-xs font-black text-red-500 hover:bg-red-50 transition-all">
                  <HiOutlineLogout size={18} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
