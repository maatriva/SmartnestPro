import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { validateEmail } from '../../../utils/validation';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  // ✅ Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      // send ID token to backend
      await googleLogin(credentialResponse.credential);

      navigate('/');
    } catch (err) {
      setError('Google login failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow)] border border-white/20 relative z-10"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-dark)] mb-2">
            Welcome Back
          </h2>
          <p className="text-[var(--text-light)]">
            Access your dashboard and reports.
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-dark)]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--text-dark)]">
                Password
              </label>
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-gray-500 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors shadow-lg shadow-primary/25 disabled:opacity-70"
          >
            {loading ? 'Logging In...' : 'Log In'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 relative flex items-center justify-center">
          <div className="w-full h-px bg-gray-200" />
          <span className="absolute bg-white px-4 text-xs text-gray-400 uppercase">
            Or Continue With
          </span>
        </div>

        {/* ✅ Google Login */}
        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login Failed')}
          />
        </div>

        {/* Signup Link */}
        <div className="mt-8 text-center">
          <p className="text-[var(--text-light)]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Create One
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;

