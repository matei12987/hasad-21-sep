import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { changeLanguage as changeI18nLanguage } from '../../i18n';
import { Mail, Lock, Eye, EyeOff, Globe, ChevronDown } from 'lucide-react';

interface SignupFormProps {
  onToggleMode: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);

    // Only update document direction and language attribute
    changeI18nLanguage(langCode as 'ar' | 'en');
    setShowLanguageDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError(t('passwordsDoNotMatch') || 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password);

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage(
          'Account created successfully! Please check your email to verify your account.'
        );
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggleMode();
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="w-full max-w-md preserve-position">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Language Dropdown - Top Right */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              type="button"
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer preserve-position"
              aria-label={t('selectLanguage')}
              aria-expanded={showLanguageDropdown}
              aria-haspopup="true"
            >
              <Globe
                size={20}
                className="text-gray-600 group-hover:text-blue-600 transition-colors"
              />
              <ChevronDown
                size={16}
                className={`text-gray-600 group-hover:text-blue-600 transition-all duration-200 ${
                  showLanguageDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showLanguageDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowLanguageDropdown(false)}
                />

                {/* Dropdown Menu */}
                <div className="absolute top-full inset-inline-end-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[140px] preserve-position">
                  {languages.map(language => (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => handleLanguageSelect(language.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer first:rounded-t-lg last:rounded-b-lg ${
                        i18n.language === language.code
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700'
                      }`}
                      aria-label={`Switch to ${language.name}`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="font-medium">{language.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('createAccount')}</h2>
          <p className="text-gray-600">{t('manageContacts')}</p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-green-600 text-sm">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
            <div className="relative">
              <Mail className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full ps-10 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('password')}</label>
            <div className="relative">
              <Lock className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full ps-10 pe-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-inline-end-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('confirmPassword')}
            </label>
            <div className="relative">
              <Lock className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full ps-10 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md hover:shadow-lg"
            aria-label={loading ? t('loading') : t('signup')}
          >
            {loading ? t('loading') : t('signup')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('alreadyHaveAccount')}{' '}
            <a
              href="#login"
              onClick={handleLoginClick}
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-1 py-0.5 inline-block active:text-blue-800 no-underline"
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLoginClick(e as any);
                }
              }}
            >
              {t('login')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
