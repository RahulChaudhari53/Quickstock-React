// src/components/category/categoryTable.jsx
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function CategoryTable({
  categories,
  onDeactivate,
  onActivate,
  isProcessing,
}) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No categories found.</p>
        <p className="text-sm mt-2">
          Click the "Create Category" button to add a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
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
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-300 max-w-sm">
                {category.description || (
                  <span className="text-gray-500">No description</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {category.isActive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                    <CheckCircle size={14} />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
                    <XCircle size={14} />
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
