import React from "react";
import {
  HiOutlineGlobeAlt,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
}) => (
  <div className="bg-(--color-secondary) p-6 rounded-4xl border-quaternary/10 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon size={24} />
      </div>
      <span className="text-2xl font-black text-(--color-sextary)">
        {value}
      </span>
    </div>
    <p className="text-sm font-bold text-(--color-quinary)/60 uppercase tracking-widest">
      {label}
    </p>
  </div>
);

interface SubmissionStatsProps {
  stats: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
}

const SubmissionStats: React.FC<SubmissionStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        label="Total Submitted"
        value={stats.total}
        icon={HiOutlineGlobeAlt}
        color="bg-blue-500"
      />
      <StatCard
        label="Approved"
        value={stats.approved}
        icon={HiOutlineCheckCircle}
        color="bg-tertiary"
      />
      <StatCard
        label="Pending Review"
        value={stats.pending}
        icon={HiOutlineClock}
        color="bg-quaternary"
      />
      <StatCard
        label="Needs Update"
        value={stats.rejected}
        icon={HiOutlineXCircle}
        color="bg-quinary"
      />
    </div>
  );
};

export default SubmissionStats;
