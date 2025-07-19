// hooks/useLoginUser.js
import { toast } from "react-toastify";
import { loginUserService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

export const useLoginUser = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ["login-key"],

    onSuccess: (response) => {
      login(response.data.user, response.data.token);
      toast.success(response.message || "Login Success");
    },

    onError: (err) => {
      toast.error(err.message || "Login Failed");
    },
  });
};
