import React from "react";
import {
  HiOutlineGlobeAlt,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineChevronRight,
  HiOutlineCalendar,
} from "react-icons/hi";

interface QuickActionsProps {
  onAction: (path: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    {
      label: "Review Submissions",
      icon: HiOutlineGlobeAlt,
      path: "/admin/submissions",
    },
    {
      label: "Add New Category",
      icon: HiOutlinePlus,
      path: "/admin/categories",
    },
    {
      label: "Moderation Queue",
      icon: HiOutlineShieldCheck,
      path: "/admin/moderation",
    },
    {
      label: "System Analytics",
      icon: HiOutlineChartBar,
      path: "/admin/analytics",
    },
  ];

  return (
    <div className="bg-quaternary p-8 rounded-[2.5rem] shadow-2xl shadow-orange-500/20 text-white flex flex-col">
      <h2 className="text-xl font-black mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => onAction(action.path)}
            className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-all group"
          >
            <div className="flex items-center gap-4">
              <action.icon
                size={20}
                className="text-white group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-bold">{action.label}</span>
            </div>
            <HiOutlineChevronRight size={16} />
          </button>
        ))}
      </div>
      <div className="mt-auto pt-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-linear-to-br from-white/20 to-transparent rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
          <HiOutlineCalendar size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
            Server Time
          </p>
          <p className="text-sm font-black">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
