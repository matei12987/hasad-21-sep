import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { secureStorage } from '../../lib/secureStorage';
import { changeLanguage as changeI18nLanguage } from '../../i18n';
import { RememberMeInfo } from './RememberMeInfo';
import { PasswordResetModal } from './PasswordResetModal';
import { Mail, Lock, Eye, EyeOff, Globe, ChevronDown } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Load remember me preference and stored credentials on component mount
  useEffect(() => {
    try {
      // Load stored credentials if available
      const storedCredentials = secureStorage.getStoredCredentials();

      if (storedCredentials) {
        setEmail(storedCredentials.email);
        setRememberMe(storedCredentials.rememberMe);
        console.log('Loaded stored credentials for:', storedCredentials.email);
      } else {
        // Check for legacy remember me preference
        const savedRememberMe = localStorage.getItem('hasad-remember-me');
        if (savedRememberMe) {
          setRememberMe(savedRememberMe === 'true');
        }
      }
    } catch (error) {
      console.warn('Could not load stored credentials:', error);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    changeI18nLanguage(newLang);
  };

  const handleForgotPassword = () => {
    setShowPasswordReset(true);
  };

  const handleRememberMeToggle = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    try {
      localStorage.setItem('hasad-remember-me', newValue.toString());
    } catch (error) {
      console.warn('Could not save remember me preference:', error);
    }
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRememberMe(checked);

    // If unchecking, clear stored credentials immediately
    if (!checked) {
      secureStorage.clearCredentials();
      console.log('Remember me unchecked - credentials cleared');
    }
  };

  const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggleMode();
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (langCode: string) => {
    changeI18nLanguage(langCode as 'ar' | 'en');
    setShowLanguageDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message);
      } else {
        // Store credentials if remember me is checked and login successful
        if (rememberMe) {
          const stored = secureStorage.storeCredentials(email, true);
          if (stored) {
            console.log('Credentials stored for future logins');
          } else {
            console.warn('Failed to store credentials');
          }
        } else {
          // Ensure credentials are cleared if remember me is not checked
          secureStorage.clearCredentials();
        }

        setSuccessMessage('Login successful! Redirecting...');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('signInAccount')}</h2>
          <p className="text-gray-600">{t('welcomeBack')}</p>
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
                placeholder="admin@hasad.com"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 transition-all duration-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50 preserve-position"
                aria-describedby="remember-me-description"
              />
              <span
                id="remember-me-description"
                className="ms-2 text-sm text-gray-600 cursor-pointer select-none hover:text-gray-800 transition-colors font-medium preserve-position"
                onClick={handleRememberMeChange}
              >
                {t('rememberMe')}
              </span>
            </label>
            <a
              href="#forgot-password"
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1 font-medium active:text-blue-800 no-underline preserve-position"
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleForgotPassword();
                }
              }}
            >
              {t('forgotPassword')}
            </a>
          </div>

          {/* Security Notice for Remember Me */}
          {rememberMe && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <span className="font-medium">Security Notice:</span> Your email will be remembered
                for 30 days. Your password is never stored for security reasons.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md hover:shadow-lg"
            aria-label={loading ? t('loading') : t('login')}
          >
            {loading ? t('loading') : t('login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('dontHaveAccount')}{' '}
            <a
              href="#signup"
              onClick={handleSignUpClick}
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-1 py-0.5 inline-block active:text-blue-800 no-underline"
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSignUpClick(e as any);
                }
              }}
            >
              {t('signup')}
            </a>
          </p>
        </div>

        {/* Remember Me Information Panel */}
        <RememberMeInfo />

        {/* Password Reset Modal */}
        {showPasswordReset && (
          <PasswordResetModal onClose={() => setShowPasswordReset(false)} defaultEmail={email} />
        )}
      </div>
    </div>
  );
};
