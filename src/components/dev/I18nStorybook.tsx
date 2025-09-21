import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage as changeI18nLanguage } from '../../i18n';
import { ProfileScreen } from '../profile/ProfileScreen';
import { SubscriptionPlans } from '../marketplace/SubscriptionPlans';
import { CartScreen } from '../cart/CartScreen';
import { ProductCatalog } from '../marketplace/ProductCatalog';
import { 
  Book, 
  Globe, 
  Eye, 
  Monitor, 
  Smartphone, 
  Tablet,
  ArrowLeft,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface StoryConfig {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  props?: any;
  description: string;
}

export const I18nStorybook: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  const stories: StoryConfig[] = [
    {
      id: 'profile-ar',
      name: 'Profile (Arabic)',
      component: ProfileScreen,
      props: { onNavigateToSettings: () => {} },
      description: 'Profile page in Arabic RTL layout'
    },
    {
      id: 'profile-en',
      name: 'Profile (English)',
      component: ProfileScreen,
      props: { onNavigateToSettings: () => {} },
      description: 'Profile page in English LTR layout'
    },
    {
      id: 'plans-ar',
      name: 'Plans (Arabic)',
      component: SubscriptionPlans,
      description: 'Subscription plans in Arabic RTL layout'
    },
    {
      id: 'plans-en',
      name: 'Plans (English)',
      component: SubscriptionPlans,
      description: 'Subscription plans in English LTR layout'
    },
    {
      id: 'cart-ar',
      name: 'Cart (Arabic)',
      component: CartScreen,
      description: 'Shopping cart in Arabic RTL layout'
    },
    {
      id: 'cart-en',
      name: 'Cart (English)',
      component: CartScreen,
      description: 'Shopping cart in English LTR layout'
    },
    {
      id: 'marketplace-ar',
      name: 'Marketplace (Arabic)',
      component: ProductCatalog,
      description: 'Product catalog in Arabic RTL layout'
    },
    {
      id: 'marketplace-en',
      name: 'Marketplace (English)',
      component: ProductCatalog,
      description: 'Product catalog in English LTR layout'
    }
  ];

  const handleStorySelect = (story: StoryConfig) => {
    const targetLang = story.id.endsWith('-ar') ? 'ar' : 'en';
    
    // Change language and direction
    changeI18nLanguage(targetLang);
    
    setSelectedStory(story.id);
  };

  const getViewportClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
        return 'max-w-6xl mx-auto';
      default:
        return 'max-w-sm mx-auto';
    }
  };

  const getViewportIcon = () => {
    switch (viewport) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed top-4 right-20 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="Open i18n Storybook"
        >
          <Book className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (selectedStory) {
    const story = stories.find(s => s.id === selectedStory);
    if (!story) return null;

    const Component = story.component;

    return (
      <div className="fixed inset-0 bg-black/80 z-50 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedStory(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-semibold text-gray-900">{story.name}</h2>
                <p className="text-sm text-gray-600">{story.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Viewport Selector */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                {(['mobile', 'tablet', 'desktop'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setViewport(size)}
                    className={`p-2 rounded transition-colors ${
                      viewport === size 
                        ? 'bg-white shadow-sm text-indigo-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title={`${size} viewport`}
                  >
                    {size === 'mobile' && <Smartphone className="w-4 h-4" />}
                    {size === 'tablet' && <Tablet className="w-4 h-4" />}
                    {size === 'desktop' && <Monitor className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {/* Language Toggle */}
              <button
                onClick={() => changeI18nLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {i18n.language === 'ar' ? 'العربية' : 'English'}
                </span>
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Direction Indicator */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                {document.dir === 'rtl' ? (
                  <ArrowLeft className="w-4 h-4 text-gray-600" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {document.dir.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="p-8">
          <div className={`${getViewportClass()} bg-white rounded-xl shadow-xl overflow-hidden`}>
            <div className="min-h-screen">
              <Component {...(story.props || {})} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-20 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5" />
          <h3 className="font-semibold">i18n Storybook</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-indigo-700 rounded"
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto max-h-80">
        {/* Current State */}
        <div className="bg-gray-50 rounded p-3">
          <div className="text-xs text-gray-600 space-y-1">
            <div>Language: <span className="font-mono font-semibold">{i18n.language}</span></div>
            <div>Direction: <span className="font-mono font-semibold">{document.dir}</span></div>
          </div>
        </div>

        {/* Stories */}
        <div className="space-y-2">
          {stories.map(story => (
            <button
              key={story.id}
              onClick={() => handleStorySelect(story)}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{story.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{story.description}</p>
                </div>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 pt-3">
          <button
            onClick={runAllTests}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm"
          >
            <TestTube className="w-4 h-4" />
            Run All RTL Tests
          </button>
        </div>
      </div>
    </div>
  );
};