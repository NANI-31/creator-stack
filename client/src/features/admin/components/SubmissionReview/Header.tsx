import React from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi";

interface HeaderProps {
  id?: string;
  status: string;
  submittedDate: string;
  onBack: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const Header: React.FC<HeaderProps> = ({
  id,
  status,
  submittedDate,
  onBack,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-3 bg-white border border-(--color-secondary)/30 rounded-2xl text-(--color-quinary)/40 hover:text-(--color-sextary) hover:border-quaternary/30 transition-all shadow-sm"
        >
          <HiOutlineChevronLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight">
              Review Submission
            </h1>
            <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-yellow-100">
              {status}
            </span>
          </div>
          <p className="text-(--color-quinary)/60 font-medium text-sm mt-1">
            ID: #{id} • Submitted on {submittedDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReject}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-(--color-secondary)/30 rounded-2xl text-xs font-black text-red-500 uppercase tracking-widest hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
        >
          <HiOutlineX size={16} /> Reject
        </button>
        <button
          onClick={onApprove}
          className="flex items-center gap-2 px-6 py-3 bg-quaternary text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all"
        >
          <HiOutlineCheck size={16} /> Approve
        </button>
      </div>
    </div>
  );
};

export default Header;
