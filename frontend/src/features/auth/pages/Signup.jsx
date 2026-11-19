import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import useSignup from "../hooks/useSignUp";

import SignupForm from "../components/signup/SignUpForm";
import GoogleLoginButton from "../components/GoogleLoginButton";
import AuthError from "../components/AuthError";

export default function Signup() {
  const {
    formData,
    loading,
    error,
    showPassword,

    setShowPassword,
    setError,

    handleChange,
    handleSubmit,
    handleGoogleSuccess,
  } = useSignup();

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-12 relative overflow-hidden bg-(--bg-canvas)">
      <Helmet>
        <title>Sign Up | Maatriva</title>
        <meta name="description" content="Create a Maatriva account to start monitoring your baby's health." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="w-full max-w-md clay-card-light p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-display text-(--text-primary)">
            Create Account
          </h2>

          <p className="text-(--text-secondary) mt-1 text-sm">
            Join Maatriva to start monitoring your infant safely.
          </p>
        </div>

        <AuthError error={error} />

        <SignupForm
          formData={formData}
          loading={loading}
          showPassword={showPassword}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
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
              setError(
                "Google Signup Failed"
              )
            }
          />
        </div>

        <div className="mt-8 text-center text-sm text-(--text-secondary)">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-(--brand-accent) font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}