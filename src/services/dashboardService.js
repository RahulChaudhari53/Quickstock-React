import { getDashboardOverviewApi } from "../api/dashboardApi";

export const getDashboardOverviewService = async (params) => {
  try {
    const response = await getDashboardOverviewApi(params);
    return response.data;
  } catch (err) {
    throw (
      err.response?.data || { message: "Failed to fetch dashboard overview." }
    );
  }
};
