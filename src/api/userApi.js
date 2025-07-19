// src/api/userApi.js
import axios from "./api";

const getMeApi = () => axios.get("/users/me");

const updateUserInfoApi = (userId, data) =>
  axios.patch(`/users/updateUserInfo/${userId}`, data);

const updatePasswordApi = (userId, data) =>
  axios.patch(`/users/updatePassword/${userId}`, data);

const updateEmailApi = (userId, data) =>
  axios.patch(`/users/updateEmail/${userId}`, data);

const updateProfileImageApi = (userId, data) =>
  axios.patch(`/users/updateProfileImage/${userId}`, data);

const addPhoneNumberApi = (userId, data) =>
  axios.patch(`/users/addPhoneNumber/${userId}`, data);

const deletePhoneNumberApi = (userId, data) =>
  axios.patch(`/users/deletePhoneNumber/${userId}`, data);

const deactivateUserApi = (userId) =>
  axios.delete(`/users/deactivateUser/${userId}`);

export {
  getMeApi,
  updateUserInfoApi,
  updatePasswordApi,
  updateEmailApi,
  updateProfileImageApi,
  addPhoneNumberApi,
  deletePhoneNumberApi,
  deactivateUserApi,
};
