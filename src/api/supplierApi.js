// src/api/supplierApi.js
import axios from "./api";

export const getAllSuppliersApi = (params) =>
  axios.get("/suppliers", { params });

export const getSupplierByIdApi = (supplierId) =>
  axios.get(`/suppliers/supplier/${supplierId}`);

export const createSupplierApi = (data) =>
  axios.post("/suppliers/create", data);

export const updateSupplierApi = (supplierId, data) =>
  axios.patch(`/suppliers/supplier/update/${supplierId}`, data);

export const deactivateSupplierApi = (supplierId) =>
  axios.patch(`/suppliers/supplier/deactivate/${supplierId}`);

export const activateSupplierApi = (supplierId) =>
  axios.patch(`/suppliers/supplier/activate/${supplierId}`);
