import { useNavigate } from "react-router-dom";
import PurchaseForm from "../../components/purchase/PurchaseForm";
import { useCreatePurchase } from "../../hooks/usePurchase";
// import { Button } from "../../components/ui/Button";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreatePurchasePage() {
  const navigate = useNavigate();
  const { mutate: createPurchase, isPending } = useCreatePurchase();

  const handleFormSubmit = (formData) => {
    createPurchase(formData, {
      onSuccess: () => {
        navigate("/user/purchases");
      },
    });
  };
  return (
    <div className="container mx-auto max-w-4xl p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex items-center gap-4 mb-8">
        <Button
          onClick={() => navigate("/user/purchases")}
          variant="outline"
          size="icon"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-3xl font-extrabold text-indigo-400">
          Create New Purchase Order
        </h1>
      </div>

      <PurchaseForm onSubmit={handleFormSubmit} isPending={isPending} />
    </div>
  );
}
