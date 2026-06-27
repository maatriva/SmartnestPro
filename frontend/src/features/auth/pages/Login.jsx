import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import useLogin from "../hooks/useLogin";

import LoginForm from "../components/login/LoginForm";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AuthError from "../components/AuthError";

export default function Login() {
  const {
    formData,
    loading,
    error,
    showPassword,

    setShowPassword,

    handleChange,
    handleSubmit,
    handleGoogleSuccess,
    setError,
  } = useLogin();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <Helmet>
        <title>Login | Maatriva</title>
        <meta name="description" content="Access your Maatriva dashboard and check your smart baby cradle reports." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="w-full max-w-md clay-card p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            Welcome Back
          </h2>

          <p className="text-(--text-light)">
            Access your dashboard and reports.
          </p>
        </div>

        <AuthError error={error} />

        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <div className="mt-6 relative flex items-center justify-center">
          <div className="w-full h-px bg-gray-200" />

          <span className="absolute bg-white px-4 text-xs text-gray-400 uppercase">
            Or Continue With
          </span>
        </div>

        <GoogleLoginButton
          onSuccess={handleGoogleSuccess}
          onError={() =>
            setError("Google Login Failed")
          }
        />

        <div className="mt-8 text-center">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create One
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}