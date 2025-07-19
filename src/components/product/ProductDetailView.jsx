import {
  CheckCircle,
  XCircle,
  Tag,
  Users,
  Package,
  DollarSign,
  BarChartHorizontal,
  AlertTriangle,
  FileText,
} from "lucide-react";

// A reusable component for displaying a single piece of information
const DetailRow = ({ icon, label, value, children }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-800 rounded-md shadow-sm">
    <div className="flex-shrink-0 w-6 h-6 text-emerald-400 mt-1">{icon}</div>
    <div className="flex-grow">
      <p className="text-sm text-gray-400">{label}</p>
      {value && <p className="text-lg font-semibold">{value}</p>}
      {children}
    </div>
  </div>
);

export default function ProductDetailView({ product }) {
  if (!product) {
    return (
      <div className="text-center text-gray-400">
        No product data available.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <DetailRow icon={<Package />} label="Product Name & SKU">
        <p className="text-lg font-semibold">{product.name}</p>
        <p className="text-sm text-gray-400">{product.sku}</p>
      </DetailRow>

      {product.description && (
        <DetailRow icon={<FileText />} label="Description">
          <p className="text-base whitespace-pre-wrap">{product.description}</p>
        </DetailRow>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DetailRow
          icon={<Tag />}
          label="Category"
          value={product.category?.name || "N/A"}
        />
        <DetailRow
          icon={<Users />}
          label="Supplier"
          value={product.supplier?.name || "N/A"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DetailRow
          icon={<DollarSign />}
          label="Selling Price"
          value={`$${product.sellingPrice.toFixed(2)}`}
        />
        <DetailRow
          icon={<DollarSign color="#f87171" />}
          label="Purchase Price"
          value={`$${product.purchasePrice.toFixed(2)}`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DetailRow icon={<BarChartHorizontal />} label="Current Stock">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{product.currentStock}</p>
            <p className="text-sm text-gray-400">({product.unit})</p>
          </div>
        </DetailRow>
        <DetailRow icon={<AlertTriangle />} label="Minimum Stock Level">
          <p className="text-2xl font-bold">{product.minStockLevel}</p>
        </DetailRow>
      </div>

      <DetailRow
        icon={product.isActive ? <CheckCircle /> : <XCircle />}
        label="Status"
      >
        <p
          className={`text-lg font-semibold ${
            product.isActive ? "text-green-400" : "text-red-400"
          }`}
        >
          {product.isActive ? "Active" : "Inactive"}
        </p>
      </DetailRow>
    </div>
  );
}
