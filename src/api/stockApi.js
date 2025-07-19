import axios from "./api";

export const getAllStockApi = (params) => axios.get("/stocks", { params });

export const getStockByProductIdApi = (productId) =>
  axios.get(`/stocks/product/${productId}`);

export const getStockMovementApi = (productId, params) =>
  axios.get(`/stocks/history/${productId}`, { params });
