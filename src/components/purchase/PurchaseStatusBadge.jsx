import { cn } from "../../lib/utils";

export default function PurchaseStatusBadge({ status }) {
  const baseClasses =
    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold";

  const statusStyles = {
    ordered: "bg-blue-900 text-blue-300",
    received: "bg-green-900 text-green-300",
    cancelled: "bg-red-900 text-red-300",
  };

  const statusText = {
    ordered: "Ordered",
    received: "Received",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={cn(
        baseClasses,
        statusStyles[status] || "bg-gray-700 text-gray-300"
      )}
    >
      {statusText[status] || "Unknown Status"}
    </span>
  );
}
