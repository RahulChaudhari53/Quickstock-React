import { useState, useEffect } from "react";
import { usePage } from "../auth/PageContext";
import { useAllStock } from "../hooks/useStock";
import { Button } from "@/components/ui/button";
import StockTable from "../components/stock/StockTable";
import { Search, AlertTriangle } from "lucide-react";

export default function StockPage() {
  const { setPageTitle } = usePage();
  useEffect(() => {
    setPageTitle("Stock Overview");
  }, [setPageTitle]);

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
    <div className="container mx-auto font-inter">
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplySearch()}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md sm:text-sm"
          />
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Button
            onClick={handleApplySearch}
            className="bg-gray-800 hover:bg-gray-700 text-white flex-grow"
          >
            Search
          </Button>
          <Button
            onClick={handleToggleLowStockFilter}
            variant={isLowStockFilterActive ? "secondary" : "outline"}
            className={`flex items-center gap-2 flex-grow ${
              isLowStockFilterActive
                ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                : ""
            }`}
          >
            <AlertTriangle size={16} />
            {isLowStockFilterActive ? "Show All" : "Low Stock"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-20">
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
