import {
  getAllPurchasesApi,
  getPurchaseByIdApi,
  createPurchaseApi,
  updatePurchaseApi,
  cancelPurchaseApi,
  receivePurchaseApi,
} from "../api/purchaseApi";

export const getAllPurchasesService = async (params) => {
  try {
    const response = await getAllPurchasesApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch purchases." };
  }
};

export const getPurchaseByIdService = async (purchaseId) => {
  try {
    const response = await getPurchaseByIdApi(purchaseId);
    return response.data;
  } catch (err) {
    throw (
      err.response?.data || { message: "Failed to fetch purchase details." }
    );
  }
};

export const createPurchaseService = async (data) => {
  try {
    const response = await createPurchaseApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create purchase." };
  }
};

export const updatePurchaseService = async ({ purchaseId, data }) => {
  // forgot to destructure the object, was: (purchaseId, data)
  try {
    const response = await updatePurchaseApi(purchaseId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update purchase." };
  }
};

export const cancelPurchaseService = async (purchaseId) => {
  try {
    const response = await cancelPurchaseApi(purchaseId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to cancel purchase." };
  }
};

export const receivePurchaseService = async (purchaseId) => {
  try {
    const response = await receivePurchaseApi(purchaseId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to receive purchase." };
  }
};
