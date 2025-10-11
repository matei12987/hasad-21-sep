import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, ShoppingBag, Calendar, User, BarChart3, Sprout, MessageCircle } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  userType: 'consumer' | 'farmer' | 'institutional' | 'corporate';
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  onScreenChange,
  userType,
}) => {
  const { t } = useTranslation();

  const getConsumerTabs = () => [
    {
      id: 'home',
      label: t('home'),
      icon: Home,
      badge: null,
    },
    {
      id: 'marketplace',
      label: t('shopping'),
      icon: ShoppingBag,
      badge: null,
    },
    {
      id: 'subscriptions',
      label: t('plans'),
      icon: Calendar,
      badge: null,
    },
    {
      id: 'profile',
      label: t('profile'),
      icon: User,
      badge: null,
    },
  ];

  const getFarmerTabs = () => [
    {
      id: 'home',
      label: t('home'),
      icon: Home,
      badge: null,
    },
    {
      id: 'farmer-dashboard',
      label: t('dashboard'),
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'crop-management',
      label: t('crops'),
      icon: Sprout,
      badge: null,
    },
    {
      id: 'profile',
      label: t('profile'),
      icon: User,
      badge: null,
    },
  ];

  const tabs = userType === 'farmer' ? getFarmerTabs() : getConsumerTabs();

  return (
    <div className="fixed bottom-0 inset-inline-start-0 inset-inline-end-0 bg-white border-t border-gray-200 safe-area-bottom preserve-position" style={{ padding: '0.5rem 1rem' }}>
      <div className="flex justify-around items-stretch max-w-md mx-auto" style={{ gap: '0.25rem' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onScreenChange(tab.id)}
              className={`flex flex-col items-center justify-center rounded-lg transition-colors relative preserve-position ${
                isActive ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{
                padding: '0.5rem 0.75rem',
                minWidth: '4rem',
                gap: '0.25rem'
              }}
            >
              <Icon size={24} style={{ flexShrink: 0 }} />
              <span className="font-medium" style={{ fontSize: '0.75rem', lineHeight: '1.2', textAlign: 'center', whiteSpace: 'nowrap' }}>{tab.label}</span>
              {tab.badge && (
                <div className="absolute bg-red-500 text-white rounded-full flex items-center justify-center" style={{ top: '-0.25rem', insetInlineEnd: '-0.25rem', minWidth: '1.125rem', height: '1.125rem', fontSize: '0.75rem' }}>
                  {tab.badge}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
