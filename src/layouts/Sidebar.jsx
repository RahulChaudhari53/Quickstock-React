import { NavLink } from "react-router-dom";
import {
  BarChart3,
  LayoutGrid,
  Package,
  ShoppingCart,
  Tag,
  Users,
} from "lucide-react";

const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    end // Use 'end' to prevent parent routes from staying active
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-emerald-800 text-white font-semibold"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`
    }
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 flex flex-col">
      <nav className="flex flex-col gap-2">
        <NavItem to="/dashboard" icon={<LayoutGrid size={20} />}>
          Dashboard
        </NavItem>
        <NavItem to="/user/categories" icon={<Tag size={20} />}>
          Categories
        </NavItem>
        <NavItem to="/user/suppliers" icon={<Users size={20} />}>
          Suppliers
        </NavItem>
        <NavItem to="/user/products" icon={<Package size={20} />}>
          Products
        </NavItem>
        <NavItem to="/user/purchases" icon={<ShoppingCart size={20} />}>
          Purchases
        </NavItem>
        <NavItem to="/user/stock" icon={<BarChart3 size={20} />}>
          Stock
        </NavItem>
      </nav>
    </aside>
  );
}
