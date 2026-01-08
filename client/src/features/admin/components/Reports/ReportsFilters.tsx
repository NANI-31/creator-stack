import React from "react";
import type { ReportStatus, ReportType } from "./types";

interface ReportsFiltersProps {
  filterStatus: ReportStatus;
  setFilterStatus: (status: ReportStatus) => void;
  filterType: ReportType;
  setFilterType: (type: ReportType) => void;
}

const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
}) => {
  const statuses: ReportStatus[] = ["Pending", "Resolved", "Dismissed", "All"];
  const types: ReportType[] = ["All", "Website", "Comment", "User"];

  return (
    <div className="flex flex-wrap gap-4 items-center bg-white p-2 rounded-2xl border border-(--color-secondary)/30 shadow-sm mb-6">
      <div className="flex gap-2 p-1 bg-(--color-primary)/20 rounded-xl">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              filterStatus === status
                ? "bg-white text-(--color-sextary) shadow-sm"
                : "text-(--color-quinary)/50 hover:text-(--color-sextary)"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="w-px h-8 bg-(--color-secondary)/20 hidden sm:block"></div>

      <div className="flex gap-2 overflow-x-auto">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
              filterType === type
                ? "bg-sextary text-white border-sextary"
                : "bg-white text-(--color-quinary)/60 border-(--color-secondary)/30 hover:border-sextary/30"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportsFilters;
