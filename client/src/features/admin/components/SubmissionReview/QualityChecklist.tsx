import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineExclamation,
} from "react-icons/hi";

interface QualityChecklistProps {
  checklist: {
    reachable: boolean;
    descriptionAccurate: boolean;
    categoryCorrect: boolean;
    contentSafe: boolean;
    noMalware: boolean;
  };
  onToggle: (key: keyof QualityChecklistProps["checklist"]) => void;
}

const QualityChecklist: React.FC<QualityChecklistProps> = ({
  checklist,
  onToggle,
}) => {
  const items = [
    { id: "reachable", label: "Website is reachable & functional" },
    { id: "descriptionAccurate", label: "Description matches content" },
    { id: "categoryCorrect", label: "Correct category selected" },
    { id: "contentSafe", label: "No NSFW / Illegal content" },
    { id: "noMalware", label: "Safe browsing (no malware/spam)" },
  ];

  return (
    <div className="bg-white p-6 rounded-4xl border border-(--color-secondary)/30 shadow-sm border-l-4 border-l-quaternary">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-quaternary/10 text-quaternary rounded-lg">
          <HiOutlineShieldCheck size={20} />
        </div>
        <h3 className="text-sm font-black text-(--color-sextary) uppercase tracking-wide">
          Quality Checklist
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-(--color-primary)/20 cursor-pointer transition-all group select-none"
          >
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                checklist[item.id as keyof typeof checklist]
                  ? "bg-quaternary border-quaternary text-white"
                  : "border-(--color-secondary)/30 group-hover:border-quaternary/50"
              }`}
            >
              {checklist[item.id as keyof typeof checklist] && (
                <HiOutlineCheck size={12} strokeWidth={4} />
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={checklist[item.id as keyof typeof checklist]}
              onChange={() => onToggle(item.id as keyof typeof checklist)}
            />
            <span
              className={`text-xs font-bold transition-all ${
                checklist[item.id as keyof typeof checklist]
                  ? "text-(--color-sextary)"
                  : "text-(--color-quinary)/50"
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-(--color-secondary)/10">
        <div className="bg-blue-50 text-blue-600 p-3 rounded-xl text-[10px] font-bold flex items-start gap-2">
          <HiOutlineExclamation size={14} className="mt-0.5 shrink-0" />
          <p>
            Completing this checklist logs your validation in the audit trail.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QualityChecklist;
