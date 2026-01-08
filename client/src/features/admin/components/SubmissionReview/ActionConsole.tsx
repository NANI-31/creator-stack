import React from "react";
import { HiOutlineSave, HiOutlineTrash } from "react-icons/hi";

interface ActionConsoleProps {
  adminNote: string;
  setAdminNote: (note: string) => void;
  onSaveDraft: () => void;
  onDelete: () => void;
}

const ActionConsole: React.FC<ActionConsoleProps> = ({
  adminNote,
  setAdminNote,
  onSaveDraft,
  onDelete,
}) => {
  return (
    <div className="bg-white p-6 rounded-4xl border border-(--color-secondary)/30 shadow-sm">
      <h3 className="text-[10px] font-black text-(--color-quinary)/30 uppercase tracking-[0.2em] mb-4">
        Admin Actions
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-(--color-quinary)/40 uppercase mb-2 block">
            Internal Feedback / Note
          </label>
          <textarea
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            placeholder="Private note for audit trail..."
            className="w-full p-3 bg-(--color-primary)/20 border border-transparent focus:border-quaternary/20 focus:bg-white rounded-xl outline-none text-xs font-medium transition-all h-20 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onSaveDraft}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-(--color-primary)/20 text-(--color-quinary)/60 hover:text-(--color-sextary) hover:bg-(--color-primary)/40 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <HiOutlineSave size={14} /> Save Draft
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <HiOutlineTrash size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionConsole;
