// pages/LandingPage.jsx
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  Database,
  Users,
  ShoppingCart,
  Tablet as DeviceTablet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardIllustration from "../assets/dashboard-illustration.svg";

// Reusable component for feature items to keep the code DRY
const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// Reusable component for Benefit cards
const BenefitCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <main className="flex-1 bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
                The Smartest Way to Manage Your Inventory.
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Quickstock is a clean, simple, and powerful system designed for
                modern retail. Track stock, manage purchases, and make smarter
                decisions.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white"
                  >
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={DashboardIllustration}
                width={550}
                height={400}
                alt="QuickStock Dashboard"
                className="rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
              Why Choose QuickStock?
            </h2>
            <p className="text-gray-600 md:text-lg">
              Our solution offers everything you need to manage your inventory
              with speed and confidence.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-16">
            <BenefitCard
              icon={<Clock size={28} />}
              title="Real-Time Tracking"
              description="Get up-to-the-minute visibility into your stock levels, eliminating guesswork."
            />
            <BenefitCard
              icon={<ShoppingCart size={28} />}
              title="Streamlined Purchasing"
              description="Simplify purchase orders and manage suppliers efficiently to optimize replenishment."
            />
            <BenefitCard
              icon={<BarChart3 size={28} />}
              title="Actionable Insights"
              description="Make data-driven decisions with comprehensive reports on sales and inventory trends."
            />
            <BenefitCard
              icon={<DeviceTablet size={28} />}
              title="Accessible Anywhere"
              description="A user-friendly interface accessible from any device, designed for your entire team."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-gray-600 md:text-lg">
              Quickstock provides the essential tools to streamline your entire
              inventory lifecycle, from purchase to sale.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            <FeatureItem
              icon={<Clock size={20} />}
              title="Real-Time Stock Tracking"
              description="Instantly see stock levels across all locations."
            />
            <FeatureItem
              icon={<ShoppingCart size={20} />}
              title="Purchase Management"
              description="Create, track, and manage purchase orders with ease."
            />
            <FeatureItem
              icon={<BarChart3 size={20} />}
              title="Sales & Reporting"
              description="Record sales and generate insightful reports."
            />
            <FeatureItem
              icon={<Users size={20} />}
              title="Supplier Management"
              description="Keep a centralized database of your suppliers."
            />
            <FeatureItem
              icon={<Database size={20} />}
              title="Low Stock Alerts"
              description="Get automatic notifications for items running low."
            />
            <FeatureItem
              icon={<CheckCircle size={20} />}
              title="Simple Interface"
              description="An intuitive experience designed for your entire team."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl">
              Ready to Take Control of Your Stock?
            </h2>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gray-800 hover:bg-gray-700 text-white mt-4"
              >
                Start for Free Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
