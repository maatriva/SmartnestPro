import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import useSignup from "../hooks/useSignup";

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="w-full max-w-md clay-card p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="text-(--text-light)">
            Join Maatriva and start monitoring.
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
          <div className="w-full h-px bg-gray-200" />

          <span className="absolute bg-white px-4 text-xs text-gray-400 uppercase">
            Or Continue With
          </span>
        </div>

        <GoogleLoginButton
          onSuccess={handleGoogleSuccess}
          onError={() =>
            setError(
              "Google Signup Failed"
            )
          }
        />

        <div className="mt-8 text-center">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}