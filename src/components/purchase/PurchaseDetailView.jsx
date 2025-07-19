import PurchaseStatusBadge from "./PurchaseStatusBadge";
import {
  User,
  Calendar,
  DollarSign,
  FileText,
  ShoppingBag,
} from "lucide-react";

export default function PurchaseDetailView({ purchase }) {
  if (!purchase) {
    return (
      <div className="text-center text-gray-400">
        No purchase data available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Purchase #{purchase.purchaseNumber}
            </h2>
            <p className="text-sm text-gray-400">
              Order Date: {new Date(purchase.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <PurchaseStatusBadge status={purchase.purchaseStatus} />
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">Supplier</p>
              <p className="text-lg font-semibold">{purchase.supplier.name}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">Payment Method</p>
              <p className="text-lg font-semibold capitalize">
                {purchase.paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized List */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-emerald-400" />
          Items Ordered
        </h3>
        <div className="space-y-3">
          {purchase.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-700 rounded-md"
            >
              <div>
                <p className="font-semibold text-white">{item.product.name}</p>
                <p className="text-sm text-gray-400">{item.product.sku}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">
                  {item.quantity} x ${item.unitCost.toFixed(2)}
                </p>
                <p className="text-lg font-bold text-emerald-400">
                  ${item.totalCost.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-600 flex justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Amount</p>
            <p className="text-3xl font-extrabold text-emerald-400">
              ${purchase.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {purchase.notes && (
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="h-6 w-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-400">Notes</p>
              <p className="text-base whitespace-pre-wrap">{purchase.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
