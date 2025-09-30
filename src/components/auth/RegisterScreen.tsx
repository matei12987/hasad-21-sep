import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'consumer' as 'farmer' | 'consumer',
    location: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        type: formData.type,
        location: formData.location,
        phone: formData.phone,
        password: formData.password,
      });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(135deg, #4a7c59 0%, #6b9b7a 100%)' }}
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="text-5xl lg:text-6xl">🌱</div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3">HASAD</h1>
          <p className="text-xl lg:text-2xl text-green-100">Join the Agricultural Revolution</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl">
          <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-900">Create Account</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* User Type Selection */}
            <div className="mb-6 lg:mb-8">
              <label className="block text-base lg:text-lg font-medium text-gray-700 mb-3">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'consumer' })}
                  className={`p-6 lg:p-8 rounded-xl border-3 transition-all transform hover:scale-105 ${
                    formData.type === 'consumer'
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl lg:text-5xl mb-3">🛒</div>
                  <div className="text-lg lg:text-xl font-medium">Consumer</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'farmer' })}
                  className={`p-6 lg:p-8 rounded-xl border-3 transition-all transform hover:scale-105 ${
                    formData.type === 'farmer'
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl lg:text-5xl mb-3">👨‍🌾</div>
                  <div className="text-lg lg:text-xl font-medium">Farmer</div>
                </button>
              </div>
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="block text-base lg:text-lg font-medium text-gray-700 mb-3">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-4 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="block text-base lg:text-lg font-medium text-gray-700 mb-3">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-4 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="block text-base lg:text-lg font-medium text-gray-700 mb-3">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-4 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="block text-base lg:text-lg font-medium text-gray-700 mb-3">
                {formData.type === 'farmer' ? 'Farm Location' : 'Location'}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-4 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder={
                  formData.type === 'farmer' ? 'Enter your farm location' : 'Enter your location'
                }
                required
              />
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="block text-base lg:text-lg font-medium text-gray-700 mb-3">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-4 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="block text-base lg:text-lg font-medium text-gray-700 mb-3">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-4 lg:py-5 text-base lg:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-4 lg:py-5 rounded-lg text-base lg:text-lg font-semibold hover:bg-green-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl mb-6">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base lg:text-lg text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="text-green-600 font-semibold hover:text-green-700 transition-colors hover:underline">
                Sign In
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
