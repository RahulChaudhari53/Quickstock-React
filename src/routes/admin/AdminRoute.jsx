import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";

export default function AdminRoute() {
  const { loading, isAuthenticated, isAdmin } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-white text-xl flex justify-center items-center h-screen">
        Loading admin access...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
