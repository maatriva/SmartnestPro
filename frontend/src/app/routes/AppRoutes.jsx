import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import AdminRoute from "../../features/auth/routes/AdminRoute";

const Home = lazy(() =>
  import("../../features/landing/pages/Home")
);

const Survey = lazy(() =>
  import("../../features/survey/pages/Survey")
);

const AboutUs = lazy(() =>
  import("../../features/about/pages/AboutUs")
);

const DetailedDiseases = lazy(() =>
  import("../../features/diseases/pages/DeatailedDiseases")
);

const Login = lazy(() =>
  import("../../features/auth/pages/Login")
);

const Signup = lazy(() =>
  import("../../features/auth/pages/Signup")
);

const Terms = lazy(() =>
  import("../../features/about/pages/Terms")
);

const AdminDashboard = lazy(() =>
  import("../../features/admin/pages/AdminDashboard")
);

const NotFound = lazy(() =>
  import("../../shared/UI/NotFound")
);

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-(--bg) z-50">
      <div className="w-12 h-12 border-4 border-(--primary) border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/survey"
            element={<Survey />}
          />

          <Route
            path="/about-us"
            element={<AboutUs />}
          />

          <Route
            path="/diseases"
            element={<DetailedDiseases />}
          />

          <Route
            path="/terms"
            element={<Terms />}
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </Suspense>
  );
}