import { useParams, Link, useNavigate } from "react-router-dom";
import { useSaleById, useCancelSale } from "../../hooks/useSale";
import SaleDetailView from "../../components/sale/SaleDetailView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle } from "lucide-react";

export default function SaleDetailPage() {
  const { id: saleId } = useParams();
  const navigate = useNavigate();

  const { data: saleData, isLoading, isError, error } = useSaleById(saleId);
  const { mutate: cancelSale, isPending: isCancelling } = useCancelSale();

  const handleCancelSale = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this sale? This will restock the items and permanently delete the sale record."
      )
    ) {
      cancelSale(saleId, {
        onSuccess: () => {
          navigate("/user/sales");
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-indigo-300 p-10">
        Loading sale details...
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
  const sale = saleData?.data;

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-gray-900 rounded-lg shadow-xl text-white font-inter">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <Button
            onClick={() => navigate("/user/sales")}
            variant="outline"
            size="sm"
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Sales History
          </Button>
          <h1 className="text-4xl font-bold text-indigo-400">Sale Details</h1>
        </div>

        <div className="flex-shrink-0">
          <Button
            onClick={handleCancelSale}
            disabled={isCancelling}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2 w-full md:w-auto"
          >
            <XCircle size={16} />
            {isCancelling ? "Cancelling..." : "Cancel Sale"}
          </Button>
        </div>
      </div>

      <SaleDetailView sale={sale} />
    </div>
  );
}
