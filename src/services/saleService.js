import {
  getAllSalesApi,
  getSaleByIdApi,
  createSaleApi,
  cancelSaleApi,
} from "../api/saleApi";

export const getAllSalesService = async (params) => {
  try {
    const response = await getAllSalesApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch sales." };
  }
};

export const getSaleByIdService = async (saleId) => {
  try {
    const response = await getSaleByIdApi(saleId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch sale details." };
  }
};

export const createSaleService = async (data) => {
  try {
    const response = await createSaleApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create sale." };
  }
};

export const cancelSaleService = async (saleId) => {
  try {
    const response = await cancelSaleApi(saleId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to cancel sale." };
  }
};
