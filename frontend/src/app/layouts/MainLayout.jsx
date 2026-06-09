import { Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "../../shared/components/Navbar";
import Footer from "../../features/landing/sections/Footer";

import FloatingParticles from "../../shared/UI/FloatingParticles";
import ScrollToTop from "../../shared/UI/ScrollToTop";

const TrendingSideNav = lazy(() =>
  import("../../features/landing/components/TrendingSideNav")
);

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="relative bg-(--bg) text-(--text) overflow-x-hidden w-full">

      <ScrollToTop />

      <FloatingParticles />

      <Navbar />

      {location.pathname === "/" && (
        <Suspense fallback={null}>
          <TrendingSideNav />
        </Suspense>
      )}

      <div
        className={`${
          location.pathname === "/" ||
          location.pathname === "/about-us"
            ? ""
            : "pt-24 md:pt-32"
        } relative z-10`}
      >
        <Outlet />
      </div>

      {location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
    </div>
  );
}