// layouts/LandingFooter.js
import { Link } from "react-router-dom";
import AppIcon from "../assets/quickstock-logo.svg";

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 flex-shrink-0">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src={AppIcon} alt="QuickStock logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-gray-800">
                QuickStock
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} QuickStock Inc. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              to="#"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
