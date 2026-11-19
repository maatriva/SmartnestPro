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
    <div className="min-h-dvh flex items-center justify-center px-4 py-12 relative overflow-hidden bg-(--bg-canvas)">
      <Helmet>
        <title>Login | Maatriva</title>
        <meta name="description" content="Access your Maatriva dashboard and check your smart baby cradle reports." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="w-full max-w-md clay-card-light p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-display text-(--text-primary)">
            Welcome Back
          </h2>

          <p className="text-(--text-secondary) mt-1 text-sm">
            Access your dashboard and baby health reports.
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
          <div className="w-full h-px bg-(--text-primary)/10" />

          <span className="absolute bg-(--surface) px-4 text-xs text-(--text-secondary) uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        <div className="mt-4">
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onError={() =>
              setError("Google Login Failed")
            }
          />
        </div>

        <div className="mt-8 text-center text-sm text-(--text-secondary)">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-(--brand-accent) font-semibold hover:underline"
            >
              Create One
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}