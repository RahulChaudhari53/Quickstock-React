import {
  getMeApi,
  updateUserInfoApi,
  updatePasswordApi,
  updateEmailApi,
  updateProfileImageApi,
  addPhoneNumberApi,
  deletePhoneNumberApi,
  deactivateUserApi,
} from "../api/userApi";

export const getUserProfileService = async () => {
  try {
    const response = await getMeApi();
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch user profile." };
  }
};

export const updateUserInfoService = async ({ userId, data }) => {
  try {
    const response = await updateUserInfoApi(userId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update user info." };
  }
};

export const updatePasswordService = async ({ userId, data }) => {
  try {
    const response = await updatePasswordApi(userId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update password." };
  }
};

export const updateEmailService = async ({ userId, data }) => {
  try {
    const response = await updateEmailApi(userId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update email." };
  }
};

export const updateProfileImageService = async ({ userId, data }) => {
  try {
    const response = await updateProfileImageApi(userId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update profile image." };
  }
};

export const addPhoneNumberService = async ({ userId, data }) => {
  try {
    const response = await addPhoneNumberApi(userId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add phone number." };
  }
};

export const deletePhoneNumberService = async ({ userId, data }) => {
  try {
    const response = await deletePhoneNumberApi(userId, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete phone number." };
  }
};

export const deactivateUserService = async (userId) => {
  try {
    const response = await deactivateUserApi(userId);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to deactivate account." };
  }
};

