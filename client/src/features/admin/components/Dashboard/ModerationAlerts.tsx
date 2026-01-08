import React from "react";
import { HiOutlineShieldCheck, HiOutlineGlobeAlt } from "react-icons/hi";

interface Alert {
  id: number;
  type: string;
  title: string;
  user: string;
  time: string;
  status: string;
}

interface ModerationAlertsProps {
  alerts: Alert[];
}

const ModerationAlerts: React.FC<ModerationAlertsProps> = ({ alerts }) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-(--color-secondary)/30 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-(--color-sextary)">
          Moderation Alerts
        </h2>
        <span className="text-[10px] font-bold text-quaternary bg-quaternary/10 px-3 py-1 rounded-full uppercase tracking-widest">
          Action Required
        </span>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="group p-4 rounded-3xl hover:bg-(--color-primary)/20 border border-transparent hover:border-(--color-secondary)/10 transition-all flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${
                alert.type === "Report"
                  ? "bg-red-50 text-red-500"
                  : "bg-orange-50 text-orange-500"
              }`}
            >
              {alert.type === "Report" ? (
                <HiOutlineShieldCheck size={24} />
              ) : (
                <HiOutlineGlobeAlt size={24} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-(--color-sextary) truncate">
                {alert.title}
              </p>
              <p className="text-xs font-medium text-(--color-quinary)/50">
                by{" "}
                <span className="text-quaternary font-bold cursor-pointer hover:underline">
                  @{alert.user}
                </span>{" "}
                • {alert.time}
              </p>
            </div>
            <button className="px-4 py-2 bg-white border border-(--color-secondary)/30 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-quaternary hover:text-white hover:border-quaternary transition-all shadow-sm">
              Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModerationAlerts;
