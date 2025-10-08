import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../i18n';
import { useSettings } from '../../contexts/SettingsContext';
import {
  Users,
  Sprout,
  Wifi,
  AlertTriangle,
  DollarSign,
  Activity,
  Database,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, changeType, icon, color }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="w-3 h-3" />;
      case 'negative':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor()}`}
        >
          {getChangeIcon()}
          <span>{change}</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
    </div>
  );
};

export const AdminKPICards: React.FC = () => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();

  // Mock KPI data - replace with actual API calls
  const kpiData = [
    {
      title: t('totalFarmers'),
      value: formatNumber(247),
      change: '+12',
      changeType: 'positive' as const,
      icon: <Sprout className="w-6 h-6 text-green-600" />,
      color: 'bg-green-100',
    },
    {
      title: t('totalConsumers'),
      value: formatNumber(1429),
      change: '+89',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-100',
    },
    {
      title: t('activeDevices'),
      value: formatNumber(1847),
      change: '+23',
      changeType: 'positive' as const,
      icon: <Wifi className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-100',
    },
    {
      title: t('openAlerts'),
      value: formatNumber(12),
      change: '-5',
      changeType: 'positive' as const,
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-100',
    },
    {
      title: t('monthlyRevenue'),
      value: formatCurrency(284750),
      change: '+18.5%',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-100',
    },
    {
      title: t('systemUptime'),
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive' as const,
      icon: <Activity className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-100',
    },
    {
      title: t('dataProcessed'),
      value: '2.4TB',
      change: '+156GB',
      changeType: 'neutral' as const,
      icon: <Database className="w-6 h-6 text-cyan-600" />,
      color: 'bg-cyan-100',
    },
    {
      title: t('avgResponseTime'),
      value: '127ms',
      change: '-23ms',
      changeType: 'positive' as const,
      icon: <Clock className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          changeType={kpi.changeType}
          icon={kpi.icon}
          color={kpi.color}
        />
      ))}
    </div>
  );
};
