import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSale } from "../../hooks/useSale";
import { toast } from "react-toastify";
import ProductCatalog from "../../components/sale/ProductCatalog";
import SaleCart from "../../components/sale/SaleCart";
import { Button } from "@/components/ui/button";

export default function PointOfSalePage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { mutate: createSale, isPending } = useCreateSale();

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product === product._id
      );
      if (existingItem) {
        if (existingItem.quantity < product.currentStock) {
          return prevItems.map((item) =>
            item.product === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast.warn(`Cannot add more ${product.name}. Stock limit reached.`);
          return prevItems;
        }
      } else if (product.currentStock > 0) {
        return [
          ...prevItems,
          {
            product: product._id,
            name: product.name,
            quantity: 1,
            unitPrice: product.sellingPrice,
            stock: product.currentStock,
          },
        ];
      } else {
        toast.error(`${product.name} is out of stock.`);
        return prevItems;
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
    setCartItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => item.product === productId);
      if (newQuantity > itemToUpdate.stock) {
        toast.warn(
          `Quantity cannot exceed available stock (${itemToUpdate.stock}).`
        );
        return prevItems.map((item) =>
          item.product === productId
            ? { ...item, quantity: itemToUpdate.stock }
            : item
        );
      }
      return prevItems.map((item) =>
        item.product === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCompleteSale = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty. Please add products to complete the sale.");
      return;
    }
    const saleData = {
      paymentMethod,
      items: cartItems.map(({ product, quantity, unitPrice }) => ({
        product,
        quantity,
        unitPrice,
      })),
    };
    createSale(saleData, {
      onSuccess: () => {
        setCartItems([]);
        navigate("/user/sales");
      },
    });
  };

  return (
    <div className="container mx-auto h-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <ProductCatalog onAddToCart={handleAddToCart} />

        <div className="flex flex-col h-full bg-gray-900 rounded-lg p-4 gap-4">
          <div className="flex-grow h-0">
            {" "}
            {/* h-0 is a trick to make overflow-y-auto work in a flex child */}
            <SaleCart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          </div>
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            >
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
            <Button
              onClick={handleCompleteSale}
              disabled={isPending || cartItems.length === 0}
              className="w-full mt-4 py-4 text-lg font-bold bg-emerald-600 hover:bg-emerald-700"
            >
              {isPending ? "Processing..." : "Complete Sale"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
