import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUserService,
    mutationKey: ["register"],

    onSuccess: (response) => {
      toast.success(response.message || "Registration Successful");
    },

    onError: (err) => {
      toast.error(err.message || "Registration Failed");
    },
  });
};
