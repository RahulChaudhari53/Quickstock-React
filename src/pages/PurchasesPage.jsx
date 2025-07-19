import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllPurchases } from "../hooks/usePurchase";
import { useAllSuppliers } from "../hooks/useSupplier";
import { Button } from "@/components/ui/button";
import PurchaseTable from "../components/purchase/PurchaseTable";
import { PlusCircle, Search } from "lucide-react";

export default function PurchasesPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "orderDate",
    sortOrder: "desc",
  });

  // This state holds the current values of the input fields
  const [localFilters, setLocalFilters] = useState({
    supplier: "",
    purchaseStatus: "",
    search: "",
  });

  const {
    data: purchaseData,
    isLoading,
    isError,
    error,
  } = useAllPurchases(filters);
  const { data: suppliersData } = useAllSuppliers({
    isActive: true,
    limit: 100,
  });

  const handleApplyFilters = () => {
    // Build a new object with only the active filters (not empty strings)
    const activeFilters = {};
    for (const key in localFilters) {
      if (localFilters[key] !== "") {
        activeFilters[key] = localFilters[key];
      }
    }

    // Set the main filters state, which triggers the API call.
    setFilters((prev) => ({
      page: 1,
      limit: prev.limit,
      sortBy: prev.sortBy,
      sortOrder: prev.sortOrder,
      ...activeFilters,
    }));
  };

  const handleLocalFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSort = (field) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  if (isError) {
    return (
      <div className="text-red-400 text-center p-10">
        Error: {error?.message}
      </div>
    );
  }

  const purchases = purchaseData?.data?.items || [];
  const pagination = purchaseData?.data?.pagination || {};
  const suppliers = suppliersData?.data?.data || [];

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-400">
          Purchase Orders
        </h1>
        <Button
          onClick={() => navigate("/user/purchases/create")}
          className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
        >
          <PlusCircle size={20} /> Create Purchase
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="relative col-span-1 md:col-span-4 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search by PO Number..."
            value={localFilters.search}
            onChange={handleLocalFilterChange}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-md"
          />
        </div>
        <select
          name="supplier"
          value={localFilters.supplier}
          onChange={handleLocalFilterChange}
          className="bg-gray-700 rounded-md py-2 w-full"
        >
          <option value="">All Suppliers</option>
          {suppliers.map((sup) => (
            <option key={sup._id} value={sup._id}>
              {sup.name}
            </option>
          ))}
        </select>
        <select
          name="purchaseStatus"
          value={localFilters.purchaseStatus}
          onChange={handleLocalFilterChange}
          className="bg-gray-700 rounded-md py-2 w-full"
        >
          <option value="">All Statuses</option>
          <option value="ordered">Ordered</option>
          <option value="received">Received</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button
          onClick={handleApplyFilters}
          className="bg-indigo-600 hover:bg-indigo-700 w-full"
        >
          Apply Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-10">
          Loading purchase orders...
        </div>
      ) : (
        <PurchaseTable
          purchases={purchases}
          currentSort={filters}
          onSort={handleSort}
        />
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <Button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage || isLoading}
            variant="outline"
            className="bg-gray-700"
          >
            Previous
          </Button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage || isLoading}
            variant="outline"
            className="bg-gray-700"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
