// src/services/supplierServices.js
import {
  getAllSuppliersApi,
  getSupplierByIdApi,
  createSupplierApi,
  updateSupplierApi,
  deactivateSupplierApi,
  activateSupplierApi,
} from "../api/supplierApi";

export const getAllSuppliersService = async (params) => {
  try {
    const response = await getAllSuppliersApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch suppliers." };
  }
};

export const getSupplierByIdService = async (supplierId) => {
  try {
    const response = await getSupplierByIdApi(supplierId);
    return response.data;
  } catch (err) {
    throw (
      err.response?.data || { message: "Failed to fetch supplier details." }
    );
  }
};

export const createSupplierService = async (data) => {
  try {
    const response = await createSupplierApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create supplier." };
  }
};

export const updateSupplierService = async ({ supplierId, data }) => {
  try {
    const response = await updateSupplierApi(supplierId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update supplier." };
  }
};

export const deactivateSupplierService = async (supplierId) => {
  try {
    const response = await deactivateSupplierApi(supplierId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to deactivate supplier." };
  }
};

export const activateSupplierService = async (supplierId) => {
  try {
    const response = await activateSupplierApi(supplierId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to activate supplier." };
  }
};
