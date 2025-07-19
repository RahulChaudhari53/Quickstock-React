import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  getUserProfileService,
  updateUserInfoService,
  updatePasswordService,
  updateEmailService,
  updateProfileImageService,
  addPhoneNumberService,
  deletePhoneNumberService,
  deactivateUserService,
} from "../services/userService";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfileService,
    onError: (err) => {
      toast.error(err.message || "Could not fetch profile.");
    },
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfoService,
    onSuccess: (response) => {
      toast.success(response.message || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err) => {
      toast.error(err.message || "Update failed.");
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePasswordService,
    onSuccess: (response) => {
      toast.success(response.message || "Password updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Password update failed.");
    },
  });
};

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmailService,
    onSuccess: (response) => {
      toast.success(response.message || "Email updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err) => {
      toast.error(err.message || "Email update failed.");
    },
  });
};

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImageService,
    onSuccess: (response) => {
      toast.success(response.message || "Profile image updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err) => {
      toast.error(err.message || "Profile image update failed.");
    },
  });
};

export const useAddPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPhoneNumberService,
    onSuccess: (response) => {
      toast.success(response.message || "Phone number added successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add phone number.");
    },
  });
};

export const useDeletePhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePhoneNumberService,
    onSuccess: (response) => {
      toast.success(response.message || "Phone number removed successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to remove phone number.");
    },
  });
};

export const useDeactivateUser = () => {
  return useMutation({
    mutationFn: deactivateUserService,
    onSuccess: (response) => {
      toast.success(response.message || "Account deactivated successfully.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to deactivate account.");
    },
  });
};
