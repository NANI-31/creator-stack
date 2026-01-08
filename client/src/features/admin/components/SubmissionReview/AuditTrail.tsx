import React from "react";
import { HiOutlineClock } from "react-icons/hi";
import { type HistoryItem } from "./types";

interface AuditTrailProps {
  history: HistoryItem[];
}

const AuditTrail: React.FC<AuditTrailProps> = ({ history }) => {
  return (
    <div className="bg-(--color-primary)/10 p-6 rounded-4xl border border-(--color-secondary)/10">
      <h3 className="text-[10px] font-black text-(--color-quinary)/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <HiOutlineClock /> Audit Trail
      </h3>
      <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-(--color-secondary)/10">
        {history.map((log, i) => (
          <div key={i} className="relative pl-8">
            <div className="absolute left-0 top-1 w-4 h-4 bg-white border-2 border-quaternary rounded-full shadow-sm z-10" />
            <p className="text-xs font-black text-(--color-sextary)">
              {log.action}
            </p>
            <p className="text-[10px] text-(--color-quinary)/50 font-medium">
              by {log.user} • {log.date}
            </p>
            {log.note && (
              <p className="mt-1 text-[10px] text-(--color-quinary)/70 italic bg-white/50 p-2 rounded-lg border border-black/5">
                "{log.note}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditTrail;
