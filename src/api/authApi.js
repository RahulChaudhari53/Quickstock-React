// src/api/authApi.js
import axios from "./api";

export const registerUserApi = (data) => axios.post("/users/signup", data);

export const loginUserApi = (data) => axios.post("/users/login", data);

export const forgotPasswordApi = (data) =>
  axios.post("/users/forgotPassword", data);

export const verifyOtpApi = (data, token) =>
  axios.post("/users/verify-otp", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const resetPasswordApi = (data, token) =>
  axios.post("/users/resetPassword", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
