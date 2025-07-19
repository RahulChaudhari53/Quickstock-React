import {
  getAllProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deactivateProductApi,
  activateProductApi,
} from "../api/productApi";

export const getAllProductsService = async (params) => {
  try {
    const response = await getAllProductsApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch products." };
  }
};

export const getProductByIdService = async (productId) => {
  try {
    const response = await getProductByIdApi(productId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch product details." };
  }
};

export const createProductService = async (data) => {
  try {
    const response = await createProductApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create product." };
  }
};

export const updateProductService = async ({ productId, data }) => {
  try {
    const response = await updateProductApi(productId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update product." };
  }
};

export const deactivateProductService = async (productId) => {
  try {
    const response = await deactivateProductApi(productId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to deactivate product." };
  }
};

export const activateProductService = async (productId) => {
  try {
    const response = await activateProductApi(productId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to activate product." };
  }
};
