import axios from "./api";

export const getAllCategoriesApi = (params) =>
  axios.get("/categories", { params });

export const getCategoryByIdApi = (categoryId) =>
  axios.get(`/categories/category/${categoryId}`);

export const createCategoryApi = (data) =>
  axios.post("/categories/create", data);

export const deactivateCategoryApi = (categoryId) =>
  axios.delete(`/categories/category/deactivate/${categoryId}`);

export const activateCategoryApi = (categoryId) =>
  axios.patch(`/categories/category/activate/${categoryId}`);
