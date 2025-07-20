import { useState, useEffect } from "react";
import { usePage } from "../auth/PageContext";
import {
  useAllSuppliers,
  useCreateSupplier,
  useUpdateSupplier,
  useDeactivateSupplier,
  useActivateSupplier,
} from "../hooks/useSupplier";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import SupplierForm from "../components/supplier/SupplierForm";
import SupplierTable from "../components/supplier/SupplierTable";
import { PlusCircle, Search } from "lucide-react";

export default function SuppliersPage() {
  const { setPageTitle } = usePage();

  useEffect(() => {
    setPageTitle("Manage Suppliers");
  }, [setPageTitle]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

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
    data: supplierData,
    isLoading,
    isError,
    error,
  } = useAllSuppliers(filters);
  const { mutate: createSupplier, isPending: isCreating } = useCreateSupplier();
  const { mutate: updateSupplier, isPending: isUpdating } = useUpdateSupplier();
  const { mutate: deactivateSupplier, isPending: isDeactivating } =
    useDeactivateSupplier();
  const { mutate: activateSupplier, isPending: isActivating } =
    useActivateSupplier();

  const isProcessing =
    isCreating || isUpdating || isDeactivating || isActivating;

  const handleOpenCreateModal = () => {
    setEditingSupplier(null); // Ensure we are in "create" mode
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (supplier) => {
    setEditingSupplier(supplier); // Set the supplier to edit
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingSupplier) {
      updateSupplier(formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      createSupplier(formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleDeactivate = (supplierId) => {
    deactivateSupplier(supplierId);
  };

  const handleActivate = (supplierId) => {
    activateSupplier(supplierId);
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      search: localSearch,
      sortOrder: localSortOrder,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isError) {
    return (
      <div className="text-red-400 text-center p-10">
        Error: {error?.message || "Failed to load suppliers."}
      </div>
    );
  }

  const suppliers = supplierData?.data?.data || [];
  const pagination = supplierData?.data?.pagination || {};

  return (
    <div className="container mx-auto font-inter">
      <div className="flex justify-end items-center mb-6">
        <Button
          onClick={handleOpenCreateModal}
          className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Create Supplier
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
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
          Loading suppliers...
        </div>
      ) : (
        <SupplierTable
          suppliers={suppliers}
          onDeactivate={handleDeactivate}
          onActivate={handleActivate}
          onEdit={handleOpenEditModal}
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
          <span className="text-sm text-gray-600">
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSupplier ? "Edit Supplier" : "Create a New Supplier"}
      >
        <SupplierForm
          onSubmit={handleFormSubmit}
          isPending={isCreating || isUpdating}
          onCancel={() => setIsModalOpen(false)}
          initialData={editingSupplier}
        />
      </Modal>
    </div>
  );
}
