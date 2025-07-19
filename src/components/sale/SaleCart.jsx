import { Button } from "@/components/ui/button";
import { Trash2, XCircle } from "lucide-react";

export default function SaleCart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-emerald-400">Current Sale</h2>
        <Button
          onClick={onClearCart}
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300"
        >
          <XCircle size={16} className="mr-1" /> Clear All
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-center mt-8">
            Cart is empty. Add products to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center gap-3 p-2 bg-gray-700 rounded-md"
              >
                <div className="flex-grow">
                  <p className="text-sm font-semibold truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    ${item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(
                        item.product,
                        parseInt(e.target.value, 10)
                      )
                    }
                    min="1"
                    className="w-16 p-1 bg-gray-800 border border-gray-600 rounded-md text-center"
                  />
                </div>
                <Button
                  onClick={() => onRemoveItem(item.product)}
                  size="icon"
                  variant="ghost"
                  className="text-red-400 hover:bg-red-900/50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span className="text-emerald-400">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
