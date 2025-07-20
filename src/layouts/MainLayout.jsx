// layouts/MainLayout.jsx
import LandingHeader from "./LandingHeader";
import { Outlet } from "react-router-dom";
import LandingFooter from "./LandingFooter";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}

// /////

// import { useContext } from "react";
// import { Outlet } from "react-router-dom";
// import { AuthContext } from "../auth/AuthProvider";
// import PublicHeader from "./Header";
// import Footer from "./Footer";
// import DashboardLayout from "./DashboardLayout";

// export default function MainLayout() {
//   const { isAuthenticated } = useContext(AuthContext);

//   if (isAuthenticated) {
//     return <DashboardLayout />;
//   }

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-900">
//       <PublicHeader />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// ////
