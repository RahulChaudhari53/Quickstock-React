import { useParams, Link, useNavigate } from "react-router-dom";
import {
  usePurchaseById,
  useCancelPurchase,
  useReceivePurchase,
} from "../hooks/usePurchase";
import PurchaseDetailView from "../components/purchase/PurchaseDetailView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, PackageCheck } from "lucide-react";

export default function PurchaseDetailPage() {
  const { id: purchaseId } = useParams();
  const navigate = useNavigate();

  const {
    data: purchaseData,
    isLoading,
    isError,
    error,
    refetch,
  } = usePurchaseById(purchaseId);

  const { mutate: cancelPurchase, isPending: isCancelling } =
    useCancelPurchase();
  const { mutate: receivePurchase, isPending: isReceiving } =
    useReceivePurchase();

  const isProcessing = isCancelling || isReceiving;

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this purchase order? This action cannot be undone."
      )
    ) {
      cancelPurchase(purchaseId, {
        onSuccess: () => refetch(), // Refetch the purchase data to show the updated status
      });
    }
  };

  const handleReceive = () => {
    if (
      window.confirm(
        "Are you sure you want to mark this purchase as received? This will add items to your stock."
      )
    ) {
      receivePurchase(purchaseId, {
        onSuccess: () => refetch(), // Refetch to show the updated status
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-indigo-300 p-10">
        Loading purchase details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400 p-10">
        Error: {error?.message}
      </div>
    );
  }

  const purchase = purchaseData?.data;

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Button
            onClick={() => navigate("/user/purchases")}
            variant="outline"
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to List
          </Button>
          <h1 className="text-4xl font-bold text-indigo-400">
            Purchase Details
          </h1>
        </div>

        {/* Action Buttons */}
        {purchase?.purchaseStatus === "ordered" && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleCancel}
              disabled={isProcessing}
              variant="destructive"
              // className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
              className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 flex items-center gap-2"
            >
              <X size={16} /> {isCancelling ? "Cancelling..." : "Cancel"}
            </Button>
            <Button
              onClick={handleReceive}
              disabled={isProcessing}
              className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            >
              <PackageCheck size={16} />{" "}
              {isReceiving ? "Receiving..." : "Receive Items"}
            </Button>
          </div>
        )}
      </div>

      <PurchaseDetailView purchase={purchase} />
    </div>
  );
}
