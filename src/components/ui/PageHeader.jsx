import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Bell, User } from "lucide-react";
import { Button } from "./Button";

export default function PageHeader({ title, children, className = "" }) {
  const navigate = useNavigate();

  return (
    <div
      className={`px-6 py-4 bg-white shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}
    >
      {/* Left: Back Button & Title */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          size="icon"
          className="bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-300"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Right: Actions + Icons */}
      <div className="flex items-center gap-3">
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-lg"
        >
          <Bell size={20} className="text-gray-700" />
        </Button>
        {/* <Link to="/user/profile">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-lg"
          >
            <User size={20} className="text-gray-700" />
          </Button>
        </Link> */}
      </div>
    </div>
  );
}
