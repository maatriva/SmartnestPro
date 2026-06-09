import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import AuthLoader from "../components/AuthLoader";

export default function AdminRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <AuthLoader />;
  }

  if (!user?.is_admin) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}