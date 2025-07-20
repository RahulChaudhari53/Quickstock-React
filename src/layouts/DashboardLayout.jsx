import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageHeader from "../layouts/PageHeader";
import { SidebarProvider } from "../auth/SidebarContext";
import { PageProvider, usePage } from "../auth/PageContext";

const MainContent = () => {
  const { pageTitle } = usePage();

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <PageHeader title={pageTitle} />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <Outlet />
      </div>
    </main>
  );
};

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <PageProvider>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <MainContent />
        </div>
      </PageProvider>
    </SidebarProvider>
  );
}
