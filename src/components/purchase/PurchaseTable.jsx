import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
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

  const handleViewDetails = (purchaseId) => {
    navigate(`/user/purchases/${purchaseId}`);
  };

  const handleEditPurchase = (purchaseId) => {
    navigate(`/user/purchases/edit/${purchaseId}`);
  };

  if (!purchases || purchases.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No purchase orders found.</p>
        <p className="text-sm mt-2">
          {" "}
          Click the "click Purchase" button to add a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Purchase #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Supplier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Order Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Total Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th> */}

            <SortableHeader
              label="Purchase #"
              field="purchaseNumber"
              currentSort={currentSort}
              onSort={onSort}
            />
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
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
                    className="bg-blue-800 hover:bg-blue-700 border-blue-700"
                  >
                    <Eye size={16} />
                  </Button>
                  {purchase.purchaseStatus === "ordered" && (
                    <Button
                      onClick={() => handleEditPurchase(purchase._id)}
                      size="sm"
                      variant="outline"
                      className="bg-gray-600 hover:bg-gray-500 border-gray-500"
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
  );
}
