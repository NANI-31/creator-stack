import React from "react";
import { HiOutlinePlus } from "react-icons/hi";

interface CategoryHeaderProps {
  onAdd: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ onAdd }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 className="text-3xl font-black text-(--color-sextary) tracking-tight">
          Categories Management
        </h1>
        <p className="text-(--color-quinary)/60 font-medium">
          Create and organize website categories.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 bg-quaternary text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all"
      >
        <HiOutlinePlus size={16} /> Add Category
      </button>
    </div>
  );
};

export default CategoryHeader;
