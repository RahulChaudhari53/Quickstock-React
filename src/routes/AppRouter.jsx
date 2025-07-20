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
import LandingPage from "../pages/LandingPage";
import Homepage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUserPage from "../pages/admin/AdminUserPage";

// Shop Owner (Normal User) Pages
import UserProfilePage from "../pages/UserProfilePage";
import CategoriesPage from "../pages/CategoriesPage";
import SuppliersPage from "../pages/SuppliersPage";
import SupplierDetailPage from "../pages/SupplierDetailPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import PurchasesPage from "../pages/PurchasesPage";
import CreatePurchasePage from "../pages/CreatePurchasePage";
import EditPurchasePage from "../pages/EditPurchasePage";
import PurchaseDetailPage from "../pages/PurchaseDetailPage";
import SalesPage from "../pages/SalesPage";
import SaleDetailPage from "../pages/SaleDetailPage";
import PointOfSalePage from "../pages/PointOfSalePage";
import StockPage from "../pages/StockPage";
import StockHistoryPage from "../pages/StockHistoryPage";

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
