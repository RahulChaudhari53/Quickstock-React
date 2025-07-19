import axios from "./api";

export const getAllSalesApi = (params) => axios.get("/sales", { params });

export const getSaleByIdApi = (saleId) => axios.get(`/sales/sale/${saleId}`);

export const createSaleApi = (data) => axios.post("/sales/create", data);

export const cancelSaleApi = (saleId) =>
  axios.delete(`/sales/sale/cancel/${saleId}`);
