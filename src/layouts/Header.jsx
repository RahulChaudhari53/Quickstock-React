import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { Store, User as UserIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavLinks = ({ isMobile = false }) => {
    const linkClass = isMobile
      ? "text-sm font-medium text-gray-300 hover:text-emerald-400 block py-3"
      : "text-sm font-medium hover:text-emerald-500";
    const activeLinkClass = isMobile
      ? "text-emerald-400 font-semibold"
      : "text-emerald-400 font-semibold";
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
      <>
        {isAuthenticated && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? activeLinkClass : linkClass
              }
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>
            {!isAdmin && (
              <>
                <NavLink
                  to="/user/categories"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                  onClick={closeMenu}
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/user/suppliers"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                  onClick={closeMenu}
                >
                  Suppliers
                </NavLink>
                <NavLink
                  to="/user/products"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                  onClick={closeMenu}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/user/purchases"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                  onClick={closeMenu}
                >
                  Purchases
                </NavLink>
                <NavLink
                  to="/user/stock"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : linkClass
                  }
                  onClick={closeMenu}
                >
                  Stock
                </NavLink>
              </>
            )}
            {isAdmin && (
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? activeLinkClass : linkClass
                }
                onClick={closeMenu}
              >
                Admin
              </NavLink>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <header className="w-full bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between relative">
        <div className="md:hidden">
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="ghost"
            size="icon"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:transform-none">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Store className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold text-white">QuickStock</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <NavLinks />
        </nav>

        {/* --- THIS IS THE RESTORED SECTION --- */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="bg-gray-700">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/user/profile"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <UserIcon size={20} />
                <span>{user.firstName}</span>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
        {/* --- END OF RESTORED SECTION --- */}
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`md:hidden fixed top-24 left-0 w-full h-[calc(100vh-6rem)] bg-gray-900 bg-opacity-95 backdrop-blur-sm shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="container mx-auto flex flex-col justify-between h-full py-8">
          <nav className="flex flex-col items-center gap-4">
            <NavLinks isMobile={true} />
          </nav>
          <div className="pt-6 border-t border-gray-700 w-full max-w-xs mx-auto flex flex-col items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="bg-gray-700 w-full text-lg py-6"
                  >
                    Log in
                  </Button>
                </Link>
                <Link
                  to="/register"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="bg-emerald-600 hover:bg-emerald-700 w-full text-lg py-6">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="w-full max-w-xs flex flex-col items-center gap-4">
                <Link
                  to="/user/profile"
                  className="flex items-center gap-2 hover:text-emerald-400 transition text-lg mb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserIcon size={24} />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </Link>
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 w-full text-lg py-6"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
