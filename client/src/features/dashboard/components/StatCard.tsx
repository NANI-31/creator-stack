import React from "react";
import { type IconType } from "react-icons";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
}) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-(--color-secondary)/30 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
        >
          <Icon size={28} />
        </div>
        <div>
          <p className="text-xs font-bold text-(--color-quinary)/50 uppercase tracking-widest mb-1">
            {label}
          </p>
          <p className="text-2xl font-black text-(--color-sextary)">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
