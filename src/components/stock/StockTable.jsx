import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StockStatusBadge from "./StockStatusBadge";
import { Eye } from "lucide-react";

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

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Current / Min Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {stockItems.map((item) => (
            <tr key={item._id} className="hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                <div className="flex flex-col">
                  <span>{item.product.name}</span>
                  <span className="text-xs text-gray-400">
                    {item.product.sku}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {item.product.category?.name || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                <span>{item.currentStock}</span>
                <span className="text-gray-400">
                  {" "}
                  / {item.product.minStockLevel}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <StockStatusBadge
                  currentStock={item.currentStock}
                  minStockLevel={item.product.minStockLevel}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  onClick={() => handleViewHistory(item.product._id)}
                  size="sm"
                  variant="outline"
                  className="bg-blue-800 hover:bg-blue-700 border-blue-700 flex items-center gap-1"
                >
                  <Eye size={16} /> History
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
