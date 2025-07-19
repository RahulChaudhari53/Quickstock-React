import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PurchaseStatusBadge from "./PurchaseStatusBadge";
import { Eye, Edit, ArrowUp, ArrowDown } from "lucide-react";

export default function PurchaseTable({ purchases, currentSort, onSort }) {
  const navigate = useNavigate();

  const SortableHeader = ({
    label,
    field,
    currentSort,
    onSort,
    className = "",
  }) => {
    const isSortedByThisField = currentSort.sortBy === field;
    const sortOrder = isSortedByThisField ? currentSort.sortOrder : null;

    return (
      <th
        scope="col"
        className={`group px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer select-none transition-colors hover:bg-blue-600/50 ${className}`}
        onClick={() => onSort(field)}
      >
        <div className="flex items-center gap-2">
          {label}
          <span className="w-4 h-4">
            {isSortedByThisField &&
              (sortOrder === "desc" ? (
                <ArrowDown size={14} className="text-emerald-400" />
              ) : (
                <ArrowUp size={14} className="text-emerald-400" />
              ))}
          </span>
        </div>
      </th>
    );
  };

  const handleViewDetails = (id) => navigate(`/user/purchases/${id}`);
  const handleEdit = (id) => navigate(`/user/purchases/edit/${id}`);

  if (!purchases || purchases.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No purchase orders found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-lg bg-gray-800 border border-gray-700 shadow">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <SortableHeader
                label="Purchase #"
                field="purchaseNumber"
                currentSort={currentSort}
                onSort={onSort}
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Supplier
              </th>
              <SortableHeader
                label="Order Date"
                field="orderDate"
                currentSort={currentSort}
                onSort={onSort}
              />
              <SortableHeader
                label="Total Amount"
                field="totalAmount"
                currentSort={currentSort}
                onSort={onSort}
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {purchases.map((purchase) => (
              <tr key={purchase._id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {purchase.purchaseNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {purchase.supplier?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(purchase.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                  ${purchase.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <PurchaseStatusBadge status={purchase.purchaseStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => handleViewDetails(purchase._id)}
                      size="sm"
                      variant="outline"
                      className="bg-blue-800"
                    >
                      <Eye size={16} />
                    </Button>
                    {purchase.purchaseStatus === "ordered" && (
                      <Button
                        onClick={() => handleEdit(purchase._id)}
                        size="sm"
                        variant="outline"
                        className="bg-gray-600"
                      >
                        <Edit size={16} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {purchases.map((purchase) => (
          <div
            key={purchase._id}
            className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-white">
                  {purchase.purchaseNumber}
                </h3>
                <p className="text-sm text-gray-400">
                  {purchase.supplier?.name || "N/A"}
                </p>
              </div>
              <div className="flex-shrink-0">
                <PurchaseStatusBadge status={purchase.purchaseStatus} />
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-gray-600 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Date:</span>
                <span className="font-medium text-white">
                  {new Date(purchase.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total:</span>
                <span className="font-bold text-xl text-emerald-400">
                  ${purchase.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-3 border-t border-gray-600 gap-2">
              <Button
                onClick={() => handleViewDetails(purchase._id)}
                size="sm"
                variant="outline"
                className="bg-blue-800 flex-grow justify-center"
              >
                <Eye size={16} className="mr-2" /> View
              </Button>
              {purchase.purchaseStatus === "ordered" && (
                <Button
                  onClick={() => handleEdit(purchase._id)}
                  size="sm"
                  variant="outline"
                  className="bg-gray-600 flex-grow justify-center"
                >
                  <Edit size={16} className="mr-2" /> Edit
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
