import React from "react";

interface ReportsHeaderProps {
  pendingCount: number;
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ pendingCount }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight flex items-center gap-3">
          Reports & Moderation
          {pendingCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold tracking-wide">
              {pendingCount} Pending
            </span>
          )}
        </h1>
        <p className="text-(--color-quinary)/60 font-medium">
          Identify and resolve community violations.
        </p>
      </div>
    </div>
  );
};

export default ReportsHeader;
