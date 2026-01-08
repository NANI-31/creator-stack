import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface CategoryControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: "All" | "Active" | "Hidden";
  setStatusFilter: (status: "All" | "Active" | "Hidden") => void;
}

const CategoryControls: React.FC<CategoryControlsProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1 group">
        <HiOutlineSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/30 group-focus-within:text-sextary transition-colors"
          size={20}
        />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-(--color-secondary)/30 rounded-3xl text-sm font-bold text-(--color-sextary) focus:border-sextary outline-none transition-all shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
        {(["All", "Active", "Hidden"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              statusFilter === status
                ? "bg-sextary text-white"
                : "bg-(--color-primary)/20 text-(--color-quinary)/50 hover:bg-(--color-primary)/40"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryControls;
