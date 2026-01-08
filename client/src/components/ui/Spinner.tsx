import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-b",
    md: "h-8 w-8 border-b-2",
    lg: "h-12 w-12 border-b-2",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-quaternary`}
      ></div>
    </div>
  );
};

export default Spinner;
