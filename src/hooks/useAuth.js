// hooks/useAuth.js
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../auth/AuthProvider";
import {
  loginUserService,
  registerUserService,
  forgotPasswordService,
  verifyOtpService,
  resetPasswordService,
} from "../services/authService";
import { toast } from "react-toastify";

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

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPasswordService,
    onSuccess: (response, variables) => {
      toast.success(response.message || "OTP sent successfully!");
      navigate("/verify-otp", {
        state: {
          email: variables.email,
          temp_opt_token: response.data.temp_opt_token,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send OTP.");
    },
  });
};

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtpService,
    onSuccess: (response, variables) => {
      toast.success(response.message || "OTP Verified!");
      navigate("/reset-password", {
        state: {
          email: variables.email,
          reset_token: response.data.reset_token,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message || "OTP verification failed.");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordService,
    onSuccess: (response) => {
      toast.success(
        response.message || "Password reset successfully! Please log in."
      );
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Password reset failed.");
      // On failure (e.g., token expired), send user back to the start
      navigate("/forgot-password");
    },
  });
};
