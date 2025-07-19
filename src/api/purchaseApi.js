import axios from "./api";

export const getAllPurchasesApi = (params) =>
  axios.get("/purchases", { params });

export const getPurchaseByIdApi = (purchaseId) =>
  axios.get(`/purchases/purchase/${purchaseId}`);

export const createPurchaseApi = (data) =>
  axios.post("/purchases/create", data);

export const updatePurchaseApi = (purchaseId, data) =>
  axios.patch(`/purchases/purchase/update/${purchaseId}`, data);

export const cancelPurchaseApi = (purchaseId) =>
  axios.patch(`/purchases/purchase/cancel/${purchaseId}`);

export const receivePurchaseApi = (purchaseId) =>
  axios.patch(`/purchases/purchase/receive/${purchaseId}s`);
