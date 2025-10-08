import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLanguageSwitcher } from './AdminLanguageSwitcher';
import { Shield, Eye, Bell, User } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 preserve-position">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">{t('hasadAdminPanel')}</h1>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded-full">
            <Eye className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">{t('readOnly')}</span>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -end-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>

          {/* Language Switcher */}
          <AdminLanguageSwitcher />

          {/* Admin Profile */}
          <div className="flex items-center gap-3 ps-4 border-s border-gray-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-900">{t('adminUser')}</div>
              <div className="text-xs text-gray-500">{t('systemAdministrator')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Read-Only Notice */}
      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-600" />
          <p className="text-sm text-amber-800">{t('adminReadOnlyNotice')}</p>
        </div>
      </div>
    </header>
  );
};
