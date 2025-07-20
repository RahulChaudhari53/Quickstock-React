// layouts/LandingHeader.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppIcon from "../assets/quickstock-logo.svg";

export default function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const NavLinks = ({ isMobile = false }) => (
    <>
      <a
        href="/#benefits"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("benefits");
        }}
        className={
          isMobile
            ? "text-lg font-medium text-gray-500"
            : "text-base font-medium text-gray-500 hover:text-indigo-600"
        }
      >
        Benefits
      </a>
      <a
        href="/#features"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("features");
        }}
        className={
          isMobile
            ? "text-lg font-medium text-gray-500"
            : "text-base font-medium text-gray-500 hover:text-indigo-600"
        }
      >
        Features
      </a>
      <a
        href="/#cta"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("cta");
        }}
        className={
          isMobile
            ? "text-lg font-medium text-gray-500"
            : "text-base font-medium text-gray-500 hover:text-indigo-600"
        }
      >
        Get Started
      </a>
    </>
  );

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={AppIcon} alt="QuickStock logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-gray-800">QuickStock</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-base text-gray-900 border border-gray-700"
              >
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="icon"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out">
          <div className="container mx-auto flex flex-col items-start gap-4 p-4">
            <nav className="flex flex-col items-start gap-4">
              <NavLinks isMobile={true} />
            </nav>
            <div className="pt-4 border-t border-gray-200 w-full flex flex-col items-start gap-2">
              <Link to="/login" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base text-gray-800 hover:text-gray-900 border border-gray-700"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button className="bg-gray-800 hover:bg-gray-700 text-white w-full justify-start">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
