// layouts/MainLayout.jsx
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
