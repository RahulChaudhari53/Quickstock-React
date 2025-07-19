import {
  getAllCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  deactivateCategoryApi,
  activateCategoryApi,
} from "../api/categoryApi.js";
// import { handleApiError } from "../utils/errorHandler.js";
// import { handleApiResponse } from "../utils/responseHandler.js";

export const getAllCategoriesService = async (params) => {
  try {
    const response = await getAllCategoriesApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch categories." };
  }
};

export const getCategoryByIdService = async (categoryId) => {
  try {
    const response = await getCategoryByIdApi(categoryId);
    return response.data;
  } catch (err) {
    throw (
      err.response?.data || { message: "Failed to fetch category details." }
    );
  }
};

export const createCategoryService = async (data) => {
  try {
    const response = await createCategoryApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create category." };
  }
};

export const deactivateCategoryService = async (categoryId) => {
  try {
    const response = await deactivateCategoryApi(categoryId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to deactivate category." };
  }
};

export const activateCategoryService = async (categoryId) => {
  try {
    const response = await activateCategoryApi(categoryId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to activate category." };
  }
};
