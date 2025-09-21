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
    <div className="fixed bottom-0 inset-inline-start-0 inset-inline-end-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom preserve-position">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onScreenChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative preserve-position ${
                isActive ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
              {tab.badge && (
                <div className="absolute -top-1 -inset-inline-end-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
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
