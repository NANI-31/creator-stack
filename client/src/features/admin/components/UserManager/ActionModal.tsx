import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import type { User } from "./types";

interface ActionModalProps {
  user: User;
  action: "Suspend" | "Ban";
  reason: string;
  setReason: (reason: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  user,
  action,
  reason,
  setReason,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-sextary/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md rounded-4xl shadow-2xl p-8 animate-in zoom-in-95 duration-200 border-t-8 border-red-500">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineExclamation size={32} />
        </div>

        <h2 className="text-xl font-black text-center text-(--color-sextary) mb-2">
          {action} User?
        </h2>
        <p className="text-center text-sm text-(--color-quinary)/60 mb-6">
          This will restrict access for{" "}
          <span className="font-bold text-sextary">{user.name}</span>.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-(--color-quinary)/40 uppercase mb-2">
              Reason for action
            </label>
            <textarea
              className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-red-500/30 outline-none text-sm font-medium resize-none h-24"
              placeholder={`Why are you ${action.toLowerCase()}ing this user?`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-black text-(--color-quinary)/60 hover:bg-gray-50 rounded-xl uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 shadow-md shadow-red-500/20"
          >
            Confirm {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
