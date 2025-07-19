// layouts/Header.jsx
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import {
  Store,
  User as UserIcon,
  LayoutGrid,
  Tag,
  Users,
  Package,
  ShoppingCart,
  ShoppingBag,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold text-white">QuickStock</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="#benefits"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("benefits");
                }}
                className="text-sm font-medium hover:text-emerald-500 transition-colors"
              >
                Benefits
              </Link>
              <Link
                to="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("features");
                }}
                className="text-sm font-medium hover:text-emerald-500 transition-colors"
              >
                Features
              </Link>
              <Link
                to="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("cta");
                }}
                className="text-sm font-medium hover:text-emerald-500 transition-colors"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-300 font-semibold"
                    : "hover:text-indigo-200 transition-colors"
                }
              >
                Dashboard
              </NavLink>

              {!isAdmin && (
                <>
                  <NavLink
                    to="/user/categories"
                    className={({ isActive }) =>
                      `flex items-center gap-1 ${
                        isActive
                          ? "text-emerald-400 font-semibold"
                          : "hover:text-emerald-300 transition-colors"
                      }`
                    }
                  >
                    <Tag size={16} />
                    Categories
                  </NavLink>

                  <NavLink
                    to="/user/suppliers"
                    className={({ isActive }) =>
                      `flex items-center gap-1 ${
                        isActive
                          ? "text-emerald-400 font-semibold"
                          : "hover:text-emerald-300"
                      }`
                    }
                  >
                    <Users size={16} />
                    Suppliers
                  </NavLink>

                  <NavLink
                    to="/user/products"
                    className={({ isActive }) =>
                      `flex items-center gap-1 ${
                        isActive
                          ? "text-emerald-400 font-semibold"
                          : "hover:text-emerald-300"
                      }`
                    }
                  >
                    <Package size={16} /> Products
                  </NavLink>

                  <NavLink
                    to="/user/purchases"
                    className={({ isActive }) =>
                      `flex items-center gap-1 ${
                        isActive
                          ? "text-emerald-400 font-semibold"
                          : "hover:text-emerald-300"
                      }`
                    }
                  >
                    <ShoppingCart size={16} /> Purchases
                  </NavLink>

                  <NavLink
                    to="/user/sales"
                    className={({ isActive }) =>
                      `flex items-center gap-1 ${
                        isActive
                          ? "text-emerald-400 font-semibold"
                          : "hover:text-emerald-300"
                      }`
                    }
                  >
                    <ShoppingBag size={16} /> Sales
                  </NavLink>

                  <NavLink
                    to="/user/stock"
                    className={({ isActive }) =>
                      `flex items-center gap-1 ${
                        isActive
                          ? "text-emerald-400 font-semibold"
                          : "hover:text-emerald-300"
                      }`
                    }
                  >
                    <BarChart3 size={16} /> Stock
                  </NavLink>
                </>
              )}

              {isAdmin && (
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-300 font-semibold"
                      : "hover:text-red-200 transition-colors"
                  }
                >
                  Admin
                </NavLink>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hidden md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600 rounded-md"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {/* <span className="text-gray-300">
                Welcome,{" "}
                <span className="font-semibold text-indigo-200">
                  {user.firstName}
                </span>
              </span> */}
              <Link
                to="/user/profile"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <UserIcon size={20} />
                {/* <span>
                  {user.firstName} {user.lastName}
                </span> */}
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
