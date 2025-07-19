import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deactivateProductService,
  activateProductService,
} from "../services/productService";

export const useAllProducts = (filters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getAllProductsService(filters),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load products.");
    },
  });
};

export const useProductById = (productId) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductByIdService(productId),
    enabled: !!productId,
    onError: (err) => {
      toast.error(err.message || "Failed to load product details.");
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductService,
    onSuccess: (data) => {
      toast.success(data.message || "Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create product.");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductService,
    onSuccess: (data) => {
      toast.success(data.message || "Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update product.");
    },
  });
};

export const useDeactivateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateProductService,
    onSuccess: (data) => {
      toast.success(data.message || "Product deactivated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to deactivate product.");
    },
  });
};

export const useActivateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateProductService,
    onSuccess: (data) => {
      toast.success(data.message || "Product activated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to activate product.");
    },
  });
};
