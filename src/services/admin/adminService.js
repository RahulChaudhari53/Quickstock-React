import {
  getAllUserApi,
  getUserByIdApi,
  makeAdminApi,
} from "../../api/admin/adminApi";

export const getAllUserService = async (params) => {
  try {
    const response = await getAllUserApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch users." };
  }
};

export const getUserByIdService = async (userId) => {
  try {
    const response = await getUserByIdApi(userId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch user." };
  }
};

export const makeAdminService = async (userId) => {
  try {
    const response = await makeAdminApi(userId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to promote user." };
  }
};
