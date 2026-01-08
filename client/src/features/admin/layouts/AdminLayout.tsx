import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-(--color-primary)/20 flex flex-col">
      {/* Header */}
      <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Dynamic Page Content */}
        <main
          className={`flex-1 transition-all duration-300 min-h-[calc(100vh-64px)] overflow-x-hidden ${
            isCollapsed ? "lg:pl-20" : "lg:pl-64"
          }`}
        >
          <div className="p-4 md:p-8 animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
