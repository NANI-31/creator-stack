import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "Admin" || user?.role === "Moderator";

  // If Admin is in MainLayout, redirect to Admin dashboard
  // (Unless they are on a very specific set of totally public pages,
  // but based on user request, they want strict separation)
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Define route types
  const isAuthRoute = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/my-contributions") ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/saved") ||
    location.pathname.startsWith("/activity") ||
    location.pathname.startsWith("/submit") ||
    location.pathname.startsWith("/submission-success") ||
    location.pathname.startsWith("/websites");

  const showSidebar = isLoggedIn && isDashboardRoute && !isAdmin;

  return (
    <div className="flex flex-col min-h-screen bg-(--color-primary)">
      <Navbar onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className="flex flex-1 pt-16 md:pt-20">
        {showSidebar && (
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        )}

        <main
          className={`flex-1 transition-all duration-300 ${
            showSidebar ? (isSidebarCollapsed ? "md:pl-20" : "md:pl-64") : ""
          }`}
        >
          <div
            className={
              showSidebar
                ? "p-6 md:p-10 max-w-8xl mx-auto min-h-[calc(100vh-160px)]"
                : ""
            }
          >
            {children}
          </div>
          {/* Only show Footer in MainLayout if it's NOT a dashboard route, or unify it.
              For now, let's keep it simple. Home page handles its own footer. */}
          {!isDashboardRoute && !isAuthRoute && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
