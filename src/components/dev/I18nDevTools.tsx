import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage as changeI18nLanguage, missingKeyTracker } from '../../i18n';
import { 
  Bug, 
  Eye, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  Camera,
  Download,
  X,
  RefreshCw
} from 'lucide-react';

interface I18nDevToolsProps {
  show?: boolean;
}

export const I18nDevTools: React.FC<I18nDevToolsProps> = ({ show = false }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const [showMissingKeys, setShowMissingKeys] = useState(false);
  const [screenshotMode, setScreenshotMode] = useState(false);

  // Only show in development
  if (!import.meta.env.DEV || !show) {
    return null;
  }

  useEffect(() => {
    const updateMissingKeys = () => {
      setMissingKeys(missingKeyTracker.getMissingKeys());
    };

    // Update missing keys every 2 seconds
    const interval = setInterval(updateMissingKeys, 2000);
    updateMissingKeys();

    return () => clearInterval(interval);
  }, []);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'pseudo', name: 'Pseudo', flag: '🔧', dir: 'ltr' },
  ];

  const handleLanguageChange = (langCode: string) => {
    changeI18nLanguage(langCode as 'ar' | 'en');
    
    // Special handling for pseudo-locale
    if (langCode === 'pseudo') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.style.fontFamily = 'monospace';
    } else {
      document.body.style.fontFamily = '';
    }
  };

  const takeScreenshot = async (page: string) => {
    try {
      setScreenshotMode(true);
      
      // Wait for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use html2canvas or similar library in production
      console.log(`📸 Taking screenshot of ${page} in ${i18n.language}`);
      
      // Simulate screenshot capture
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1f2937';
        ctx.font = '16px Arial';
        ctx.fillText(`Screenshot: ${page} (${i18n.language})`, 20, 40);
        ctx.fillText(`Direction: ${document.dir}`, 20, 70);
        ctx.fillText(`Timestamp: ${new Date().toISOString()}`, 20, 100);
        
        // Convert to blob and download
        canvas.toBlob(blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `hasad-${page}-${i18n.language}-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      }
      
      setScreenshotMode(false);
    } catch (error) {
      console.error('Screenshot failed:', error);
      setScreenshotMode(false);
    }
  };

  const clearMissingKeys = () => {
    missingKeyTracker.clear();
    setMissingKeys([]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          title="Open i18n Dev Tools"
        >
          <Globe className="w-5 h-5" />
          {missingKeys.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {missingKeys.length}
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <h3 className="font-semibold">i18n Dev Tools</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-purple-700 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto max-h-80">
        {/* Language Switcher */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Test Languages</h4>
          <div className="grid grid-cols-3 gap-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`p-2 text-xs rounded border transition-colors ${
                  i18n.language === lang.code
                    ? 'bg-purple-100 border-purple-300 text-purple-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-lg mb-1">{lang.flag}</div>
                <div className="font-medium">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Screenshot Tools */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Screenshot Testing</h4>
          <div className="grid grid-cols-2 gap-2">
            {['Profile', 'Plans', 'Shopping', 'Cart'].map(page => (
              <button
                key={page}
                onClick={() => takeScreenshot(page)}
                disabled={screenshotMode}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                <Camera className="w-3 h-3" />
                {page}
              </button>
            ))}
          </div>
          {screenshotMode && (
            <div className="text-xs text-blue-600 mt-2">📸 Taking screenshot...</div>
          )}
        </div>

        {/* Missing Keys Report */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-700">Missing Keys</h4>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${
                missingKeys.length === 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {missingKeys.length === 0 ? (
                  <>
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    All Good
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                    {missingKeys.length}
                  </>
                )}
              </span>
              <button
                onClick={clearMissingKeys}
                className="p-1 hover:bg-gray-100 rounded"
                title="Clear missing keys"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {missingKeys.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-2 max-h-32 overflow-y-auto">
              {missingKeys.slice(0, 10).map(key => (
                <div key={key} className="text-xs text-red-700 font-mono py-1">
                  {key}
                </div>
              ))}
              {missingKeys.length > 10 && (
                <div className="text-xs text-red-600 font-medium">
                  +{missingKeys.length - 10} more...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Current State */}
        <div className="bg-gray-50 rounded p-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Current State</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div>Language: <span className="font-mono">{i18n.language}</span></div>
            <div>Direction: <span className="font-mono">{document.dir}</span></div>
            <div>Locale: <span className="font-mono">{document.documentElement.lang}</span></div>
            <div>Keys Loaded: <span className="font-mono">{Object.keys(i18n.getResourceBundle(i18n.language, 'translation') || {}).length}</span></div>
          </div>
        </div>

        {/* Export Report */}
        <button
          onClick={() => {
            const report = {
              timestamp: new Date().toISOString(),
              language: i18n.language,
              direction: document.dir,
              missingKeys: missingKeys,
              loadedKeys: Object.keys(i18n.getResourceBundle(i18n.language, 'translation') || {}),
            };
            
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `i18n-report-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
  );
};