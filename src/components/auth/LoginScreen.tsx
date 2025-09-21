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
      className="min-h-screen flex flex-col justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #4a7c59 0%, #6b9b7a 100%)' }}
    >
      <div className="w-full max-w-sm mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center">
            <div className="text-3xl">🌱</div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">HASAD</h1>
          <p className="text-green-100">Smart Farming at Your Fingertips</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="heading-lg text-center mb-6">Welcome Back</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* User Type Selection */}
            <div className="form-group">
              <label className="form-label">I am a:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUserType('consumer')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    userType === 'consumer'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">🛒</div>
                  <div className="text-sm font-medium">Consumer</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('farmer')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    userType === 'farmer'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">👨‍🌾</div>
                  <div className="text-sm font-medium">Farmer</div>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full mb-4">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center">
            <p className="body-md">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 font-medium hover:text-green-700">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/10 rounded-lg p-4">
          <p className="text-white text-sm font-medium mb-2">Demo Credentials:</p>
          <p className="text-green-100 text-xs">Email: demo@hasad.com</p>
          <p className="text-green-100 text-xs">Password: demo123</p>
        </div>
      </div>
    </div>
  );
};
