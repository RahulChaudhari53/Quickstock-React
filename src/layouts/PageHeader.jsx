import { useSidebar } from "../auth/SidebarContext";
import { Bell, Menu } from "lucide-react";
import { Button } from "../components/ui/button";

export default function PageHeader({ title, className = "" }) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className={`relative flex items-center justify-between mb-4 p-4 border-b border-gray-200 bg-white sticky top-0 z-10 ${className}`}
    >
      {/* --- Left Section: Hamburger (Mobile Only) --- */}
      <div className="flex-shrink-0 md:hidden">
        <Button onClick={toggleSidebar} variant="ghost" size="icon">
          <Menu size={24} className="text-gray-600" />
        </Button>
      </div>

      {/* --- Center Section: Title --- */}
      <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:transform-none">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">
          {title}
        </h1>
      </div>

      {/* --- Right Section: Children (Action Buttons) & Icons --- */}
      {/* <div className="flex items-center gap-2">
        <div className="flex items-center border border-yellow-400 rounded-lg shadow-md">
          <Button variant="ghost" size="icon">
            <Bell size={20} className="text-gray-600" />
          </Button>
        </div>
      </div> */}
    </div>
  );
}
