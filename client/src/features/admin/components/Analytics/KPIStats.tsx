import React from "react";
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from "react-icons/hi";
import { type KPIData } from "./types";

interface KPIStatsProps {
  data: KPIData[];
}

const KPIStats: React.FC<KPIStatsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((kpi, idx) => (
        <div
          key={idx}
          className="bg-white p-5 rounded-3xl border border-(--color-secondary)/20 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${kpi.color}`}>{kpi.icon}</div>
            <div
              className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
                kpi.isPositive
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {kpi.isPositive ? (
                <HiOutlineTrendingUp />
              ) : (
                <HiOutlineTrendingDown />
              )}
              {kpi.trend}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-(--color-sextary)">
              {kpi.value}
            </h3>
            <p className="text-xs font-bold text-(--color-quinary)/40 uppercase tracking-wide mt-1">
              {kpi.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIStats;
