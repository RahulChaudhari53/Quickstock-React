// layouts/Footer.jsx
import { Link } from "react-router-dom";
import { Store } from "lucide-react"; // Make sure you have this icon or adjust accordingly

export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold">QuickStock</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link
            to="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contact Us
          </Link>
        </nav>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} QuickStock. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
