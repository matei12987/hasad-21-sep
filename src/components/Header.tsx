import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LogOut, User, Phone } from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg preserve-position">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">حصاد - HASAD</h1>
              <p className="text-xs text-blue-100">{t('manageContacts')}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <a
              href="#dashboard"
              className="text-white hover:text-blue-200 transition-colors font-medium"
            >
              {t('dashboard')}
            </a>
            <a
              href="#contacts"
              className="text-white hover:text-blue-200 transition-colors font-medium"
            >
              {t('contacts')}
            </a>
            <a
              href="#profile"
              className="text-white hover:text-blue-200 transition-colors font-medium"
            >
              {t('profile')}
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="header" />

            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-white">
                  <User size={18} />
                  <span className="text-sm">{user.email}</span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white text-sm font-medium"
                >
                  <LogOut size={16} />
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
