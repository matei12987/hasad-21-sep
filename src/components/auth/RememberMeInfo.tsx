import React from 'react';
import { useTranslation } from 'react-i18next';
import { secureStorage } from '../../lib/secureStorage';
import { Shield, Clock, Trash2 } from 'lucide-react';

/**
 * RememberMeInfo Component
 *
 * Displays information about stored credentials and provides
 * management options for the remember me functionality
 */
export const RememberMeInfo: React.FC = () => {
  const { t } = useTranslation();
  const [expirationInfo, setExpirationInfo] = React.useState<{
    isExpired: boolean;
    daysRemaining: number;
  } | null>(null);

  React.useEffect(() => {
    // Get expiration information
    const info = secureStorage.getExpirationInfo();
    setExpirationInfo(info);
  }, []);

  const handleClearCredentials = () => {
    if (window.confirm('Are you sure you want to clear stored login credentials?')) {
      secureStorage.clearCredentials();
      setExpirationInfo({ isExpired: true, daysRemaining: 0 });
      window.location.reload(); // Refresh to update the login form
    }
  };

  const storedCredentials = secureStorage.getStoredCredentials();

  if (!storedCredentials || !expirationInfo || expirationInfo.isExpired) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-green-800 mb-2">Credentials Remembered</h4>
          <div className="space-y-2 text-xs text-green-700">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>
                Expires in {expirationInfo.daysRemaining} day
                {expirationInfo.daysRemaining !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              <span>Email: {storedCredentials.email}</span>
            </div>
            <p className="text-green-600 font-medium">Password is never stored for your security</p>
          </div>
        </div>
        <button
          onClick={handleClearCredentials}
          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          title="Clear stored credentials"
          aria-label="Clear stored credentials"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
