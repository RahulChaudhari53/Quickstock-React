import { useState, useEffect } from "react";
import { usePage } from "../../auth/PageContext";
import { useNavigate } from "react-router-dom";
import { useAllSales } from "../../hooks/useSale";
import { Button } from "@/components/ui/button";
import SalesTable from "../../components/sale/SalesTable";
import { PlusCircle, Search } from "lucide-react";

export default function SalesPage() {
  const navigate = useNavigate();
  const { setPageTitle } = usePage();

  useEffect(() => {
    setPageTitle("Sales History");
  }, [setPageTitle]);

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
    <div className="container mx-auto font-inter">
      <div className="flex justify-end items-center mb-6">
        <Button
          onClick={() => navigate("/user/pos")}
          className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
        >
          <PlusCircle size={20} className="mr-2" /> New Sale (POS)
        </Button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search by Invoice #"
            value={localFilters.search}
            onChange={handleLocalFilterChange}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <select
          name="paymentMethod"
          value={localFilters.paymentMethod}
          onChange={handleLocalFilterChange}
          className="w-full md:w-auto px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Payment Methods</option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
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
          Loading Sales History...
        </div>
      ) : (
        <SalesTable sales={sales} currentSort={filters} onSort={handleSort} />
      )}

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
    </div>
  );
}
