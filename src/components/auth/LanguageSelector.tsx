import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { changeLanguage } from '../../i18n';

interface Language {
  code: 'ar' | 'en';
  name: string;
  nativeName: string;
  initials: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    initials: 'EN',
    flag: '🇺🇸',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    initials: 'AR',
    flag: '🇸🇦',
  },
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[1]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('hasad-language');
    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      if (lang) {
        setCurrentLang(lang);
        changeLanguage(savedLanguage as 'ar' | 'en');
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (language: Language) => {
    setCurrentLang(language);
    changeLanguage(language.code);
    localStorage.setItem('hasad-language', language.code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        style={{ gap: '0.5rem' }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5 text-gray-600" style={{ flexShrink: 0 }} />
        <span className="text-sm font-semibold text-gray-700" style={{ minWidth: 'fit-content' }}>
          {currentLang.initials}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fadeIn"
          style={{
            insetInlineEnd: 0,
            minWidth: '200px',
          }}
        >
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
                  currentLang.code === language.code ? 'bg-green-50' : ''
                }`}
                style={{ gap: '0.75rem' }}
              >
                <span className="text-2xl" style={{ flexShrink: 0 }}>{language.flag}</span>
                <div className="flex-1 text-start" style={{ minWidth: 0 }}>
                  <p className={`text-sm font-medium ${
                    currentLang.code === language.code ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {language.nativeName}
                  </p>
                  <p className="text-xs text-gray-500">{language.initials}</p>
                </div>
                {currentLang.code === language.code && (
                  <Check className="w-5 h-5 text-green-600" style={{ flexShrink: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};
