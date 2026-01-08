import React from "react";

const SubmissionsOverview: React.FC = () => {
  const submissionsData = [45, 62, 38, 55, 80, 68, 52, 48, 75, 42, 60, 50];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-(--color-secondary)/30 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-(--color-sextary)">
          Submissions Overview
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-widest">
            <p className="text-xs text-(--color-quinary)/40 font-bold uppercase tracking-wider">
              Monthly Website Activity
            </p>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-80 flex items-end justify-between gap-2 min-h-62.5">
        {submissionsData.map((d, i) => (
          <div
            key={i}
            className="flex-1 group relative flex flex-col items-center gap-2"
          >
            <div
              className="w-full bg-(--color-primary) rounded-t-xl group-hover:bg-quaternary transition-all duration-300 relative"
              style={{ height: `${submissionsData[i]}%` }}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-sextary text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                {submissionsData[i]}
              </div>
            </div>
            <span className="text-[9px] font-bold text-(--color-quinary)/30 uppercase">
              {months[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsOverview;
