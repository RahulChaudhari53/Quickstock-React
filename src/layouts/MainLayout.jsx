import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

/**
 * MainLayout component provides a consistent layout structure for common pages.
 * It includes a Header, an Outlet for rendering child route components, and a Footer.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
