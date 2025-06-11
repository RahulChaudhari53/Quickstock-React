// src/routes/AppRouter.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import GuestRoute from "./GuestRoute";
import NormalUserRoute from "./NormalUserRoute";

/**
 * AppRouter component defines all the different routes (pages) in your application
 * and maps them to the corresponding React components.
 * It uses React Router for declarative navigation.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
        <Route path="/user/*" element={<NormalUserRoute />}>
          <Route
            path="product"
            element={
              <div className="text-white text-2xl">
                My Product Page (Protected)
              </div>
            }
          />
          <Route
            path="order"
            element={
              <div className="text-white text-2xl">
                My Order Page (Protected)
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="text-white text-2xl">
                404 Not Found (User Area)
              </div>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div className="text-white text-3xl font-bold">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
