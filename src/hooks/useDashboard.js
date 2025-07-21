import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getDashboardOverviewService } from "../services/dashboardService";

export const useDashboardOverview = (filters) => {
  return useQuery({
    queryKey: ["dashboardOverview", filters],
    queryFn: ({ queryKey }) => getDashboardOverviewService(queryKey[1]),
    onError: (err) => {
      toast.error(err.message || "Failed to load dashboard data.");
    },
  });
};
