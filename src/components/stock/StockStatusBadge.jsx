import { cn } from "../../lib/utils";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function StockStatusBadge({ currentStock, minStockLevel }) {
  let status = "normal";
  if (currentStock <= 0) {
    status = "out_of_stock";
  } else if (currentStock <= minStockLevel) {
    status = "low_stock";
  }

  const baseClasses =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold";

  const statusConfig = {
    normal: {
      text: "In Stock",
      icon: <CheckCircle size={14} />,
      classes: "bg-green-900 text-green-300",
    },
    low_stock: {
      text: "Low Stock",
      icon: <AlertTriangle size={14} />,
      classes: "bg-yellow-800 text-yellow-300",
    },
    out_of_stock: {
      text: "Out of Stock",
      icon: <XCircle size={14} />,
      classes: "bg-red-900 text-red-300",
    },
  };

  const config = statusConfig[status];

  return (
    <span className={cn(baseClasses, config.classes)}>
      {config.icon}
      {config.text}
    </span>
  );
}
