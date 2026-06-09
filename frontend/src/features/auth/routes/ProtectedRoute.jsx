import { useEffect } from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { toast } from "sonner";

import useAuth from "../hooks/useAuth";
import AuthLoader from "../components/AuthLoader";

export default function ProtectedRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  const location =
    useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast.error(
        "Please login to access this page",
        {
          description:
            "Join the Maatriva community to continue.",
          duration: 4000,
        }
      );
    }
  }, [user, loading]);

  if (loading) {
    return <AuthLoader />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  return children;
}