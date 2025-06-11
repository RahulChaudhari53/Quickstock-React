import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/authProvider";

export default function NormalUserRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-white text-xl">Loading authentication status...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "normal") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
