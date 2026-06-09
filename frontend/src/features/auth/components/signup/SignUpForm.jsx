import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function SignupForm({
  formData,
  loading,
  showPassword,

  handleChange,
  handleSubmit,
  setShowPassword,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name
        </label>

        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 py-3 clay-input"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Email Address
        </label>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 py-3 clay-input"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 clay-input"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff />
            ) : (
              <Eye />
            )}
          </button>
        </div>
      </div>

      {/* Terms */}
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="isProfessional"
          checked={
            formData.isProfessional
          }
          onChange={handleChange}
        />

        <label className="text-sm">
          I agree to the{" "}
          <Link
            to="/terms"
            className="text-(--primary)"
          >
            Terms & Conditions
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full clay-btn clay-btn-primary py-3 flex items-center justify-center gap-2"
      >
        {loading
          ? "Creating Account..."
          : "Sign Up"}

        <ArrowRight className="w-5 h-5 text-white" />
      </button>
    </form>
  );
}