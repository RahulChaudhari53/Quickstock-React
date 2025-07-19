import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStockMovement } from "../hooks/useStock";
import { useProductById } from "../hooks/useProduct"; 
import { Button } from "@/components/ui/button";
import StockMovementTable from "../components/stock/StockMovementTable";
import { ArrowLeft } from "lucide-react";

export default function StockHistoryPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  // Fetch the movement history with pagination
  const {
    data: historyData,
    isLoading,
    isError,
    error,
  } = useStockMovement(productId, pagination);

  // Fetch the product's details to display its name
  const { data: productData } = useProductById(productId);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  if (isError) {
    return (
      <div className="text-red-400 text-center p-10">
        Error: {error?.message || "Failed to load stock history."}
      </div>
    );
  }

  const history = historyData?.data?.history || [];
  const historyPagination = historyData?.data?.pagination || {};
  const productName = productData?.data?.name || "Product";
  const productSku = productData?.data?.sku || "";

  return (
    <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => navigate("/user/stock")}
          variant="outline"
          size="icon"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-400">
            Stock Movement History
          </h1>
          <p className="text-gray-400">
            {productName} ({productSku})
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-10">
          Loading history...
        </div>
      ) : (
        <StockMovementTable history={history} />
      )}

      {historyPagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <Button
            onClick={() => handlePageChange(historyPagination.currentPage - 1)}
            disabled={!historyPagination.hasPrevPage || isLoading}
            variant="outline"
            className="bg-gray-700"
          >
            Previous
          </Button>
          <span>
            Page {historyPagination.currentPage} of{" "}
            {historyPagination.totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(historyPagination.currentPage + 1)}
            disabled={!historyPagination.hasNextPage || isLoading}
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
