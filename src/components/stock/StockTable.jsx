import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function StockTable({ stockItems }) {
  const navigate = useNavigate();

  const handleViewHistory = (productId) => {
    navigate(`/user/stock/history/${productId}`);
  };

  if (!stockItems || stockItems.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No stock records found.</p>
      </div>
    );
  }

  // Helper component for determining stock status
  const StockStatusBadge = ({ current, min }) => {
    if (current <= 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
          <XCircle size={14} /> Out of Stock
        </span>
      );
    }
    if (current <= min) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
          <AlertTriangle size={14} /> Low Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
        <CheckCircle size={14} /> In Stock
      </span>
    );
  };

  return (
    <div className="rounded-lg">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-lg bg-gray-800 border border-gray-700 shadow">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Current / Min Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {stockItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  <div>{item.product?.name || "N/A"}</div>
                  <div className="text-xs text-gray-400">
                    {item.product?.sku || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.product?.category?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                  {item.currentStock}
                  <span className="text-gray-400 font-normal">
                    {" "}
                    / {item.product?.minStockLevel || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StockStatusBadge
                    current={item.currentStock}
                    min={item.product?.minStockLevel || 0}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    onClick={() => handleViewHistory(item.product?._id)}
                    size="sm"
                    variant="outline"
                    className="bg-blue-800"
                  >
                    <Eye size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {stockItems.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-white break-words">
                  {item.product?.name || "N/A"}
                </h3>
                <p className="text-sm text-gray-400">
                  {item.product?.sku || "N/A"}
                </p>
              </div>
              <div className="flex-shrink-0">
                <StockStatusBadge
                  current={item.currentStock}
                  min={item.product?.minStockLevel || 0}
                />
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-gray-600 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="font-medium text-white">
                  {item.product?.category?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Stock (Current / Min):</span>
                <span className="font-bold text-xl text-white">
                  {item.currentStock}{" "}
                  <span className="text-gray-400 font-normal">
                    / {item.product?.minStockLevel || "N/A"}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-3 border-t border-gray-600">
              <Button
                onClick={() => handleViewHistory(item.product?._id)}
                size="sm"
                variant="outline"
                className="bg-blue-800 flex-grow justify-center"
              >
                <Eye size={16} className="mr-2" /> View History
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
