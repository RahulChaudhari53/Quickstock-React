import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";

export default function SupplierTable({
  suppliers,
  onDeactivate,
  onActivate,
  onEdit,
  isProcessing,
}) {
  const navigate = useNavigate();
  const handleViewDetails = (supplierId) =>
    navigate(`/user/suppliers/${supplierId}`);

  if (!suppliers || suppliers.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-lg">
        <p>No suppliers found.</p>
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

  const ActionButtons = ({ supplier }) => (
    <div className="flex justify-end gap-2">
      <Button
        onClick={() => handleViewDetails(supplier._id)}
        disabled={isProcessing}
        size="sm"
        variant="outline"
        className="bg-blue-800 hover:bg-blue-700 border-blue-700 text-blue-200"
      >
        <Eye size={16} />
      </Button>
      <Button
        onClick={() => onEdit(supplier)}
        disabled={isProcessing}
        size="sm"
        variant="outline"
        className="bg-gray-600 hover:bg-gray-500 border-gray-500"
      >
        <Edit size={16} />
      </Button>
      {supplier.isActive ? (
        <Button
          onClick={() => onDeactivate(supplier._id)}
          disabled={isProcessing}
          size="sm"
          variant="outline"
          className="bg-red-800 hover:bg-red-700 border-red-700 text-red-200"
        >
          <Trash2 size={16} />
        </Button>
      ) : (
        <Button
          onClick={() => onActivate(supplier._id)}
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
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Contact
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
            {suppliers.map((supplier) => (
              <tr key={supplier._id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                  {supplier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div>{supplier.email}</div>
                  <div className="text-xs text-gray-400">{supplier.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge isActive={supplier.isActive} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ActionButtons supplier={supplier} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden space-y-4 p-4">
        {suppliers.map((supplier) => (
          <div
            key={supplier._id}
            className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-white break-words">
                  {supplier.name}
                </h3>
              </div>
              <div className="flex-shrink-0">
                <StatusBadge isActive={supplier.isActive} />
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-gray-600 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-medium text-white">{supplier.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="font-medium text-white">{supplier.phone}</span>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-3 border-t border-gray-600">
              <ActionButtons supplier={supplier} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
