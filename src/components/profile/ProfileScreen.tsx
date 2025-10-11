import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileScreenProps {
  onNavigateToSettings: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigateToSettings }) => {
  const { t, i18n } = useTranslation();
  const { formatCurrency } = useSettings();
  const { user, logout, updateProfile } = useAuth();
  const isRTL = i18n.language === 'ar';
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
    });
    setIsEditing(false);
  };

  const menuItems = [
    {
      icon: '📊',
      title: t('analytics'),
      subtitle: t('viewYourPerformance'),
      show: user?.type === 'farmer',
    },
    { icon: '💳', title: t('paymentMethods'), subtitle: t('manageYourCards') },
    {
      icon: '📍',
      title: t('addresses'),
      subtitle: t('deliveryAddresses'),
      show: user?.type === 'consumer',
    },
    { icon: '🔔', title: t('notificationSettings'), subtitle: t('managePreferences') },
    { 
      icon: '❓', 
      title: t('helpAndSupport'), 
      subtitle: t('getAssistance'),
      action: () => setCurrentScreen('support')
    },
    {
      icon: '⚙️',
      title: t('appPreferences'),
      subtitle: t('appPreferences'),
      action: onNavigateToSettings,
    },
    { icon: '📋', title: t('termsAndPrivacy'), subtitle: t('legalInformation') },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="heading-lg mb-2">{t('profile')} 👤</h1>
        <p className="body-md text-gray-600">{t('appSlogan')}</p>
      </div>

      {/* Profile Card */}
      <div
        className="card mb-6"
        style={{ background: 'linear-gradient(135deg, #4a7c59 0%, #6b9b7a 100%)' }}
      >
        <div className="flex items-center gap-4 text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-3xl">{user?.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
            <p className="text-green-100 mb-1 bidi-isolate" dir="ltr">
              {user?.email}
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                {user?.type === 'farmer' ? `👨‍🌾 ${t('farmer')}` : `🛒 ${t('consumer')}`}
              </span>
              <span className="text-green-100 text-sm bidi-isolate" dir="ltr">
                ⭐ 4.8 {t('rating')}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            ✏️
          </button>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <div className="card mb-6">
          <h3 className="heading-md mb-4">{t('editProfile')}</h3>
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">{t('name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('mobile')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                {user?.type === 'farmer' ? t('farmLocation') : t('address')}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} className="btn btn-primary flex-1">
                {t('saveChanges')}
              </button>
              <button onClick={handleCancel} className="btn btn-outline flex-1">
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats (for farmers) */}
      {user?.type === 'farmer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBlockEnd: '1.5rem' }}>
          {/* Revenue Widget - Full Width */}
          <div
            className="bg-white rounded-xl shadow-sm"
            style={{
              padding: '1.5rem',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem'
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRTL ? 'flex-end' : 'center', justifyContent: 'center' }}>
              <p
                className="text-gray-600"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  lineHeight: isRTL ? '1.6' : '1.5',
                  letterSpacing: isRTL ? '0.03em' : '0.01em',
                  marginBlockEnd: '0.75rem',
                  textAlign: isRTL ? 'end' : 'center',
                  color: '#6B7280'
                }}
              >
                {t('totalEarnings')}
              </p>
              <div
                className="text-orange-600"
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  lineHeight: '1.2',
                  letterSpacing: '0.02em',
                  color: '#FF6B35',
                  display: 'flex',
                  gap: '0.25rem',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}
                dir="ltr"
              >
                {formatCurrency(8450)}
              </div>
            </div>
          </div>

          {/* Other Stats - Two Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div
              className="bg-white rounded-xl shadow-sm"
              style={{
                padding: '1.25rem',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.75rem'
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: '700',
                    color: '#22C55E',
                    lineHeight: '1',
                    marginBlockEnd: '0.5rem'
                  }}
                  dir="ltr"
                >
                  24
                </div>
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    textAlign: 'center',
                    lineHeight: isRTL ? '1.6' : '1.5',
                    letterSpacing: isRTL ? '0.03em' : '0.01em',
                    color: '#6B7280'
                  }}
                >
                  {t('productsListed')}
                </p>
              </div>
            </div>
            <div
              className="bg-white rounded-xl shadow-sm"
              style={{
                padding: '1.25rem',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.75rem'
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: '700',
                    color: '#3B82F6',
                    lineHeight: '1',
                    marginBlockEnd: '0.5rem'
                  }}
                  dir="ltr"
                >
                  156
                </div>
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    textAlign: 'center',
                    lineHeight: isRTL ? '1.6' : '1.5',
                    letterSpacing: isRTL ? '0.03em' : '0.01em',
                    color: '#6B7280'
                  }}
                >
                  {t('ordersCompleted')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-3 mb-6">
        {menuItems.map((item, index) => {
          if (item.show === false) return null;

          return (
            <div
              key={index}
              className="card card-hover cursor-pointer"
              onClick={item.action}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ' ') && item.action) {
                  e.preventDefault();
                  item.action();
                }
              }}
              aria-label={`${item.title} - ${item.subtitle}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="heading-sm">{item.title}</h3>
                  <p className="body-sm text-gray-600">{item.subtitle}</p>
                </div>
                <span className="text-gray-400">›</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="btn w-full"
        style={{ backgroundColor: '#f44336', color: 'white' }}
      >
        🚪 {t('logout')}
      </button>

      {/* App Version */}
      <div className="text-center mt-6">
        <p className="body-sm text-gray-500 bidi-isolate" dir="ltr">
          HASAD v1.0.0
        </p>
        <p className="body-sm text-gray-400">{t('smartFarmingFingerTips')}</p>
      </div>
    </div>
  );
};