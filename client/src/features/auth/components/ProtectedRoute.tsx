import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = "/login",
}) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-primary)">
        <div className="w-12 h-12 border-4 border-(--color-tertiary) border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // Role-based protection
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user is Admin but route requires User role, redirect to admin dashboard
    if (user.role === "Admin" || user.role === "Moderator") {
      return <Navigate to="/admin" replace />;
    }
    // Otherwise redirect to home or login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
