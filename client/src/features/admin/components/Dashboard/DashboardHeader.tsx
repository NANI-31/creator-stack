import React from "react";

interface DashboardHeaderProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeRange,
  setTimeRange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight">
          Admin Overview
        </h1>
        <p className="text-(--color-quinary)/60 font-medium">
          Platform insights and moderation center.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-white border border-(--color-secondary)/30 rounded-2xl p-1 flex items-center shadow-sm">
          {["Today", "Last 7 days", "Last 30 days"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                timeRange === range
                  ? "bg-quaternary text-white shadow-lg shadow-orange-500/20"
                  : "text-(--color-quinary)/40 hover:text-(--color-sextary)"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
