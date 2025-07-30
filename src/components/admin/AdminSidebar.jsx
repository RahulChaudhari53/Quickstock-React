import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import {
  Users,
  Settings,
  Package,
  BarChart3,
  LogOut,
  User,
} from "lucide-react";
const NavItem = ({ to, icon, children }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

export default function AdminSidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col p-4">
      <div className="flex items-center gap-3 px-3 py-2 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-white">
          <BarChart3 size={24} />
        </div>
        <span className="text-xl font-bold text-white">Admin Portal</span>
      </div>

      <nav className="flex flex-col gap-1">
        <NavItem to="/admin/users" icon={<Users size={20} />}>
          User Management
        </NavItem>
      </nav>

      <div className="mt-auto border-t border-gray-700 pt-4 space-y-1">
        <Link
          to="/admin/profile"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <User size={20} />
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
