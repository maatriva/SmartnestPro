import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";


import { Hero } from "./components/Hero";
import Navbar from "./components/Navbar";
import FloatingParticles from "./components/FloatingParticles";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// ✅ Lazy loaded components (FIXED)
const Features = lazy(() =>
  import("./components/Features").then((m) => ({ default: m.Features }))
);

const HowItWorks = lazy(() =>
  import("./components/HowItWorks").then((m) => ({
    default: m.HowItWorks,
  }))
);

const Pricing = lazy(() =>
  import("./components/Pricing").then((m) => ({ default: m.Pricing }))
);

const Footer = lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer }))
);

const Diseases = lazy(() => import("./components/Diseases"));
const DetailedDiseases = lazy(() => import("./components/DetailedDiseases"));
const TrendingSideNav = lazy(() => import("./components/TrendingSideNav"));

const Survey = lazy(() => import("./components/pages/Survey"));
const AboutUs = lazy(() => import("./components/pages/AboutUs"));
const AdminDashboard = lazy(() => import("./components/pages/AdminDashboard"));
const Login = lazy(() => import("./components/pages/Auth/Login"));
const Signup = lazy(() => import("./components/pages/Auth/Signup"));

const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-secondary)] z-50">
    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Home() {
  return (
    <div className="relative bg-[var(--bg-secondary)] text-[var(--text)] fade-in">
      <Hero />
      <Suspense fallback={<div className="h-96" />}>
        <Diseases />
        <Features />
        <HowItWorks />
        <Pricing />
      </Suspense>
    </div>
  );
}

// ✅ MAIN APP
export default function App() {
  const location = useLocation();

  return (
    <div className="relative bg-[var(--bg-secondary)] text-[var(--text)]">
      <Toaster position="top-center" richColors />

      <FloatingParticles />
      <Navbar />

      {/* Side Nav only on home */}
      {location.pathname === "/" && (
        <Suspense fallback={null}>
          <TrendingSideNav />
        </Suspense>
      )}

      <div
        className={`${
          location.pathname === "/" ? "" : "pt-24 md:pt-32"
        } relative z-10`}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/survey"
              element={
                <ProtectedRoute>
                  <Survey />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about-us"
              element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/diseases"
              element={<DetailedDiseases />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </Suspense>
        
        {/* Global Footer */}
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
      </div>
    </div>
  );
}