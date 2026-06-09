import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function LoginForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  showPassword,
  setShowPassword,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
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
            className="w-full pl-10 pr-4 py-3 clay-input"
          />
        </div>
      </div>

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

      <button
        type="submit"
        disabled={loading}
        className="w-full clay-btn clay-btn-primary py-3 flex items-center justify-center gap-2"
      >
        {loading
          ? "Logging In..."
          : "Log In"}

        <ArrowRight className="w-5 h-5 text-white" />
      </button>
    </form>
  );
}