import React, { useState, useEffect } from 'react';
import { missingKeyTracker } from '../../i18n';
import { AlertTriangle, X, Eye, EyeOff } from 'lucide-react';

export const MissingKeyOverlay: React.FC = () => {
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  useEffect(() => {
    const updateMissingKeys = () => {
      setMissingKeys(missingKeyTracker.getMissingKeys());
    };

    // Update missing keys every 3 seconds
    const interval = setInterval(updateMissingKeys, 3000);
    updateMissingKeys();

    return () => clearInterval(interval);
  }, []);

  // Don't show if no missing keys
  if (missingKeys.length === 0) {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          title={`${missingKeys.length} missing translation keys`}
        >
          <AlertTriangle className="w-4 h-4" />
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {missingKeys.length}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-2xl border-2 border-red-200 w-80 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="bg-red-500 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <h3 className="font-semibold text-sm">Missing Translations</h3>
          <span className="bg-red-600 text-xs px-2 py-1 rounded-full">
            {missingKeys.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-red-600 rounded"
            title="Hide overlay"
          >
            <EyeOff className="w-3 h-3" />
          </button>
          <button
            onClick={() => {
              missingKeyTracker.clear();
              setMissingKeys([]);
            }}
            className="p-1 hover:bg-red-600 rounded"
            title="Clear missing keys"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 overflow-y-auto max-h-80">
        <div className="space-y-2">
          {missingKeys.slice(0, 20).map(key => (
            <div
              key={key}
              className="bg-red-50 border border-red-200 rounded p-2 text-xs font-mono text-red-800"
            >
              {key}
            </div>
          ))}
          {missingKeys.length > 20 && (
            <div className="text-xs text-red-600 text-center py-2">
              +{missingKeys.length - 20} more keys...
            </div>
          )}
        </div>

        {missingKeys.length === 0 && (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-green-700 font-medium">All translations found!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-2">
        <p className="text-xs text-gray-600 text-center">
          Dev mode only - Missing keys are logged to console
        </p>
      </div>
    </div>
  );
};