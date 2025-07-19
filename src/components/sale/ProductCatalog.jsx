import { useState } from "react";
import { useAllProducts } from "../../hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";

export default function ProductCatalog({ onAddToCart }) {
  const [filters, setFilters] = useState({
    search: "",
    limit: 20,
    isActive: true,
  });

  const { data: productData, isLoading } = useAllProducts(filters);

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const products = productData?.data?.products || [];

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-emerald-400">Products</h2>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products by name or SKU..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 bg-gray-700 border-gray-600 rounded-md"
        />
      </div>

      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <div className="flex-grow overflow-y-auto pr-2">
          {products.length === 0 ? (
            <p className="text-gray-400 text-center mt-8">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-700 rounded-lg p-3 flex flex-col justify-between shadow-md"
                >
                  <div>
                    <p className="text-sm font-semibold truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Stock: {product.currentStock}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col items-start">
                    <p className="text-lg font-bold text-emerald-400">
                      ${product.sellingPrice.toFixed(2)}
                    </p>
                    <Button
                      onClick={() => onAddToCart(product)}
                      size="sm"
                      className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-xs"
                      disabled={product.currentStock <= 0}
                    >
                      <PlusCircle size={14} className="mr-1" /> Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
