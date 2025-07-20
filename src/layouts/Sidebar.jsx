import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useSidebar } from "../auth/SidebarContext"; 
import {
  LayoutDashboard,
  Boxes,
  Truck,
  Package,
  ShoppingCart,
  BarChart3,
  LogOut,
  User,
  CreditCard,
} from "lucide-react";

const NavItem = ({ to, icon, children }) => {
  const { closeSidebar } = useSidebar();
  return (
    <NavLink
      to={to}
      end
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-gray-200 text-gray-900"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* --- BACKDROP OVERLAY --- */}
      {/* Appears on mobile when the sidebar is open, and closes it on click */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-40 transition-opacity md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* --- THE SIDEBAR --- */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-grow p-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-white">
              <Package size={24} />
            </div>
            <span className="text-xl font-bold text-gray-800">QuickStock</span>
          </div>

          <nav className="flex flex-col gap-1">
            <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />}>
              Dashboard
            </NavItem>
            <NavItem to="/user/categories" icon={<Boxes size={20} />}>
              Categories
            </NavItem>
            <NavItem to="/user/suppliers" icon={<Truck size={20} />}>
              Suppliers
            </NavItem>
            <NavItem to="/user/products" icon={<Package size={20} />}>
              Products
            </NavItem>
            <NavItem to="/user/purchases" icon={<ShoppingCart size={20} />}>
              Purchases
            </NavItem>
            <NavItem to="/user/Sales" icon={<CreditCard size={20} />}>
              Sales
            </NavItem>
            <NavItem to="/user/stock" icon={<BarChart3 size={20} />}>
              Stock
            </NavItem>
          </nav>

          <div className="mt-auto"></div>

          <div className="border-t border-gray-200 pt-4 space-y-1">
            <Link
              to="/user/profile"
              onClick={closeSidebar}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <User size={20} />
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
