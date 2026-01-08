import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { type Category } from "./types";

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory: Category | null;
  formData: Partial<Category>;
  setFormData: (data: Partial<Category>) => void;
  onSave: () => void;
}

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  isOpen,
  onClose,
  currentCategory,
  formData,
  setFormData,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-sextary/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg rounded-4xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-(--color-sextary)">
            {currentCategory ? "Edit Category" : "New Category"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
          >
            <HiOutlineX size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-[10px] font-bold text-(--color-quinary)/40 uppercase mb-2">
                Icon
              </label>
              <input
                type="text"
                className="w-full text-center text-2xl p-3 bg-(--color-primary)/20 rounded-xl border-transparent focus:border-quaternary/30 outline-none"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
              />
            </div>
            <div className="col-span-3">
              <label className="block text-[10px] font-bold text-(--color-quinary)/40 uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 bg-(--color-primary)/20 rounded-xl border-transparent focus:border-quaternary/30 outline-none text-sm font-bold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                placeholder="e.g. Development"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-(--color-quinary)/40 uppercase mb-2">
              Slug
            </label>
            <div className="flex items-center px-4 py-3 bg-(--color-primary)/10 rounded-xl border border-dashed border-(--color-secondary)/30 text-xs font-mono text-(--color-quinary)/60">
              creatorstack.com/c/
              <span className="text-sextary font-bold">{formData.slug}</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-(--color-quinary)/40 uppercase mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 bg-(--color-primary)/20 rounded-xl border-transparent focus:border-quaternary/30 outline-none text-sm font-medium resize-none h-24"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of this category..."
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-(--color-primary)/10 rounded-xl">
            <span className="text-sm font-bold text-(--color-sextary)">
              Category Status
            </span>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  status: formData.status === "Active" ? "Hidden" : "Active",
                })
              }
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                formData.status === "Active"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {formData.status}
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-xs font-black text-(--color-quinary)/60 hover:bg-gray-50 rounded-xl uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 py-3 bg-quaternary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 shadow-md shadow-orange-500/20"
            >
              Save Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
