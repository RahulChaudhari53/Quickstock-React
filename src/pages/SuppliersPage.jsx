import { useState } from "react";
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
  // State for modal visibility and mode (create/edit)
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

  // --- Event Handlers ---
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
      // We are in edit mode
      updateSupplier(formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      // We are in create mode
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
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-400">
          Manage Suppliers
        </h1>
        <Button
          onClick={handleOpenCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Create Supplier
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 flex gap-4 p-4 bg-gray-800 rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={localSortOrder}
          onChange={(e) => setLocalSortOrder(e.target.value)}
          className="w-full md:w-auto px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <Button
          onClick={handleApplyFilters}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Apply
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-10">
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
          <span className="text-gray-300">
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

      {/* Create/Edit Supplier Modal */}
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
