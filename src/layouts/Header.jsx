// src/layouts/Header.jsx
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="w-full bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-400">
          My QuickStock App
        </div>
        <nav className="space-x-6 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-300 font-semibold"
                : "hover:text-indigo-200 transition-colors"
            }
          >
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-300 font-semibold"
                    : "hover:text-indigo-200 transition-colors"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-300 font-semibold"
                    : "hover:text-indigo-200 transition-colors"
                }
              >
                Register
              </NavLink>
            </>
          )}

          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome,{" "}
                <span className="font-semibold text-indigo-200">
                  {user.firstName}
                </span>
              </span>
              <Link
                onClick={logout}
                className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Logout
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
