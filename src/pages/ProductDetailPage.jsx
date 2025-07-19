import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useProductById,
  useDeactivateProduct,
  useActivateProduct,
} from "../hooks/useProduct";
import ProductDetailView from "../components/product/ProductDetailView";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useProductById(productId);
  const { mutate: deactivateProduct, isPending: isDeactivating } =
    useDeactivateProduct();
  const { mutate: activateProduct, isPending: isActivating } =
    useActivateProduct();

  const isProcessing = isDeactivating || isActivating;

  const handleDeactivate = () => {
    deactivateProduct(productId, {
      onSuccess: () => navigate("/user/products"),
    });
  };

  const handleActivate = () => {
    activateProduct(productId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-indigo-300 text-xl">
        Loading product details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-400 text-xl">
        <p>Error: {error?.message || "Failed to load product details."}</p>
        <Link
          to="/user/products"
          className="mt-4 text-emerald-400 hover:text-emerald-300 transition"
        >
          ← Back to Product List
        </Link>
      </div>
    );
  }

  const product = productData?.data;

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-gray-900 rounded-xl shadow-lg text-white font-inter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-400">Product Details</h1>
        <div>
          {product?.isActive ? (
            <Button
              onClick={handleDeactivate}
              disabled={isProcessing}
              variant="destructive"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isDeactivating ? "Deactivating..." : "Deactivate Product"}
            </Button>
          ) : (
            <Button
              onClick={handleActivate}
              disabled={isProcessing}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isActivating ? "Activating..." : "Activate Product"}
            </Button>
          )}
        </div>
      </div>

      <ProductDetailView product={product} />

      <div className="mt-10 text-center">
        <Link to="/user/products">
          <Button
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 px-6 py-2"
          >
            ← Back to Product List
          </Button>
        </Link>
      </div>
    </div>
  );
}
