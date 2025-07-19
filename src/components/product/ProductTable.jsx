import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";

export default function ProductTable({
  products,
  onDeactivate,
  onActivate,
  onEdit,
  isProcessing,
}) {
  const navigate = useNavigate();

  const handleViewDetails = (productId) => {
    navigate(`/user/products/${productId}`);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No products found.</p>
        <p className="text-sm mt-2">
          Click the "Create Product" button to add a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Price (Sell/Buy)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Stock
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
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className="text-xs text-gray-400">{product.sku}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {product.category?.name || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <div className="flex flex-col">
                  <span>${product.sellingPrice.toFixed(2)}</span>
                  <span className="text-xs text-gray-400">
                    Buy: ${product.purchasePrice.toFixed(2)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                <span
                  className={
                    product.currentStock <= product.minStockLevel
                      ? "text-red-400"
                      : "text-green-400"
                  }
                >
                  {product.currentStock}
                </span>
                <span className="text-xs text-gray-400">
                  {" "}
                  / {product.minStockLevel}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {product.isActive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                    <CheckCircle size={14} /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
                    <XCircle size={14} /> Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => handleViewDetails(product._id)}
                    disabled={isProcessing}
                    size="sm"
                    variant="outline"
                    className="bg-blue-800 hover:bg-blue-700 border-blue-700"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    onClick={() => onEdit(product)}
                    disabled={isProcessing}
                    size="sm"
                    variant="outline"
                    className="bg-gray-600 hover:bg-gray-500 border-gray-500"
                  >
                    <Edit size={16} />
                  </Button>
                  {product.isActive ? (
                    <Button
                      onClick={() => onDeactivate(product._id)}
                      disabled={isProcessing}
                      size="sm"
                      variant="outline"
                      className="bg-red-800 hover:bg-red-700 border-red-700 text-red-200"
                    >
                      <Trash2 size={16} />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onActivate(product._id)}
                      disabled={isProcessing}
                      size="sm"
                      variant="outline"
                      className="bg-emerald-800 hover:bg-emerald-700 border-emerald-700 text-emerald-200"
                    >
                      <CheckCircle size={16} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
