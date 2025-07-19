import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  deactivateCategoryService,
  activateCategoryService,
} from "../services/categoryService";

export const useAllCategories = (filters) => {
  return useQuery({
    queryKey: ["categories", filters],
    queryFn: () => getAllCategoriesService(filters),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load categories.");
    },
  });
};

export const useCategoryById = (categoryId) => {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoryByIdService(categoryId),
    enabled: !!categoryId, // this makes sure the query runs only if categoryId is truthy
    onError: (err) => {
      toast.error(err.message || "Failed to load category details.");
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategoryService,
    onSuccess: (data) => {
      toast.success(data.message || "Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create category.");
    },
  });
};

export const useDeactivateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateCategoryService,
    onSuccess: (data) => {
      toast.success(data.message || "Failed to deactivate category.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to deactivate category.");
    },
  });
};

export const useActivateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateCategoryService,
    onSuccess: (data) => {
      toast.success(data.message || "Category activated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to activate category.");
    },
  });
};
