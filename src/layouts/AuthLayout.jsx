import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <main className="flex items-center justify-center min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
