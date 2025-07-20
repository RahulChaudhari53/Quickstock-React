import { Link } from "react-router-dom";
import { useSidebar } from "../auth/SidebarContext";
import { ArrowLeft, Bell, User, Menu } from "lucide-react";
import { Button } from "../components/ui/button";

export default function PageHeader({ title, children, className = "" }) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className={`flex items-center justify-between mb-4 p-4 border-b border-gray-200 bg-white sticky top-0 z-10 ${className}`}
    >
      {/* Left Section: Hamburger (Mobile), Back Button & Title (Desktop) */}
      <div className="flex items-center gap-4">
        {/* --- HAMBURGER BUTTON (MOBILE) --- */}
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="md:hidden" // Only visible on screens smaller than md
        >
          <Menu size={24} className="text-gray-600" />
        </Button>

        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Right Section: Children (Action Buttons) & Icons */}
      <div className="flex items-center gap-2">
        {children}

        {/* Hide these icons on mobile for a cleaner look, as they are in the sidebar */}
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell size={20} className="text-gray-600" />
          </Button>
          <Link to="/user/profile">
            <Button variant="ghost" size="icon">
              <User size={20} className="text-gray-600" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
