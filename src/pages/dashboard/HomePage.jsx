import { useEffect, useState } from "react";
import { usePage } from "../../auth/PageContext";
import { Link } from "react-router-dom";
import { useDashboardOverview } from "../../hooks/useDashboard";
import {
  Package,
  Users,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Archive,
} from "lucide-react";

// Reusable component for a single statistic card
const StatCard = ({ title, value, to, icon, isLoading, subtext = null }) => (
  <Link
    to={to}
    className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all"
  >
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className="text-gray-400">{icon}</div>
    </div>
    {isLoading ? (
      <div className="mt-2 h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
    ) : (
      <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
    )}
    {subtext && !isLoading && (
      <p className="text-xs text-gray-400 mt-1">{subtext}</p>
    )}
  </Link>
);

// Reusable card for alert-style statistics (e.g., low stock)
const AlertStatCard = ({
  title,
  value,
  to,
  icon,
  isLoading,
  danger = false,
}) => (
  <div
    className={`p-6 rounded-lg border shadow-sm transition-all ${
      danger
        ? "bg-red-50 border-red-200 hover:border-red-400"
        : "bg-white border-gray-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className={danger ? "text-red-500" : "text-gray-400"}>{icon}</div>
    </div>
    {isLoading ? (
      <div className="mt-2 h-9 w-16 bg-gray-200 rounded animate-pulse"></div>
    ) : (
      <p
        className={`mt-2 text-3xl font-bold ${
          danger ? "text-red-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    )}
    {danger && to && !isLoading && (
      <Link
        to={to}
        className="text-sm font-semibold text-red-600 hover:text-red-700 mt-1 inline-flex items-center"
      >
        View Items <ArrowRight size={16} className="ml-1" />
      </Link>
    )}
  </div>
);

export default function HomePage() {
  const { setPageTitle } = usePage();
  useEffect(() => {
    setPageTitle("Dashboard");
  }, [setPageTitle]);

  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState({}); // future date range filtering
  const { data: overviewData, isLoading } = useDashboardOverview(filters);
  const data = overviewData?.data || {};

  return (
    <div className="w-full space-y-8">
      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Stock Items"
          value={data.totalStockItems?.toLocaleString() || "0"}
          subtext={`${
            data.activeProducts?.toLocaleString() || "0"
          } distinct products`}
          icon={<Archive size={22} />}
          to="/user/stock"
          isLoading={isLoading}
        />
        <StatCard
          title="Inventory Value (Buy)"
          value={`$${
            data.inventoryPurchaseValue?.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            }) || "0"
          }`}
          subtext="Based on purchase price"
          icon={<DollarSign size={22} />}
          to="/user/stock"
          isLoading={isLoading}
        />
        <StatCard
          title="Sales Orders"
          value={data.totalSalesOrders?.toLocaleString() || "0"}
          subtext="In the last 30 days"
          icon={<ShoppingCart size={22} />}
          to="/user/sales"
          isLoading={isLoading}
        />
        <StatCard
          title="Active Suppliers"
          value={data.activeSuppliers?.toLocaleString() || "0"}
          subtext="Verified partners"
          icon={<Users size={22} />}
          to="/user/suppliers"
          isLoading={isLoading}
        />
      </div>

      {/* Secondary Metrics & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AlertStatCard
          title="Low Stock"
          value={data.lowStockCount?.toLocaleString() || "0"}
          icon={<AlertTriangle size={22} />}
          to="/user/products?stockStatus=low_stock"
          isLoading={isLoading}
          danger={data.lowStockCount > 0}
        />
        <AlertStatCard
          title="Out of Stock"
          value={data.outOfStockCount?.toLocaleString() || "0"}
          icon={<XCircle size={22} />}
          to="/user/products?stockStatus=out_of_stock"
          isLoading={isLoading}
          danger={data.outOfStockCount > 0}
        />
        <StatCard
          title="Active Products"
          value={data.activeProducts?.toLocaleString() || "0"}
          icon={<Package size={22} />}
          to="/user/products"
          isLoading={isLoading}
        />
      </div>

      {/* Placeholder for future charts */}
      <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics</h2>
        <p className="text-gray-500">
          More detailed charts for sales, purchases, and financial reports will
          be available here in a future update.
        </p>
      </div>
    </div>
  );
}
