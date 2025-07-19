import { useState } from "react";
import { useAllStock } from "../hooks/useStock";
import { Button } from "@/components/ui/button";
import StockTable from "../components/stock/StockTable";
import { Search, AlertTriangle } from "lucide-react";

export default function StockPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    lowStockThreshold: "", // Use an empty string to indicate no filter
  });

  const [localSearch, setLocalSearch] = useState("");

  const { data: stockData, isLoading, isError, error } = useAllStock(filters);

  const handleApplySearch = () => {
    setFilters((prev) => ({ ...prev, search: localSearch, page: 1 }));
  };

  const handleToggleLowStockFilter = () => {
    setFilters((prev) => ({
      ...prev,
      lowStockThreshold: prev.lowStockThreshold ? "" : "1",
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isError) {
    return (
      <div className="text-red-400 text-center p-10">
        Error: {error?.message || "Failed to load stock data."}
      </div>
    );
  }

  const stockItems = stockData?.data?.items || [];
  const pagination = stockData?.data?.pagination || {};
  const isLowStockFilterActive = !!filters.lowStockThreshold;

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-400">
          Stock Overview
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplySearch()}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <Button
          onClick={handleToggleLowStockFilter}
          variant={isLowStockFilterActive ? "secondary" : "outline"}
          className={`flex items-center gap-2 ${
            isLowStockFilterActive
              ? "bg-yellow-600 hover:bg-yellow-700 text-white"
              : "bg-gray-700"
          }`}
        >
          <AlertTriangle size={16} />
          {isLowStockFilterActive ? "Show All Stock" : "Show Low Stock"}
        </Button>
        <Button
          onClick={handleApplySearch}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Search
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-10">
          Loading stock levels...
        </div>
      ) : (
        <StockTable stockItems={stockItems} />
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
