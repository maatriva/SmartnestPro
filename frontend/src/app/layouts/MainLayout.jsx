import { Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "../../shared/components/Navbar";
import Footer from "../../features/landing/sections/Footer";

import FloatingParticles from "../../shared/UI/FloatingParticles";
import ScrollToTop from "../../shared/UI/ScrollToTop";
import CelestialStarTrail from "../../animations/CelestialStarTrail";

const TrendingSideNav = lazy(() =>
  import("../../features/landing/components/TrendingSideNav")
);

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="relative bg-(--bg) text-(--text) overflow-x-hidden w-full">
      <ScrollToTop />

      {/* Glowing Star Trail Cursor for desktop */}
      <CelestialStarTrail />

      {/* Floating Ambient Celestial Spheres */}
      <FloatingParticles />

      {/* Sticky Floating Pill Navbar */}
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
