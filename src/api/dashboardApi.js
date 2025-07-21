import axios from "./api";

export const getDashboardOverviewApi = (params) =>
  axios.get("/dashboard/overview", { params });
