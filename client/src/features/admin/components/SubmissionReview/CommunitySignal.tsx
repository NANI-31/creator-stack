import React from "react";
import {
  HiOutlineThumbUp,
  HiOutlineStar,
  HiOutlineChatAlt,
} from "react-icons/hi";
import type { SubmissionStats } from "./types";

interface CommunitySignalProps {
  stats: SubmissionStats;
}

const CommunitySignal: React.FC<CommunitySignalProps> = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-4xl border border-(--color-secondary)/30 shadow-sm flex flex-col h-full">
      <h3 className="text-[10px] font-black text-(--color-quinary)/30 uppercase tracking-[0.2em] mb-6">
        Community Signal
      </h3>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
            <HiOutlineThumbUp size={24} />
          </div>
          <div>
            <p className="text-xl font-black text-(--color-sextary)">
              {stats.upvotes}
            </p>
            <p className="text-[9px] font-bold text-(--color-quinary)/40 uppercase">
              Upvotes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
            <HiOutlineStar size={24} />
          </div>
          <div>
            <p className="text-xl font-black text-(--color-sextary)">
              {stats.rating}
            </p>
            <p className="text-[9px] font-bold text-(--color-quinary)/40 uppercase">
              Avg Rating
            </p>
          </div>
        </div>
      </div>
      <button className="mt-auto w-full py-3 bg-(--color-primary)/20 rounded-xl text-xs font-black text-(--color-quinary)/60 hover:text-(--color-sextary) hover:bg-(--color-primary)/40 transition-all flex items-center justify-center gap-2">
        <HiOutlineChatAlt size={16} /> View All {stats.comments} Comments
      </button>
    </div>
  );
};

export default CommunitySignal;
