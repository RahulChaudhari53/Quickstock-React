import { useNavigate, useParams } from "react-router-dom";
import { usePurchaseById, useUpdatePurchase } from "../hooks/usePurchase";
import PurchaseForm from "../components/purchase/PurchaseForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditPurchasePage() {
  const { id: purchaseId } = useParams();
  const navigate = useNavigate();

  const {
    data: purchaseData,
    isLoading,
    isError,
    error,
  } = usePurchaseById(purchaseId); // fetching purchase data by ID

  const { mutate: updatePurchase, isPending } = useUpdatePurchase(); // getting the updatePurchase mutation

  const handleFormSubmit = (formData) => {
    updatePurchase(
      { purchaseId: purchaseId, data: formData },
      {
        onSuccess: () => {
          navigate(`/user/purchases/${purchaseId}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="text-center text-indigo-300 p-10">
        Loading purchase data...
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

  if (purchase && purchase.purchaseStatus !== "ordered") {
    return (
      <div className="container mx-auto max-w-4xl p-6 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Cannot Edit Purchase
        </h2>
        <p className="text-gray-300">
          This purchase order cannot be edited because its status is '
          {purchase.purchaseStatus}'.
        </p>
        <Button onClick={() => navigate(-1)} className="mt-6">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex items-center gap-4 mb-8">
        <Button
          onClick={() => navigate(-1)} // Go back to the previous page
          variant="outline"
          size="icon"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-400">
            Edit Purchase Order
          </h1>
          <p className="text-gray-400">#{purchase?.purchaseNumber}</p>
        </div>
      </div>

      <PurchaseForm
        onSubmit={handleFormSubmit}
        isPending={isPending}
        initialData={purchase}
      />
    </div>
  );
}
