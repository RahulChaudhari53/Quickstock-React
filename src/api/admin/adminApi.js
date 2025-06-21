import axios from "../api";

export const getAllUserApi = (params) => axios.get("/admin/users", { params });

export const getUserByIdApi = (userId) => axios.get(`/admin/users/${userId}`);

export const makeAdminApi = (userId) =>
  axios.patch(`/admin/users/${userId}/make-admin`);
