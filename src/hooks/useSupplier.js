import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllSuppliersService,
  getSupplierByIdService,
  createSupplierService,
  updateSupplierService,
  deactivateSupplierService,
  activateSupplierService,
} from "../services/supplierServices";

export const useAllSuppliers = (filters) => {
  return useQuery({
    queryKey: ["suppliers", filters],
    queryFn: () => getAllSuppliersService(filters),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load suppliers.");
    },
  });
};

export const useSupplierById = (supplierId) => {
  return useQuery({
    queryKey: ["suppliers", supplierId],
    queryFn: () => getSupplierByIdService(supplierId),
    enabled: !!supplierId,
    onError: (err) => {
      toast.error(err.message || "Failed to load supplier details.");
    },
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSupplierService,
    onSuccess: (data) => {
      toast.success(data.message || "Supplier created successfully!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create supplier.");
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSupplierService,
    onSuccess: (data) => {
      toast.success(data.message || "Supplier updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update supplier.");
    },
  });
};

export const useDeactivateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateSupplierService,
    onSuccess: (data) => {
      toast.success(data.message || "Supplier deactivated successfully!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to deactivate supplier.");
    },
  });
};

export const useActivateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateSupplierService,
    onSuccess: (data) => {
      toast.success(data.message || "Supplier activated successfully!");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to activate supplier.");
    },
  });
};
