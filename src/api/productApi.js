import axios from "./api";

export const getAllProductsApi = (params) => axios.get("/products", { params });

export const getProductByIdApi = (productId) =>
  axios.get(`/products/product/${productId}`);

export const createProductApi = (data) => axios.post("/products/create", data);

export const updateProductApi = (productId, data) =>
  axios.patch(`/products/product/update/${productId}`, data);

export const deactivateProductApi = (productId) =>
  axios.delete(`/products/product/deactivate/${productId}`);

export const activateProductApi = (productId) =>
  axios.patch(`/products/product/activate/${productId}`);
