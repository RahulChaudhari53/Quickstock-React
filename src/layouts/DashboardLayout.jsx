import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageHeader from "../components/ui/PageHeader";
import { PageProvider, usePage } from "../auth/PageContext";

const LayoutWithHeader = () => {
  // inner component to access context provided by PageProvider
  const { pageTitle } = usePage(); // consume context to get current title

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title={pageTitle} />
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default function DashboardLayout() {
  return (
    <PageProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <LayoutWithHeader />
      </div>
    </PageProvider>
  );
}
