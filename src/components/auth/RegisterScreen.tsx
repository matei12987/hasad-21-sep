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
          <p className="text-green-100">Join the Agricultural Revolution</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="heading-lg text-center mb-6">Create Account</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* User Type Selection */}
            <div className="form-group">
              <label className="form-label">I am a:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'consumer' })}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    formData.type === 'consumer'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">🛒</div>
                  <div className="text-sm font-medium">Consumer</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'farmer' })}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    formData.type === 'farmer'
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
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {formData.type === 'farmer' ? 'Farm Location' : 'Location'}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder={
                  formData.type === 'farmer' ? 'Enter your farm location' : 'Enter your location'
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full mb-4">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <p className="body-md">
              Already have an account?{' '}
              <Link to="/" className="text-green-600 font-medium hover:text-green-700">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
