import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllSalesService,
  getSaleByIdService,
  createSaleService,
  cancelSaleService,
} from "../services/saleService";

export const useAllSales = (filters) => {
  return useQuery({
    queryKey: ["sales", filters],
    queryFn: () => getAllSalesService(filters),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load sales.");
    },
  });
};

export const useSaleById = (saleId) => {
  return useQuery({
    queryKey: ["sales", saleId],
    queryFn: () => getSaleByIdService(saleId),
    enabled: !!saleId,
    onError: (err) => {
      toast.error(err.message || "Failed to load sale details.");
    },
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSaleService,
    onSuccess: (data) => {
      toast.success(data.message || "Sale completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to complete sale.");
    },
  });
};

export const useCancelSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelSaleService,
    onSuccess: (data) => {
      toast.success(data.message || "Sale cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to cancel sale.");
    },
  });
};
