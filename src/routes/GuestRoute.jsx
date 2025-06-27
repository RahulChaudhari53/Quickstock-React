// routes/GuestRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

/**
 * GuestRoute component acts as a route guard.
 * It allows access to its child routes ONLY if the user is NOT authenticated.
 * If the user is authenticated, it redirects them based on their role or to the homepage.
 */
export default function GuestRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-white text-xl">Loading authentication status...</div>
    );
  }

  if (user?.role === "normal") {
    return <Navigate to="/user/product" replace />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

