import React, { useState, useEffect, useCallback } from "react";
// Types
import { type Category } from "../components/Categories/types";

// Modular Components
import CategoryHeader from "../components/Categories/CategoryHeader";
import CategoryControls from "../components/Categories/CategoryControls";
import CategoryTable from "../components/Categories/CategoryTable";
import CategoryEditModal from "../components/Categories/CategoryEditModal";
import CategoryDeleteModal from "../components/Categories/CategoryDeleteModal";
import { adminApi } from "../services/admin.service";

const CategoriesManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Hidden">(
    "All"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    slug: "",
    icon: "📁",
    description: "",
    status: "Active",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getCategories({
        status: statusFilter === "All" ? undefined : statusFilter,
        search: searchQuery,
      });
      // Map API response
      const mapped = data.data.map((c: any) => ({
        id: c._id,
        name: c.name,
        slug: c.slug,
        icon: c.icon,
        description: c.description,
        websiteCount: c.websiteCount,
        status: c.status,
        createdDate: c.createdAt,
      }));
      setCategories(mapped);
    } catch (error) {
      console.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setFormData(category);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setFormData({
      name: "",
      slug: "",
      icon: "📁",
      description: "",
      status: "Active",
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentCategory) {
        await adminApi.updateCategory(currentCategory.id, formData);
      } else {
        await adminApi.createCategory(formData);
      }
      fetchCategories();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to save category");
    }
  };

  const handleDelete = async (reassignmentId?: string) => {
    if (!currentCategory) return;
    try {
      await adminApi.deleteCategory(currentCategory.id, reassignmentId);
      fetchCategories();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete category");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <CategoryHeader onAdd={handleAdd} />

      <CategoryControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <CategoryEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentCategory={currentCategory}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />

      <CategoryDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        category={currentCategory}
        allCategories={categories}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoriesManager;
