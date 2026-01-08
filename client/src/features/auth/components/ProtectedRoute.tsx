import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-primary)">
        <div className="w-12 h-12 border-4 border-(--color-tertiary) border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
