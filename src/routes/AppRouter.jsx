import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Layout and Authentication
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../auth/AuthProvider";
import GuestRoute from "./GuestRoute";
import NormalUserRoute from "./NormalUserRoute";
import AdminRoute from "./admin/AdminRoute";

// Public and General Pages
import LandingPage from "../pages/auth/LandingPage";
import Login from "../pages/auth/LoginPage";
import Register from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUserPage from "../pages/admin/AdminUserPage";

// Shop Owner (Normal User) Pages
import Homepage from "../pages/dashboard/HomePage";
import UserProfilePage from "../pages/user/UserProfilePage";
import CategoriesPage from "../pages/category/CategoriesPage";
import SuppliersPage from "../pages/supplier/SuppliersPage";
import SupplierDetailPage from "../pages/supplier/SupplierDetailPage";
import ProductsPage from "../pages/product/ProductsPage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import PurchasesPage from "../pages/purchase/PurchasesPage";
import CreatePurchasePage from "../pages/purchase/CreatePurchasePage";
import EditPurchasePage from "../pages/purchase/EditPurchasePage";
import PurchaseDetailPage from "../pages/purchase/PurchaseDetailPage";
import SalesPage from "../pages/sale/SalesPage";
import SaleDetailPage from "../pages/sale/SaleDetailPage";
import PointOfSalePage from "../pages/sale/PointOfSalePage";
import StockPage from "../pages/stock/StockPage";
import StockHistoryPage from "../pages/stock/StockHistoryPage";

export default function AppRouter() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        Loading application...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes (Handled by MainLayout's public view) --- */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        {/* --- Shop Owner (Normal User) Protected Routes --- */}
        <Route element={<NormalUserRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Homepage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
            <Route path="/user/categories" element={<CategoriesPage />} />
            <Route path="/user/suppliers" element={<SuppliersPage />} />
            <Route
              path="/user/suppliers/:id"
              element={<SupplierDetailPage />}
            />
            <Route path="/user/products" element={<ProductsPage />} />
            <Route path="/user/products/:id" element={<ProductDetailPage />} />
            <Route path="/user/purchases" element={<PurchasesPage />} />
            <Route
              path="/user/purchases/create"
              element={<CreatePurchasePage />}
            />
            <Route
              path="/user/purchases/edit/:id"
              element={<EditPurchasePage />}
            />
            <Route
              path="/user/purchases/:id"
              element={<PurchaseDetailPage />}
            />
            <Route path="/user/sales" element={<SalesPage />} />
            <Route path="/user/sales/:id" element={<SaleDetailPage />} />
            <Route path="/user/pos" element={<PointOfSalePage />} />
            <Route path="/user/stock" element={<StockPage />} />
            <Route
              path="/user/stock/history/:productId"
              element={<StockHistoryPage />}
            />
          </Route>
        </Route>

        {/* --- Admin Protected Routes (Separate Layout) --- */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/users/:id" element={<AdminUserPage />} />
          <Route
            path="/admin"
            element={<Navigate to="/admin/users" replace />}
          />
        </Route>

        {/* --- Global 404 Fallback --- */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-3xl font-bold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
