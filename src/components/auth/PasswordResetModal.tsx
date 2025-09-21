import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { X, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface PasswordResetModalProps {
  onClose: () => void;
  defaultEmail?: string;
}

export const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  onClose,
  defaultEmail = '',
}) => {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{t('forgotPassword')}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Please check your
                email and follow the instructions to reset your password.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full ps-10 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
