import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import GuestRoute from "./GuestRoute";
import NormalUserRoute from "./NormalUserRoute";
import AdminRoute from "./admin/AdminRoute";
import LandingPage from "../pages/LandingPage";
import { AuthContext } from "../auth/AuthProvider";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AppRouter() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        Loading application...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              user ? <Navigate to="/dashboard" replace /> : <LandingPage />
            }
          />

          <Route path="/dashboard" element={<Homepage />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/user/*" element={<NormalUserRoute />}>
            <Route
              path="product"
              element={
                <div className="text-white text-2xl p-8 bg-gray-800 rounded-lg shadow-md">
                  My Product Page (Protected)
                </div>
              }
            />
            <Route
              path="order"
              element={
                <div className="text-white text-2xl p-8 bg-gray-800 rounded-lg shadow-md">
                  My Order Page (Protected)
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div className="text-white text-2xl p-8 bg-gray-800 rounded-lg shadow-md">
                  404 Not Found (User Area)
                </div>
              }
            />
          </Route>
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<AdminDashboard />} />
            <Route
              path="*"
              element={
                <div className="text-white text-2xl p-8 bg-gray-800 rounded-lg shadow-md">
                  404 Not Found (Admin Area)
                </div>
              }
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="text-white text-3xl font-bold text-center mt-20">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
