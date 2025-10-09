import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'farmer' | 'consumer'>('consumer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password, userType);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-svh w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[linear-gradient(135deg,#4a7c59_0%,#6b9b7a_100%)]"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-6 lg:mb-12">
          <div className="w-16 h-16 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-6 bg-white rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="text-3xl lg:text-6xl">🌱</div>
          </div>
          <h1 className="text-3xl lg:text-6xl font-bold text-white mb-1 lg:mb-3">HASAD</h1>
          <p className="text-sm lg:text-2xl text-green-100">Smart Farming at Your Fingertips</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl mx-auto max-w-3xl">
          <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-5xl font-bold text-center mb-6 lg:mb-8 text-gray-900 break-words text-balance">Welcome Back</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* User Type Selection */}
            <div className="mb-5 lg:mb-8">
              <label className="block text-sm lg:text-lg font-medium text-gray-700 mb-2 lg:mb-3">Go to:</label>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('consumer')}
                  className={`p-4 lg:p-8 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    userType === 'consumer'
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl lg:text-5xl mb-2 lg:mb-3">🛒</div>
                  <div className="text-base lg:text-xl font-medium">HASAD Market</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('farmer')}
                  className={`p-4 lg:p-8 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    userType === 'farmer'
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl lg:text-5xl mb-2 lg:mb-3">👨‍🌾</div>
                  <div className="text-base lg:text-xl font-medium">Farmer</div>
                </button>
              </div>
            </div>

            <div className="mb-5 lg:mb-8">
              <label className="block text-sm lg:text-lg font-medium text-gray-700 mb-2 lg:mb-3">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-5 lg:mb-8">
              <label className="block text-sm lg:text-lg font-medium text-gray-700 mb-2 lg:mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 lg:py-5 rounded-lg text-base lg:text-lg font-semibold hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl mb-5 lg:mb-6">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm lg:text-lg text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 font-semibold hover:text-green-700 transition-colors hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 lg:mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20 mx-auto max-w-3xl">
          <p className="text-white text-sm lg:text-lg font-semibold mb-2 lg:mb-3">Demo Credentials:</p>
          <p className="text-green-100 text-xs lg:text-base">Email: demo@hasad.com</p>
          <p className="text-green-100 text-xs lg:text-base">Password: demo123</p>
        </div>
      </div>
    </div>
  );
};
