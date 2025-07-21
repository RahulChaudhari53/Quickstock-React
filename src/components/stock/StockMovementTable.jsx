import { ArrowDown, ArrowUp, Edit, Package, RotateCcw } from "lucide-react";

// Helper to determine the style and icon for each movement type
const getMovementTypeDetails = (type) => {
  switch (type) {
    case "purchase":
      return {
        text: "Purchase",
        color: "text-green-400",
        icon: <ArrowUp size={16} />,
      };
    case "sale":
      return {
        text: "Sale",
        color: "text-red-400",
        icon: <ArrowDown size={16} />,
      };
    case "adjustment":
      return {
        text: "Adjustment",
        color: "text-yellow-400",
        icon: <Edit size={16} />,
      };
    case "return":
      return {
        text: "Customer Return",
        color: "text-blue-400",
        icon: <RotateCcw size={16} />,
      };
    default:
      return {
        text: "Unknown",
        color: "text-gray-400",
        icon: <Package size={16} />,
      };
  }
};

export default function StockMovementTable({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No stock movement history found for this product.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Notes / Source
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Performed By
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {history.map((movement, index) => {
            const details = getMovementTypeDetails(movement.movementType);
            const isNegative = ["sale"].includes(movement.movementType);
            return (
              <tr key={index} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(movement.date).toLocaleString()}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${details.color}`}
                >
                  <div className="flex items-center gap-2">
                    {details.icon}
                    {details.text}
                  </div>
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${details.color}`}
                >
                  {isNegative ? "-" : "+"}
                  {movement.quantity}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-400 max-w-md">
                  {movement.notes || "No notes"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {movement.movedBy?.name || "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
