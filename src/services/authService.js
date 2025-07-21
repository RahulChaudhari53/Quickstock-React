// services/admin/authService.js
import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
} from "../api/authApi";

export const registerUserService = async (formData) => {
  try {
    const response = await registerUserApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration Failed" };
  }
};

export const loginUserService = async (formData) => {
  try {
    const response = await loginUserApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login Failed" };
  }
};

export const forgotPasswordService = async (formData) => {
  try {
    const response = await forgotPasswordApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to send OTP." };
  }
};

export const verifyOtpService = async ({ otp, token }) => {
  try {
    const response = await verifyOtpApi({ otp }, token);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to verify OTP." };
  }
};

export const resetPasswordService = async ({ newPassword, token }) => {
  try {
    const response = await resetPasswordApi({ newPassword }, token);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to reset password." };
  }
};
