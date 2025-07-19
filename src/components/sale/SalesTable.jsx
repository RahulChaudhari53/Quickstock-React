import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, ArrowUp, ArrowDown } from "lucide-react";

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

export default function SalesTable({ sales, currentSort, onSort }) {
  const navigate = useNavigate();

  const handleViewDetails = (saleId) => {
    navigate(`/user/sales/${saleId}`);
  };

  if (!sales || sales.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No sales records found.</p>
        <p className="text-sm mt-2">
          Navigate to the Point of Sale page to create a new sale.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <SortableHeader
              label="Invoice #"
              field="invoiceNumber"
              currentSort={currentSort}
              onSort={onSort}
            />
            <SortableHeader
              label="Sale Date"
              field="saleDate"
              currentSort={currentSort}
              onSort={onSort}
            />
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Items
            </th>
            <SortableHeader
              label="Total Amount"
              field="totalAmount"
              currentSort={currentSort}
              onSort={onSort}
            />
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {sales.map((sale) => (
            <tr key={sale._id} className="hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {sale.invoiceNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {new Date(sale.saleDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {sale.items.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-400">
                ${sale.totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                {sale.paymentMethod}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  onClick={() => handleViewDetails(sale._id)}
                  size="sm"
                  variant="outline"
                  className="bg-blue-800 hover:bg-blue-700 border-blue-700"
                >
                  <Eye size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
