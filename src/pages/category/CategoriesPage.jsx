import { useState, useEffect } from "react";
import { usePage } from "../../auth/PageContext";
import {
  useAllCategories,
  useCreateCategory,
  useDeactivateCategory,
  useActivateCategory,
} from "../../hooks/useCategory";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import CategoryForm from "../../components/category/categoryForm";
import CategoryTable from "../../components/category/categoryTable";
import { PlusCircle, Search } from "lucide-react";

export default function CategoriesPage() {
  const { setPageTitle } = usePage();

  useEffect(() => {
    setPageTitle("Manage Categories");

    return () => setPageTitle("Dashboard");
  }, [setPageTitle]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [localSearch, setLocalSearch] = useState("");
  const [localSortOrder, setLocalSortOrder] = useState("desc");

  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useAllCategories(filters);
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: deactivateCategory, isPending: isDeactivating } =
    useDeactivateCategory();
  const { mutate: activateCategory, isPending: isActivating } =
    useActivateCategory();

  const isProcessing = isCreating || isDeactivating || isActivating;

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      search: localSearch,
      sortOrder: localSortOrder,
      page: 1,
    }));
  };

  const handleCreateCategory = (formData) => {
    createCategory(formData, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  const handleDeactivate = (categoryId) => {
    deactivateCategory(categoryId);
  };
  const handleActivate = (categoryId) => {
    activateCategory(categoryId);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isError) {
    return (
      <div className="text-red-400 text-center p-10">
        Error: {error?.message || "Failed to load categories."}
      </div>
    );
  }

  const categories = categoryData?.data?.categories || [];
  const pagination = categoryData?.data?.pagination || {};

  return (
    // <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter"> // making change to adapt to sidebar and dashboard layout
    <div className="container mx-auto font-inter">
      <div className="flex justify-end items-center mb-6">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Create Category
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by category name..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <select
          value={localSortOrder}
          onChange={(e) => setLocalSortOrder(e.target.value)}
          className="w-full md:w-auto px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <Button
          onClick={handleApplyFilters}
          className="w-full md:w-auto px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white"
        >
          Apply
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-20">
          Loading categories...
        </div>
      ) : (
        <CategoryTable
          categories={categories}
          onDeactivate={handleDeactivate}
          onActivate={handleActivate}
          isProcessing={isProcessing}
        />
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <Button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage || isLoading}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
          >
            Previous
          </Button>
          <span className="text-gray-500">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage || isLoading}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
          >
            Next
          </Button>
        </div>
      )}

      {/* Create Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a New Category"
      >
        <CategoryForm
          onSubmit={handleCreateCategory}
          isPending={isCreating}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
