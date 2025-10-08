import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { changeLanguage as changeI18nLanguage } from '../../i18n';

export const AdminLanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: 'en' as const,
      name: 'English',
      nameNative: 'English',
      flag: '🇺🇸',
      direction: 'ltr' as const,
    },
    {
      code: 'ar' as const,
      name: 'Arabic',
      nameNative: 'العربية',
      flag: '🇸🇦',
      direction: 'rtl' as const,
    },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: 'ar' | 'en') => {
    changeI18nLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white group"
        aria-label={t('selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage.nameNative}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown Menu */}
          <div className="absolute top-full inset-inline-end-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[180px] overflow-hidden">
            {languages.map(language => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-start hover:bg-gray-50 transition-colors ${
                  i18n.language === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                aria-label={`${t('switchTo')}${language.name}`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{language.nameNative}</div>
                  <div className="text-xs text-gray-500">{language.name}</div>
                </div>
                {i18n.language === language.code && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
