import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUserService,
  getUserByIdService,
  makeAdminService,
} from "../../services/admin/adminService";
import { toast } from "react-toastify";

export const useAllUsers = (filters) => {
  return useQuery({
    queryKey: ["admin_users", filters],
    queryFn: () => getAllUserService(filters),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err.message || "Failed to load users.");
    },
  });
};

export const useUserById = (userId) => {
  return useQuery({
    queryKey: ["admin_user", userId],
    queryFn: () => getUserByIdService(userId),
    enabled: !!userId,
    onError: (err) => {
      toast.error(err.message || "Failed to load user details.");
    },
  });
};

export const useMakeAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: makeAdminService,
    onSuccess: (data) => {
      toast.success(data.message || "User promoted to admin successfully!");
      queryClient.invalidateQueries(["admin_users"]);
      queryClient.invalidateQueries(["admin_ser", data.data._id]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to promote user to admin.");
    },
  });
};
