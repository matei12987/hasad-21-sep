import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatRelativeTime } from '../../i18n';
import { AdminAlert } from '../../types/admin';
import { AlertTriangle, AlertCircle, Info, Clock, Filter, ChevronDown } from 'lucide-react';

interface AdminAlertsPanelProps {
  onAlertSelect: (alert: AdminAlert) => void;
}

export const AdminAlertsPanel: React.FC<AdminAlertsPanelProps> = ({ onAlertSelect }) => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<AdminAlert[]>([]);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockAlerts: AdminAlert[] = [
      {
        id: '1',
        type: 'device_fault',
        severity: 'critical',
        title: 'Water Pump Failure',
        message: 'Main water pump at Green Valley Farm has stopped responding',
        source: 'Green Valley Farm - Pump #1',
        user_id: 'farmer1',
        device_id: 'pump_001',
        acknowledged: false,
        resolved: false,
        created_at: '2024-02-12T14:30:00Z',
        metadata: {
          farm_name: 'Green Valley Farm',
          device_type: 'water_pump',
          error_code: 'PUMP_NO_RESPONSE',
        },
      },
      {
        id: '2',
        type: 'threshold_exceeded',
        severity: 'warning',
        title: 'High Temperature Alert',
        message: 'Temperature in greenhouse section B has exceeded 28°C for 2 hours',
        source: 'Sunny Organic Farm - Greenhouse B',
        user_id: 'farmer2',
        device_id: 'sensor_045',
        acknowledged: false,
        resolved: false,
        created_at: '2024-02-12T12:15:00Z',
        metadata: {
          farm_name: 'Sunny Organic Farm',
          current_temperature: 28.5,
          threshold: 26.0,
          duration_hours: 2,
        },
      },
      {
        id: '3',
        type: 'maintenance_due',
        severity: 'info',
        title: 'Filter Replacement Due',
        message: 'Water filtration system requires maintenance within 3 days',
        source: 'Desert Bloom Farm - Filter System',
        user_id: 'farmer3',
        device_id: 'filter_012',
        acknowledged: true,
        resolved: false,
        created_at: '2024-02-11T09:00:00Z',
        acknowledged_at: '2024-02-11T10:30:00Z',
        metadata: {
          farm_name: 'Desert Bloom Farm',
          maintenance_type: 'filter_replacement',
          days_remaining: 3,
        },
      },
      {
        id: '4',
        type: 'connectivity_issue',
        severity: 'warning',
        title: 'Device Offline',
        message: 'LED lighting controller has been offline for 45 minutes',
        source: 'Berry Fresh Farms - LED Controller #3',
        user_id: 'farmer4',
        device_id: 'led_003',
        acknowledged: false,
        resolved: false,
        created_at: '2024-02-12T13:45:00Z',
        metadata: {
          farm_name: 'Berry Fresh Farms',
          device_type: 'led_controller',
          offline_duration_minutes: 45,
        },
      },
      {
        id: '5',
        type: 'harvest_ready',
        severity: 'info',
        title: 'Crop Harvest Ready',
        message: 'Butterhead lettuce in section A is ready for harvest',
        source: 'Green Valley Farm - Section A',
        user_id: 'farmer1',
        acknowledged: false,
        resolved: false,
        created_at: '2024-02-12T08:00:00Z',
        metadata: {
          farm_name: 'Green Valley Farm',
          crop_type: 'butterhead_lettuce',
          section: 'A',
          estimated_yield: '25 kg',
        },
      },
      {
        id: '6',
        type: 'system_update',
        severity: 'info',
        title: 'System Update Available',
        message: 'New firmware update available for IoT controllers',
        source: 'System Administration',
        acknowledged: true,
        resolved: false,
        created_at: '2024-02-10T16:20:00Z',
        acknowledged_at: '2024-02-10T17:00:00Z',
        metadata: {
          update_version: '2.1.4',
          affected_devices: 156,
        },
      },
    ];

    setAlerts(mockAlerts);
    setLoading(false);
  }, []);

  // Filter alerts
  useEffect(() => {
    let filtered = [...alerts];

    if (severityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.severity === severityFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.type === typeFilter);
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setFilteredAlerts(filtered);
  }, [alerts, severityFilter, typeFilter]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'device_fault':
        return '🔧';
      case 'threshold_exceeded':
        return '🌡️';
      case 'maintenance_due':
        return '⚙️';
      case 'connectivity_issue':
        return '📡';
      case 'harvest_ready':
        return '🌾';
      case 'system_update':
        return '🔄';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('alerts')}</h3>
          <div className="flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-xs font-medium text-red-700">
              {alerts.filter(a => !a.acknowledged).length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <select
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('allSeverities')}</option>
            <option value="critical">{t('critical')}</option>
            <option value="warning">{t('warning')}</option>
            <option value="info">{t('info')}</option>
          </select>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('allTypes')}</option>
            <option value="device_fault">{t('deviceFaults')}</option>
            <option value="threshold_exceeded">{t('thresholdAlerts')}</option>
            <option value="maintenance_due">{t('maintenanceDue')}</option>
            <option value="connectivity_issue">{t('connectivityIssues')}</option>
            <option value="harvest_ready">{t('harvestReady')}</option>
            <option value="system_update">{t('systemUpdates')}</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{t('noAlertsFound')}</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredAlerts.map(alert => (
              <div
                key={alert.id}
                onClick={() => onAlertSelect(alert)}
                className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getSeverityColor(alert.severity)} ${
                  alert.acknowledged ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="text-lg">{getTypeIcon(alert.type)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getSeverityIcon(alert.severity)}
                      <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                    </div>

                    <p className="text-xs opacity-90 line-clamp-2 mb-2">{alert.message}</p>

                    <div className="flex items-center justify-between text-xs opacity-75">
                      <span className="truncate">{alert.source}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatRelativeTime(alert.created_at)}</span>
                      </div>
                    </div>

                    {alert.acknowledged && (
                      <div className="mt-2 text-xs opacity-60">
                        ✓ {t('acknowledged')} {formatRelativeTime(alert.acknowledged_at!)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-red-600">
              {alerts.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-xs text-gray-600">{t('critical')}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {alerts.filter(a => a.severity === 'warning').length}
            </div>
            <div className="text-xs text-gray-600">{t('warning')}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {alerts.filter(a => a.severity === 'info').length}
            </div>
            <div className="text-xs text-gray-600">{t('info')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
