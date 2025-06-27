// pages/LandingPage.jsx
import {
  ArrowRight,
  BarChart3,
  Clock,
  Database,
  Tablet as DeviceTablet,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    QuickStock: Modern Inventory Management for Kathmandu Retail
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Streamline your operations, reduce costs, and boost profits
                    with our intuitive web-based solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md">
                      Get Started for free{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src="https://placehold.co/550x550/aabbcc/ffffff?text=QuickStock%20Dashboard"
                  width={550}
                  height={550}
                  alt="QuickStock Dashboard"
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          id="benefits"
          className="py-12 md:py-24 bg-gray-800 text-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose QuickStock?
                </h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Designed specifically for retail businesses in Kathmandu, our
                  solution offers everything you need to manage your inventory
                  efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <Clock className="h-12 w-12 text-emerald-500 mb-2" />
                  <CardTitle>Real-Time Inventory Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get up-to-the-minute visibility into your stock levels,
                    eliminating guesswork and reducing stockouts.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <ShoppingCart className="h-12 w-12 text-emerald-500 mb-2" />
                  <CardTitle>Streamlined Purchasing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Simplify purchase order creation, manage suppliers
                    efficiently, and optimize your replenishment process.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <BarChart3 className="h-12 w-12 text-emerald-500 mb-2" />
                  <CardTitle>Actionable Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Make data-driven decisions with comprehensive reports on
                    sales, inventory value, and trends.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <DeviceTablet className="h-12 w-12 text-emerald-500 mb-2" />
                  <CardTitle>User-Friendly and Accessible</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Easy-to-use interface accessible from any device, designed
                    for retail staff of all technical levels.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-12 md:py-24 bg-gray-900 text-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What QuickStock Offers
                </h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive features designed to meet the unique needs of
                  Kathmandu retailers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900">
                  <Clock className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Real-Time Stock Tracking
                  </h3>
                  <p className="text-sm text-gray-400">
                    Monitor inventory levels across all your locations in
                    real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900">
                  <ShoppingCart className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Purchase Order Management
                  </h3>
                  <p className="text-sm text-gray-400">
                    Create, track, and manage purchase orders with ease.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900">
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Inventory Reporting</h3>
                  <p className="text-sm text-gray-400">
                    Generate detailed reports on inventory performance and
                    value.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900">
                  <Store className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Supplier Management</h3>
                  <p className="text-sm text-gray-400">
                    Maintain supplier information and track performance metrics.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900">
                  <Database className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
                  <p className="text-sm text-gray-400">
                    Receive notifications when inventory levels fall below
                    thresholds.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900">
                  <Users className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <p className="text-sm text-gray-400">
                    Control access levels for different staff members and roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-12 md:py-24 bg-emerald-700 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Simplify Your Inventory Management?
                </h2>
                <p className="max-w-[700px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join hundreds of retailers in Kathmandu who have transformed
                  their business with QuickStock.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/register">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md">
                    Get Started for free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
