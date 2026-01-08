import React from "react";
import { type IconType } from "react-icons";
import AdminStatCard from "../AdminStatCard";

interface Stat {
  label: string;
  value: string;
  icon: IconType;
  trend: { value: number; isUp: boolean };
  color: string;
}

interface StatsGridProps {
  stats: Stat[];
  onStatClick: (label: string) => void;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, onStatClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <AdminStatCard
          key={i}
          {...stat}
          onClick={() => onStatClick(stat.label)}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
