import React, { useState } from "react";
import {
  HiLightningBolt,
  HiSearch,
  HiMenu,
  HiX,
  HiBell,
  HiLogout,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import NotificationDropdown from "../../features/notifications/components/NotificationDropdown";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../features/auth/slice/auth.slice";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { unreadCount } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-(--color-primary)/80 backdrop-blur-xl border-b border-(--color-secondary)/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-(--color-sextary) group shrink-0"
          >
            <HiLightningBolt
              size={24}
              className="text-(--color-tertiary) group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-black tracking-tight">
              CreatorStack
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-12">
            <div className="relative w-full group">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-quinary)/50 group-focus-within:text-quaternary transition-colors" />
              <input
                type="text"
                placeholder="Search resources, categories, creators..."
                className="w-full bg-(--color-secondary)/30 border-2 border-transparent focus:border-quaternary/30 focus:bg-white rounded-2xl py-2 pl-10 pr-4 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Links - Desktop (Guest) */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center gap-8 mr-8">
              <Link
                to="/categories"
                className="text-sm font-bold text-(--color-quinary)/70 hover:text-quaternary transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/trending"
                className="text-sm font-bold text-(--color-quinary)/70 hover:text-quaternary transition-colors"
              >
                Trending
              </Link>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative flex items-center gap-4">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 rounded-xl transition-all relative ${
                    isNotificationsOpen
                      ? "text-quaternary bg-(--color-secondary)/30"
                      : "text-(--color-quinary)/70 hover:text-quaternary hover:bg-(--color-secondary)/20"
                  }`}
                >
                  <HiBell size={22} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-(--color-tertiary) rounded-full border-2 border-white text-[8px] font-black text-white flex items-center justify-center animate-in zoom-in-50 duration-300">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                <NotificationDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                />

                <Link to="/dashboard" className="hidden sm:inline-block">
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-tertiary to-quaternary p-0.5 cursor-pointer shadow-md shadow-orange-500/10 hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-black text-quaternary">
                      {user?.fullName?.charAt(0) || "U"}
                    </div>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-(--color-secondary)/20 text-(--color-quinary) hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
                  title="Log Out"
                >
                  <HiLogout size={20} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-bold text-(--color-quinary) hover:text-quaternary px-3 transition-colors"
                >
                  Log In
                </Link>
                <Link to="/register">
                  <Button
                    variant="primary"
                    className="px-5! py-2.5! text-[11px]! shadow-sm"
                  >
                    Join CreatorStack
                  </Button>
                </Link>
              </div>
            )}

            <div className="md:hidden flex items-center ml-2">
              <button
                onClick={onMenuClick || (() => setIsOpen(!isOpen))}
                className="text-(--color-sextary) p-2 rounded-xl hover:bg-(--color-secondary)/20 transition-colors"
              >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-(--color-secondary)/40 animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 pt-2 pb-8 space-y-1">
            <div className="flex items-center gap-2 p-3 bg-(--color-secondary)/20 rounded-2xl mb-4 lg:hidden">
              <HiSearch className="text-(--color-quinary)/50" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>

            <Link
              to="/categories"
              className="block px-4 py-4 text-sm font-bold text-(--color-quinary) hover:bg-(--color-secondary)/10 rounded-2xl"
            >
              Categories
            </Link>
            <Link
              to="/trending"
              className="block px-4 py-4 text-sm font-bold text-(--color-quinary) hover:bg-(--color-secondary)/10 rounded-2xl"
            >
              Trending
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-4 text-sm font-bold text-(--color-quinary) hover:bg-(--color-secondary)/10 rounded-2xl"
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-contributions"
                  className="block px-4 py-4 text-sm font-bold text-(--color-quinary) hover:bg-(--color-secondary)/10 rounded-2xl"
                >
                  My Contributions
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-4 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl"
                >
                  Log Out
                </button>
              </>
            )}

            {!isLoggedIn && (
              <div className="pt-6 flex flex-col gap-3 px-2">
                <Link to="/login">
                  <Button variant="outline" fullWidth>
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" fullWidth>
                    Join Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
