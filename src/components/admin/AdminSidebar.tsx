import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  Users,
  ShoppingCart,
  AlertTriangle,
  Settings,
  Shield,
  Eye,
  Sprout,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { t } = useTranslation();

  const navigationItems = [
    {
      id: 'dashboard',
      label: t('dashboard'),
      icon: BarChart3,
      active: true,
      badge: null,
    },
    {
      id: 'farmers',
      label: t('farmers'),
      icon: Sprout,
      active: false,
      badge: '247',
    },
    {
      id: 'consumers',
      label: t('consumers'),
      icon: Users,
      active: false,
      badge: '1,429',
    },
    {
      id: 'orders',
      label: t('orders'),
      icon: ShoppingCart,
      active: false,
      badge: '89',
    },
    {
      id: 'alerts',
      label: t('alerts'),
      icon: AlertTriangle,
      active: false,
      badge: '12',
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: Settings,
      active: false,
      badge: null,
    },
  ];

  return (
    <div className="w-64 bg-white border-e border-gray-200 flex flex-col preserve-position">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{t('hasadAdminPanel')}</h2>
            <p className="text-xs text-gray-500">{t('adminPortal')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-start transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Read-Only Notice */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Shield className="w-4 h-4 text-blue-600" />
          <div>
            <div className="text-xs font-medium text-blue-800">{t('readOnly')}</div>
            <div className="text-xs text-blue-600">{t('monitoringOnly')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
