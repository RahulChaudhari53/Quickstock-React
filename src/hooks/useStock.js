import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllStockService,
  getStockByProductIdService,
  getStockMovementService,
} from "../services/stockService";

export const useAllStock = (filters) => {
  return useQuery({
    queryKey: ["stock", filters],
    queryFn: () => getAllStockService(filters),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load stock levels.");
    },
  });
};

export const useStockByProductId = (productId) => {
  return useQuery({
    queryKey: ["stock", "product", productId],
    queryFn: () => getStockByProductIdService(productId),
    enabled: !!productId,
    onError: (err) => {
      toast.error(err.message || "Failed to load stock details.");
    },
  });
};

export const useStockMovement = (productId, params) => {
  return useQuery({
    queryKey: ["stock", "history", productId, params],
    queryFn: () => getStockMovementService({ productId, params }),
    enabled: !!productId,
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load stock history.");
    },
  });
};
