import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import { type Category } from "./types";

interface CategoryDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  allCategories: Category[];
  onDelete: () => void;
}

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({
  isOpen,
  onClose,
  category,
  allCategories,
  onDelete,
}) => {
  if (!isOpen || !category) return null;

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
          Delete Category?
        </h2>
        <p className="text-center text-sm text-(--color-quinary)/60 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-bold text-sextary">"{category.name}"</span>?
          This action cannot be undone.
        </p>

        {category.websiteCount > 0 && (
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6">
            <h4 className="text-xs font-black text-orange-600 uppercase mb-2 flex items-center gap-2">
              <HiOutlineExclamation /> Action Required
            </h4>
            <p className="text-xs text-orange-800/70 mb-3">
              This category contains{" "}
              <strong>{category.websiteCount} websites</strong>. You must
              reassign them to another category before deletion.
            </p>
            <select className="w-full p-2 bg-white border border-orange-200 rounded-lg text-xs font-bold text-sextary outline-none">
              <option value="">Select fallback category...</option>
              {allCategories
                .filter((c) => c.id !== category.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-black text-(--color-quinary)/60 hover:bg-gray-50 rounded-xl uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 shadow-md shadow-red-500/20"
          >
            Delete Forever
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDeleteModal;
