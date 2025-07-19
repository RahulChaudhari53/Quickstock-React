import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllPurchasesService,
  getPurchaseByIdService,
  createPurchaseService,
  updatePurchaseService,
  cancelPurchaseService,
  receivePurchaseService,
} from "../services/purchaseService";

export const useAllPurchases = (filters) => {
  return useQuery({
    queryKey: ["purchases", filters],
    queryFn: () => getAllPurchasesService(filters),
    // queryFn: ({ queryKey }) => getAllPurchasesService(queryKey[1]),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load purchases.");
    },
  });
};

export const usePurchaseById = (purchaseId) => {
  return useQuery({
    queryKey: ["purchases", purchaseId],
    queryFn: () => getPurchaseByIdService(purchaseId),
    enabled: !!purchaseId,
    onError: (err) => {
      toast.error(err.message || "Failed to load purchase details.");
    },
  });
};

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPurchaseService,
    onSuccess: (data) => {
      toast.success(data.message || "Purchase created successfully!");
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create purchase.");
    },
  });
};

export const useUpdatePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePurchaseService,
    onSuccess: (data) => {
      toast.success(data.message || "Purchase updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update purchase.");
    },
  });
};

export const useCancelPurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelPurchaseService,
    onSuccess: (data) => {
      toast.success(data.message || "Purchase cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to cancel purchase.");
    },
  });
};

export const useReceivePurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: receivePurchaseService,
    onSuccess: (data) => {
      toast.success(data.message || "Purchase marked as received!");
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to receive purchase.");
    },
  });
};
