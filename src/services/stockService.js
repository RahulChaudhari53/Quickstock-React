import {
  getAllStockApi,
  getStockByProductIdApi,
  getStockMovementApi,
} from "../api/stockApi";

export const getAllStockService = async (params) => {
  try {
    const response = await getAllStockApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch stock levels." };
  }
};

export const getStockByProductIdService = async (productId) => {
  try {
    const response = await getStockByProductIdApi(productId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch stock details." };
  }
};

export const getStockMovementService = async ({ productId, params }) => {
  try {
    const response = await getStockMovementApi(productId, params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch stock history." };
  }
};
