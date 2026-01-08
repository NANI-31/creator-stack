import React from "react";
import { HiOutlineSave } from "react-icons/hi";

interface UnsavedChangesFooterProps {
  onDiscard: () => void;
  onSave: () => void;
}

const UnsavedChangesFooter: React.FC<UnsavedChangesFooterProps> = ({
  onDiscard,
  onSave,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-(--color-secondary)/20 flex justify-between items-center animate-in slide-in-from-bottom-5">
      <span className="text-xs font-bold text-orange-600 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        Unsaved Changes
      </span>
      <div className="flex gap-3">
        <button
          onClick={onDiscard}
          className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
        >
          Discard
        </button>
        <button
          onClick={onSave}
          className="px-6 py-2 rounded-xl bg-sextary text-white text-xs font-black uppercase tracking-widest hover:bg-black shadow-lg shadow-black/20 transition-all flex items-center gap-2"
        >
          <HiOutlineSave size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default UnsavedChangesFooter;
