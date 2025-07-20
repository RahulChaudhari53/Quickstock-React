import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle } from "lucide-react";

export default function CategoryTable({
  categories,
  onDeactivate,
  onActivate,
  isProcessing,
}) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p>No categories found.</p>
        <p className="text-sm mt-1">
          Click "Create Category" to add a new one.
        </p>
      </div>
    );
  }

  const StatusBadge = ({ isActive }) =>
    isActive ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
        <CheckCircle size={14} /> Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
        <XCircle size={14} /> Inactive
      </span>
    );

  const ActionButtons = ({ category }) => (
    <div className="flex justify-end gap-2">
      {category.isActive ? (
        <Button
          onClick={() => onDeactivate(category._id)}
          disabled={isProcessing}
          size="sm"
          variant="outline"
          className="bg-red-800 hover:bg-red-700 border-red-700 text-red-200"
        >
          <Trash2 size={16} />
        </Button>
      ) : (
        <Button
          onClick={() => onActivate(category._id)}
          disabled={isProcessing}
          size="sm"
          variant="outline"
          className="bg-emerald-800 hover:bg-emerald-700 border-emerald-700 text-emerald-200"
        >
          <CheckCircle size={16} />
        </Button>
      )}
    </div>
  );

  return (
    <div className="rounded-lg">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Description
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
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-normal max-w-md text-sm text-gray-300">
                  {category.description || (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge isActive={category.isActive} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ActionButtons category={category} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-white break-words">
                {category.name}
              </h3>
              <StatusBadge isActive={category.isActive} />
            </div>
            <p className="text-sm text-gray-400 border-t border-gray-600 pt-3">
              {category.description || "No description provided."}
            </p>
            <div className="flex justify-end mt-4 pt-3 border-t border-gray-600">
              <ActionButtons category={category} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
