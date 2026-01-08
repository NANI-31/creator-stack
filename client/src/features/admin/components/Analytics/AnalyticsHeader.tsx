import React from "react";
import { HiOutlineCalendar, HiOutlineDownload } from "react-icons/hi";

interface AnalyticsHeaderProps {
  dateRange: string;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ dateRange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight">
          Analytics & Insights
        </h1>
        <p className="text-(--color-quinary)/60 font-medium">
          Platform performance and engagement overview.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-(--color-secondary)/30 rounded-xl text-xs font-bold text-(--color-sextary) hover:border-quaternary/30 transition-all shadow-sm">
            <HiOutlineCalendar
              className="text-(--color-quinary)/50"
              size={16}
            />
            {dateRange}
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-sextary text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10">
          <HiOutlineDownload size={16} /> Export
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
