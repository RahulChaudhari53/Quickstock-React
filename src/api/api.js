// src/api/api.js
import axios from "axios";
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
