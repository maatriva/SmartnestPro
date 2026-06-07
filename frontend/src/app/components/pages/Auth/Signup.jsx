
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { validateEmail } from '../../../utils/validation';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', isProfessional: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  // ✅ Handle Google Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      // send ID token (credential) to backend
      await googleLogin(credentialResponse.credential, true);

      navigate('/');
    } catch (err) {
      setError('Google signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Normal input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Normal signup
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
      await signup(formData.name, formData.email, formData.password, formData.isProfessional);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md clay-card p-8 relative z-10"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-dark)] mb-2">
            Create Account
          </h2>
          <p className="text-[var(--text-light)]">
            Join Maatriva and start monitoring.
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
          
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-dark)]">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Full Name"
                className="w-full pl-10 pr-4 py-3 clay-input"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-3 clay-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-dark)]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className="w-full pl-10 pr-12 py-3 clay-input"
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

          {/* Professional Checkbox */}
          <div className="flex items-center gap-2.5 py-1">
            <input
              type="checkbox"
              id="isProfessional"
              name="isProfessional"
              checked={formData.isProfessional}
              onChange={(e) => setFormData({ ...formData, isProfessional: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] accent-[var(--primary)] cursor-pointer"
            />
            <label htmlFor="isProfessional" className="text-sm font-semibold text-[var(--text-dark)] cursor-pointer select-none">
              I agree to the{' '}
              <Link to="/terms" className="text-[var(--primary)] hover:underline" onClick={(e) => e.stopPropagation()}>
                Terms & Conditions
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full clay-btn clay-btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 relative flex items-center justify-center">
          <div className="w-full h-px bg-gray-200" />
          <span className="absolute bg-white px-4 text-xs text-gray-400 uppercase">
            Or Continue With
          </span>
        </div>

        {/* ✅ Google Login Button */}
        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Signup Failed')}
          />
        </div>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-[var(--text-light)]">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Signup;