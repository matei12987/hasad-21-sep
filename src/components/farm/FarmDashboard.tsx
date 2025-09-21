import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Thermometer,
  Droplets,
  Zap,
  Sun,
  Wifi,
  AlertTriangle,
  TrendingUp,
  Activity,
  Leaf,
  Settings,
  BarChart3,
  MapPin,
} from 'lucide-react';
import { SensorData, FarmSite, Alert, PerformanceMetrics } from '../../types';

interface FarmDashboardProps {
  selectedSite: FarmSite;
  onSiteChange: (site: FarmSite) => void;
  sites: FarmSite[];
}

export const FarmDashboard: React.FC<FarmDashboardProps> = ({
  selectedSite,
  onSiteChange,
  sites,
}) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockSensorData: SensorData = {
      id: '1',
      site_id: selectedSite.id,
      timestamp: new Date().toISOString(),
      temperature: 24.5,
      humidity: 65,
      ph: 6.2,
      ec: 1.8,
      water_level: 78,
      water_flow: 2.3,
      light_intensity: 45000,
      co2_level: 420,
      nutrient_levels: {
        nitrogen: 180,
        phosphorus: 45,
        potassium: 220,
      },
      solar_generation: 12.4,
      energy_consumption: 8.7,
    };

    const mockAlerts: Alert[] = [
      {
        id: '1',
        site_id: selectedSite.id,
        type: 'threshold',
        severity: 'warning',
        title: 'High Temperature',
        message: 'Temperature has exceeded 26°C for 2 hours',
        acknowledged: false,
        resolved: false,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        site_id: selectedSite.id,
        type: 'maintenance',
        severity: 'info',
        title: 'Filter Replacement Due',
        message: 'Water filter needs replacement in 3 days',
        acknowledged: false,
        resolved: false,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    const mockMetrics: PerformanceMetrics = {
      site_id: selectedSite.id,
      period: 'weekly',
      date_range: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      },
      metrics: {
        water_usage: 1250,
        water_per_kg: 12.5,
        energy_consumption: 145.6,
        energy_per_kg: 2.8,
        solar_generation: 89.3,
        carbon_offset: 45.2,
        food_miles_saved: 1200,
        uptime: 98.5,
        yield_efficiency: 92.3,
        crop_health_avg: 87,
      },
    };

    setSensorData(mockSensorData);
    setAlerts(mockAlerts);
    setMetrics(mockMetrics);
    setLoading(false);
  }, [selectedSite]);

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

  const getStatusColor = (value: number, type: string) => {
    // Define optimal ranges for different parameters
    const ranges = {
      temperature: { min: 18, max: 26, unit: '°C' },
      humidity: { min: 60, max: 70, unit: '%' },
      ph: { min: 5.5, max: 6.5, unit: '' },
      ec: { min: 1.2, max: 2.0, unit: 'mS/cm' },
      water_level: { min: 70, max: 100, unit: '%' },
    };

    const range = ranges[type as keyof typeof ranges];
    if (!range) return 'text-gray-600';

    if (value >= range.min && value <= range.max) return 'text-green-600';
    if (value < range.min * 0.8 || value > range.max * 1.2) return 'text-red-600';
    return 'text-yellow-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} lang={i18n.language}>
      {/* Site Selector */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            {t('farmDashboard')} - {selectedSite.name}
          </h2>
          <select
            value={selectedSite.id}
            onChange={e => {
              const site = sites.find(s => s.id === e.target.value);
              if (site) onSiteChange(site);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {sites.map(site => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                selectedSite.status === 'active'
                  ? 'bg-green-500'
                  : selectedSite.status === 'maintenance'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
            />
            {t(selectedSite.status)}
          </span>
          <span>{selectedSite.location.address}</span>
          <span>{selectedSite.size} {t('squareMeters')}</span>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            {t('activeAlerts')} ({alerts.length})
          </h3>
          <div className="space-y-2">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{alert.title === 'High Temperature' ? t('highTemperature') : alert.title === 'Filter Replacement Due' ? t('filterReplacementDue') : alert.title}</h4>
                    <p className="text-sm opacity-80">{alert.message === 'Temperature has exceeded 26°C for 2 hours' ? t('temperatureHasExceeded26CFor2Hours') : alert.message === 'Water filter needs replacement in 3 days' ? t('waterFilterNeedsReplacementIn3Days') : alert.message}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {new Date(alert.created_at).toLocaleString(i18n.language === 'ar' ? 'ar-SA' : 'en-US')}
                    </p>
                  </div>
                  <button className="text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50">
                    {t('acknowledge')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Sensor Data */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          {t('realTimeMonitoring')}
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sensorData && (
            <>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-700">{t('temperature')}</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getStatusColor(sensorData.temperature, 'temperature')}`}
                >
                  <span dir="ltr">{sensorData.temperature}°C</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((sensorData.temperature / 35) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{t('humidity')}</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getStatusColor(sensorData.humidity, 'humidity')}`}
                >
                  <span dir="ltr">{sensorData.humidity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${sensorData.humidity}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{t('phLevel')}</span>
                </div>
                <div className={`text-2xl font-bold ${getStatusColor(sensorData.ph, 'ph')}`}>
                  <span dir="ltr">{sensorData.ph}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1" dir="ltr">EC: {sensorData.ec} mS/cm</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">{t('waterLevel')}</span>
                </div>
                <div
                  className={`text-2xl font-bold ${getStatusColor(sensorData.water_level, 'water_level')}`}
                >
                  <span dir="ltr">{sensorData.water_level}%</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span dir="ltr">{t('flow')}: {sensorData.water_flow} L/min</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">{t('solarGeneration')}</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  <span dir="ltr">{sensorData.solar_generation} kWh</span>
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate">
                  <span dir="ltr">{t('consumption')}: {sensorData.energy_consumption} kWh</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{t('systemStatus')}</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  <span dir="ltr">{metrics?.metrics.uptime}%</span>
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate">{t('uptime')}</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">{t('nutrients')}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs gap-1" dir="ltr">
                    <span>N: {sensorData.nutrient_levels.nitrogen}ppm</span>
                    <span>P: {sensorData.nutrient_levels.phosphorus}ppm</span>
                  </div>
                  <div className="text-xs truncate" dir="ltr">
                    K: {sensorData.nutrient_levels.potassium}ppm
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">{t('environment')}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs truncate" dir="ltr">
                    {t('light')}: {(sensorData.light_intensity / 1000).toFixed(1)}k lux
                  </div>
                  <div className="text-xs truncate" dir="ltr">CO₂: {sensorData.co2_level} ppm</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Performance KPIs */}
      {metrics && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            {t('performanceMetrics')} ({t('thisWeek')})
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                <span dir="ltr">{metrics.metrics.water_per_kg}L</span>
              </div>
              <div className="text-sm text-gray-600">{t('waterPerKg')}</div>
              <div className="text-xs text-green-600 mt-1" dir="ltr">↓ 15% {t('vsLastWeek')}</div>
            </div>

            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                <span dir="ltr">{metrics.metrics.energy_per_kg} kWh</span>
              </div>
              <div className="text-sm text-gray-600">{t('energyPerKg')}</div>
              <div className="text-xs text-green-600 mt-1" dir="ltr">↓ 8% {t('vsLastWeek')}</div>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                <span dir="ltr">{metrics.metrics.carbon_offset} kg</span>
              </div>
              <div className="text-sm text-gray-600">{t('carbonOffset')}</div>
              <div className="text-xs text-green-600 mt-1" dir="ltr">↑ 12% {t('vsLastWeek')}</div>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                <span dir="ltr">{metrics.metrics.food_miles_saved} km</span>
              </div>
              <div className="text-sm text-gray-600">{t('milesSaved')}</div>
              <div className="text-xs text-green-600 mt-1" dir="ltr">↑ 5% {t('vsLastWeek')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600" />
          {t('quickActions')}
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
            <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-blue-800">{t('iotControls')}</div>
          </button>

          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
            <Leaf className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-green-800">{t('cropManagement')}</div>
          </button>

          <button className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-center">
            <Activity className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-yellow-800">{t('tasksAndMaintenance')}</div>
          </button>

          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
            <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-purple-800">{t('reports')}</div>
          </button>
        </div>
      </div>
    </div>
  );
};
