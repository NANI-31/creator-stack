import React from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCollection,
  HiOutlineDotsVertical,
} from "react-icons/hi";
import { type Category } from "./types";

interface CategoryTableProps {
  categories: Category[];
  loading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm p-12 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-(--color-primary)/20 border-t-quaternary rounded-full animate-spin"></div>
        <p className="text-(--color-sextary) font-black animate-pulse">
          Loading categories...
        </p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-(--color-primary)/10 rounded-2xl">
          <HiOutlineDotsVertical
            size={32}
            className="text-(--color-quinary)/40"
          />
        </div>
        <div>
          <h3 className="text-lg font-black text-(--color-sextary)">
            No categories found
          </h3>
          <p className="text-sm text-(--color-quinary)/50">
            Try adjusting your filters or search query.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-4xl border border-(--color-secondary)/30 shadow-sm overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-200">
          <thead className="bg-(--color-primary)/20 border-b border-(--color-secondary)/20">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Name
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Description
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em] text-center">
                Websites
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em]">
                Status
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-(--color-quinary)/40 uppercase tracking-[0.2em] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-secondary)/10">
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="group hover:bg-(--color-primary)/10 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <p className="text-sm font-black text-(--color-sextary)">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-(--color-quinary)/40 font-mono">
                        /{cat.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-xs text-(--color-quinary)/70 truncate">
                    {cat.description}
                  </p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-(--color-primary)/30 rounded-lg text-xs font-bold text-(--color-sextary)">
                    {cat.websiteCount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      cat.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(cat)}
                      className="p-2 text-(--color-quinary)/40 hover:text-quaternary hover:bg-quaternary/5 rounded-xl transition-all"
                      title="Edit"
                    >
                      <HiOutlinePencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(cat)}
                      className="p-2 text-(--color-quinary)/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {categories.length === 0 && (
        <div className="p-12 text-center text-(--color-quinary)/40">
          <HiOutlineCollection size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm font-bold">
            No categories found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
