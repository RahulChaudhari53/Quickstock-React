import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllSales } from "../hooks/useSale";
import { Button } from "@/components/ui/button";
import SalesTable from "../components/sale/SalesTable";
import { PlusCircle, Search } from "lucide-react";

export default function SalesPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "saleDate",
    sortOrder: "desc",
  });

  const [localFilters, setLocalFilters] = useState({
    search: "",
    paymentMethod: "",
  });

  const { data: salesData, isLoading, isError, error } = useAllSales(filters);

  const handleApplyFilters = () => {
    const activeFilters = {};
    for (const key in localFilters) {
      if (localFilters[key] !== "") {
        activeFilters[key] = localFilters[key];
      }
    }
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

  const sales = salesData?.data?.items || [];
  const pagination = salesData?.data?.pagination || {};

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-400">
          Sales History
        </h1>
        <Button
          onClick={() => navigate("/user/pos")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <PlusCircle size={20} className="mr-2" /> New Sale (POS)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="relative col-span-1 md:col-span-3 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search by Invoice #"
            value={localFilters.search}
            onChange={handleLocalFilterChange}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-md"
          />
        </div>
        <select
          name="paymentMethod"
          value={localFilters.paymentMethod}
          onChange={handleLocalFilterChange}
          className="bg-gray-700 rounded-md py-2 w-full"
        >
          <option value="">All Payment Methods</option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
        </select>
        <Button
          onClick={handleApplyFilters}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Apply Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-10">Loading...</div>
      ) : (
        <SalesTable sales={sales} currentSort={filters} onSort={handleSort} />
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
