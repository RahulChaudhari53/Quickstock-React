// src/layouts/AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-900">
      <AdminSidebar />

      <main className="flex-grow p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
