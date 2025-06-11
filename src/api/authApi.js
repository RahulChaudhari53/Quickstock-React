import axios from "./api";

export const registerUserApi = (data) => axios.post("/users/signup", data);

export const loginUserApi = (data) => axios.post("/users/login", data);
