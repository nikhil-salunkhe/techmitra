import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiShield, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ADMIN_EMAIL = 'techmitrofficial@gmail.com';
const ADMIN_PASSWORD = 'admin123';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login validation
    setTimeout(() => {
      if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('techmitra_admin', 'authenticated');
        navigate('/admin');
      } else if (email === 'admin' && password === 'admin123') {
        sessionStorage.setItem('techmitra_admin', 'authenticated');
        navigate('/admin');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-dark-900 to-primary-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
              <FiShield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-dark-900">Admin Login</h1>
            <p className="text-dark-500 text-sm mt-1">Enter your credentials to access the dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@techmitra.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-primary-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-dark-500">
              <p><span className="font-medium">Email:</span> techmitrofficial@gmail.com</p>
              <p><span className="font-medium">Password:</span> admin123</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium">
              <FiArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;