import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useContacts } from '../hooks/useContacts';
import { useSettings } from '../contexts/SettingsContext';
import { Users, UserPlus, Building, Building2, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { contacts } = useContacts();
  const { formatCurrency } = useSettings();

  const stats = [
    {
      name: t('contacts'),
      value: contacts.length,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      name: t('consumer'),
      value: contacts.filter(c => c.contact_type === 'consumer').length,
      icon: UserPlus,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      name: t('institutional'),
      value: contacts.filter(c => c.contact_type === 'institutional').length,
      icon: Building,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      name: t('corporate'),
      value: contacts.filter(c => c.contact_type === 'corporate').length,
      icon: Building2,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  const recentContacts = contacts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('welcomeBack')}</h1>
            <p className="text-blue-100 text-lg">{user?.email}</p>
            <p className="text-blue-200 mt-2">{t('manageContacts')}</p>
          </div>
          <div className="hidden sm:block">
            <TrendingUp className="w-16 h-16 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.name} className={`${stat.bgColor} rounded-xl p-6 border border-gray-100`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stat.textColor} opacity-80`}>{stat.name}</p>
                <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Contacts</h2>
          <p className="text-gray-600 mt-1">Your latest additions</p>
        </div>

        {recentContacts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {recentContacts.map(contact => (
              <div key={contact.contact_id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {contact.contact_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.contact_name}</h3>
                      <p className="text-gray-600 text-sm">{contact.contact_email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contact.contact_type === 'consumer'
                          ? 'bg-blue-100 text-blue-800'
                          : contact.contact_type === 'institutional'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {t(contact.contact_type)}
                    </span>
                    {contact.contact_mobile && (
                      <p className="text-gray-500 text-sm mt-1">{contact.contact_mobile}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>{t('noContacts')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
