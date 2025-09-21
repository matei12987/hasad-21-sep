import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage as changeI18nLanguage } from '../i18n';
import { Globe, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'header' | 'auth';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'header' }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (newLang: string) => {
    changeI18nLanguage(newLang as 'ar' | 'en');
  };

  // Header variant (existing style)
  if (variant === 'header') {
    const toggleLanguage = () => {
      const newLang = i18n.language === 'ar' ? 'en' : 'ar';
      changeLanguage(newLang);
    };

    return (
      <button
        onClick={toggleLanguage}
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Toggle language"
      >
        <Globe size={18} />
        <span className="font-medium">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
      </button>
    );
  }

  // Auth variant (new dropdown style)
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-3 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors min-w-[140px]"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="font-medium text-gray-700">{currentLanguage.name}</span>
        <Globe size={16} className="text-gray-500 ml-auto" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg border border-gray-200 z-20 rounded-lg">
            {languages.map(language => (
              <button
                key={language.code}
                type="button"
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  i18n.language === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium flex-1">{language.name}</span>
                {i18n.language === language.code && <Check size={16} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
