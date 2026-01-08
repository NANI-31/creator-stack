import React from "react";
import type { IconType } from "react-icons";
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from "react-icons/hi";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color: string;
  onClick?: () => void;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({
  label,
  value,
  icon: Icon,
  trend,
  color,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-4xl border border-(--color-secondary)/30 shadow-sm hover:shadow-md hover:border-quaternary/20 transition-all group text-left w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-2xl ${color} text-white shadow-lg group-hover:scale-105 transition-transform`}
        >
          <Icon size={24} />
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
              trend.isUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend.isUp ? (
              <HiOutlineTrendingUp size={14} />
            ) : (
              <HiOutlineTrendingDown size={14} />
            )}
            {trend.value}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-3xl font-black text-(--color-sextary) tracking-tight">
          {value}
        </p>
        <p className="text-xs font-bold text-(--color-quinary)/40 uppercase tracking-widest">
          {label}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-(--color-secondary)/10 flex items-center justify-between">
        <span className="text-[10px] font-black text-quaternary border-b border-quaternary/20 uppercase tracking-widest">
          View Details
        </span>
      </div>
    </button>
  );
};

export default AdminStatCard;
