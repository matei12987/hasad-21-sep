import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatRelativeTime } from '../../i18n';
import { useSettings } from '../../contexts/SettingsContext';
import { AdminUser, AdminAlert } from '../../types/admin';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Wifi,
  WifiOff,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Info,
} from 'lucide-react';

interface AdminDetailDrawerProps {
  user?: AdminUser | null;
  alert?: AdminAlert | null;
  onClose: () => void;
}

export const AdminDetailDrawer: React.FC<AdminDetailDrawerProps> = ({ user, alert, onClose }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-800';
      case 'premium':
        return 'bg-blue-100 text-blue-800';
      case 'basic':
        return 'bg-gray-100 text-gray-800';
      case 'trial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderUserDetails = () => (
    <div className="space-y-6">
      {/* User Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              user!.role === 'farmer' ? 'bg-green-100' : 'bg-blue-100'
            }`}
          >
            <span className="text-xl font-bold text-gray-700">
              {user!.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{user!.name}</h3>
            <p className="text-gray-600" dir="ltr">
              {user!.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user!.status)}`}
              >
                {t(user!.status)}
              </span>
              {user!.profile?.verified && (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  {t('verified')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          {t('accountInformation')}
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('joinDate')}:</span>
            <span className="font-medium">{formatDate(user!.joinDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('lastActive')}:</span>
            <span className="font-medium">{formatRelativeTime(user!.lastActive)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('role')}:</span>
            <span className="font-medium capitalize">{t(user!.role)}</span>
          </div>
          {user!.profile?.phone && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t('phone')}:</span>
              <span className="font-medium" dir="ltr">
                {user!.profile.phone}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Mail className="w-5 h-5 text-green-600" />
          {t('contactInformation')}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 break-all" dir="ltr">
              {user!.email}
            </span>
          </div>
          {user!.profile?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600" dir="ltr">
                {user!.profile.phone}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{user!.location}</span>
          </div>
        </div>
      </div>

      {/* Farm Information (for farmers) */}
      {user!.role === 'farmer' && user!.profile && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Settings className="w-5 h-5 text-green-600" />
            {t('farmInformation')}
          </h4>
          <div className="space-y-3 text-sm">
            {user!.profile.farmName && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t('farmName')}:</span>
                <span className="font-medium">{user!.profile.farmName}</span>
              </div>
            )}
            {user!.profile.farmType && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t('farmType')}:</span>
                <span className="font-medium capitalize">{t(user!.profile.farmType)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">{t('farmSites')}:</span>
              <span className="font-medium">{user!.farmSites || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('totalOrders')}:</span>
              <span className="font-medium">{user!.totalOrders || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('revenue')}:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(user!.revenue || 0)}
              </span>
            </div>
            {user!.profile.certifications && (
              <div>
                <span className="text-gray-600 block mb-1">{t('certifications')}:</span>
                <div className="flex flex-wrap gap-1">
                  {user!.profile.certifications.map(cert => (
                    <span
                      key={cert}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Device Status (for farmers) */}
      {user!.role === 'farmer' && user!.deviceStatus && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-purple-600" />
            {t('deviceStatus')}
          </h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Wifi className="w-4 h-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">
                  {user!.deviceStatus.online}
                </span>
              </div>
              <div className="text-xs text-gray-600">{t('online')}</div>
            </div>

            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <WifiOff className="w-4 h-4 text-red-600" />
                <span className="text-lg font-bold text-red-600">{user!.deviceStatus.offline}</span>
              </div>
              <div className="text-xs text-gray-600">{t('offline')}</div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Settings className="w-4 h-4 text-yellow-600" />
                <span className="text-lg font-bold text-yellow-600">
                  {user!.deviceStatus.maintenance}
                </span>
              </div>
              <div className="text-xs text-gray-600">{t('maintenance')}</div>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500 text-center">
            {t('lastUpdate')}: {formatRelativeTime(user!.deviceStatus.lastUpdate)}
          </div>
        </div>
      )}

      {/* Subscription Details */}
      {user!.subscription && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            {t('subscriptionDetails')}
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('tier')}:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(user!.subscription.tier)}`}
              >
                {t(user!.subscription.tier)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('status')}:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user!.subscription.status)}`}
              >
                {t(user!.subscription.status)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('expiryDate')}:</span>
              <span className="font-medium">{formatDate(user!.subscription.expiryDate)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {user!.recentActivity && user!.recentActivity.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            {t('recentActivity')}
          </h4>
          <div className="space-y-3">
            {user!.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{formatRelativeTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read-Only Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-600" />
          <p className="text-sm text-amber-800 font-medium">{t('readOnlyView')}</p>
        </div>
        <p className="text-xs text-amber-700 mt-1">{t('readOnlyViewDescription')}</p>
      </div>
    </div>
  );

  const renderAlertDetails = () => (
    <div className="space-y-6">
      {/* Alert Header */}
      <div className={`rounded-lg p-4 border ${getSeverityColor(alert!.severity)}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{alert!.title}</h3>
            <p className="text-sm opacity-90 mb-2">{alert!.message}</p>
            <div className="flex items-center gap-4 text-xs opacity-75">
              <span>{alert!.source}</span>
              <span>{formatRelativeTime(alert!.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          {t('alertDetails')}
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('alertId')}:</span>
            <span className="font-mono text-xs" dir="ltr">
              {alert!.id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('type')}:</span>
            <span className="font-medium capitalize">{t(alert!.type)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('severity')}:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert!.severity)}`}
            >
              {t(alert!.severity)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('source')}:</span>
            <span className="font-medium text-end">{alert!.source}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('created')}:</span>
            <span className="font-medium">{formatDate(alert!.created_at)}</span>
          </div>
          {alert!.acknowledged && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t('acknowledged')}:</span>
              <span className="font-medium text-green-600">
                {formatRelativeTime(alert!.acknowledged_at!)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      {alert!.metadata && Object.keys(alert!.metadata).length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">{t('additionalInformation')}</h4>
          <div className="space-y-2 text-sm">
            {Object.entries(alert!.metadata).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                <span className="font-medium text-end" dir="ltr">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">{t('statusInformation')}</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{t('acknowledged')}:</span>
            <div className="flex items-center gap-2">
              {alert!.acknowledged ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm font-medium">
                {alert!.acknowledged ? t('yes') : t('no')}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{t('resolved')}:</span>
            <div className="flex items-center gap-2">
              {alert!.resolved ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm font-medium">{alert!.resolved ? t('yes') : t('no')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Read-Only Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-600" />
          <p className="text-sm text-amber-800 font-medium">{t('readOnlyView')}</p>
        </div>
        <p className="text-xs text-amber-700 mt-1">{t('readOnlyAlertDescription')}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
      <div className="w-full max-w-md h-full bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {user ? t('userDetails') : t('alertDetails')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {user ? renderUserDetails() : alert ? renderAlertDetails() : null}
        </div>
      </div>
    </div>
  );
};
