import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Layout and Authentication
import MainLayout from "../layouts/MainLayout";
import { AuthContext } from "../auth/AuthProvider";
import GuestRoute from "./GuestRoute";
import NormalUserRoute from "./NormalUserRoute";
import AdminRoute from "./admin/AdminRoute";

// Public and General Pages
import LandingPage from "../pages/LandingPage";
import Homepage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUserPage from "../pages/admin/AdminUserPage";

// Shop Owner Pages
import UserProfilePage from "../pages/UserProfilePage";

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
          {/* --- Public Routes --- */}
          <Route
            index
            element={
              user ? <Navigate to="/dashboard" replace /> : <LandingPage />
            }
          />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* --- General Authenticated Route --- */}
          <Route path="/dashboard" element={<Homepage />} />

          {/* --- Shop Owner (Normal User) Protected Routes --- */}
          <Route path="/user/*" element={<NormalUserRoute />}>
            <Route path="profile" element={<UserProfilePage />} />

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

          {/* --- Admin Protected Routes --- */}
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<AdminDashboard />} />
            <Route path="users/:id" element={<AdminUserPage />} />
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

        {/* --- Global 404 Fallback --- */}
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
