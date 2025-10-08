import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatNumber } from '../../i18n';
import { useSettings } from '../../contexts/SettingsContext';
import { AdminUser } from '../../types/admin';
import { Search, Filter, Eye, ChevronUp, ChevronDown, MapPin, Wifi } from 'lucide-react';

interface AdminFarmersTabProps {
  onUserSelect: (user: AdminUser) => void;
}

export const AdminFarmersTab: React.FC<AdminFarmersTabProps> = ({ onUserSelect }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const [farmers, setFarmers] = useState<AdminUser[]>([]);
  const [filteredFarmers, setFilteredFarmers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof AdminUser>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockFarmers: AdminUser[] = [
      {
        id: '1',
        name: 'Ahmed Al-Rashid',
        email: 'ahmed.rashid@farm.sa',
        role: 'farmer',
        status: 'active',
        location: 'Riyadh, Saudi Arabia',
        joinDate: '2024-01-15',
        lastActive: '2024-02-12T14:30:00Z',
        farmSites: 3,
        totalOrders: 156,
        revenue: 45750.0,
        devices: 12,
        subscription: {
          tier: 'premium',
          status: 'active',
          expiryDate: '2024-12-15',
        },
        profile: {
          phone: '+966501234567',
          avatar: null,
          verified: true,
          farmName: 'Green Valley Hydroponics',
          farmType: 'hydroponic',
          certifications: ['Organic', 'HACCP'],
        },
        deviceStatus: {
          online: 11,
          offline: 1,
          maintenance: 0,
          lastUpdate: '2024-02-12T14:25:00Z',
        },
        recentActivity: [
          {
            id: '1',
            type: 'order_completed',
            description: 'Completed order #1234',
            timestamp: '2024-02-12T13:45:00Z',
          },
          {
            id: '2',
            type: 'device_alert',
            description: 'Water pump maintenance alert',
            timestamp: '2024-02-12T10:20:00Z',
          },
        ],
      },
      {
        id: '2',
        name: 'Fatima Al-Zahra',
        email: 'fatima.zahra@organicfarm.sa',
        role: 'farmer',
        status: 'active',
        location: 'Jeddah, Saudi Arabia',
        joinDate: '2023-11-20',
        lastActive: '2024-02-12T09:15:00Z',
        farmSites: 2,
        totalOrders: 203,
        revenue: 67890.0,
        devices: 8,
        subscription: {
          tier: 'enterprise',
          status: 'active',
          expiryDate: '2024-11-20',
        },
        profile: {
          phone: '+966509876543',
          avatar: null,
          verified: true,
          farmName: 'Sunny Organic Farm',
          farmType: 'organic',
          certifications: ['Organic', 'Fair Trade', 'GlobalGAP'],
        },
        deviceStatus: {
          online: 8,
          offline: 0,
          maintenance: 0,
          lastUpdate: '2024-02-12T09:10:00Z',
        },
        recentActivity: [
          {
            id: '1',
            type: 'harvest_logged',
            description: 'Logged tomato harvest - 45kg',
            timestamp: '2024-02-12T08:30:00Z',
          },
        ],
      },
      {
        id: '3',
        name: 'Mohammed Al-Otaibi',
        email: 'mohammed.otaibi@smartfarm.sa',
        role: 'farmer',
        status: 'inactive',
        location: 'Dammam, Saudi Arabia',
        joinDate: '2024-02-01',
        lastActive: '2024-02-10T16:45:00Z',
        farmSites: 1,
        totalOrders: 23,
        revenue: 8950.0,
        devices: 6,
        subscription: {
          tier: 'basic',
          status: 'active',
          expiryDate: '2024-08-01',
        },
        profile: {
          phone: '+966512345678',
          avatar: null,
          verified: false,
          farmName: 'Desert Bloom Farm',
          farmType: 'greenhouse',
          certifications: ['HACCP'],
        },
        deviceStatus: {
          online: 4,
          offline: 2,
          maintenance: 0,
          lastUpdate: '2024-02-10T16:40:00Z',
        },
        recentActivity: [
          {
            id: '1',
            type: 'profile_updated',
            description: 'Updated farm profile information',
            timestamp: '2024-02-10T16:30:00Z',
          },
        ],
      },
    ];

    setFarmers(mockFarmers);
    setLoading(false);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...farmers];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        farmer =>
          farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          farmer.profile?.farmName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(farmer => farmer.status === statusFilter);
    }

    // Apply location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(farmer => farmer.location.includes(locationFilter));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle nested properties
      if (sortField === 'revenue') {
        aValue = a.revenue || 0;
        bValue = b.revenue || 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    setFilteredFarmers(filtered);
    setCurrentPage(1);
  }, [farmers, searchQuery, statusFilter, locationFilter, sortField, sortDirection]);

  const handleSort = (field: keyof AdminUser) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof AdminUser) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

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

  // Pagination
  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFarmers = filteredFarmers.slice(startIndex, endIndex);

  const locations = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('searchFarmers')}
              className="w-full ps-10 pe-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t('allStatuses')}</option>
              <option value="active">{t('active')}</option>
              <option value="inactive">{t('inactive')}</option>
              <option value="suspended">{t('suspended')}</option>
              <option value="pending">{t('pending')}</option>
            </select>

            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t('allLocations')}</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  {t('name')}
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  {t('status')}
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('location')}
              </th>
              <th
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('farmSites')}
              >
                <div className="flex items-center gap-2">
                  {t('farmSites')}
                  {getSortIcon('farmSites')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center gap-2">
                  {t('revenue')}
                  {getSortIcon('revenue')}
                </div>
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('devices')}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentFarmers.map(farmer => (
              <tr key={farmer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-700">
                        {farmer.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {farmer.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate" dir="ltr">
                        {farmer.email}
                      </div>
                      {farmer.profile?.farmName && (
                        <div className="text-xs text-gray-400 truncate">
                          {farmer.profile.farmName}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(farmer.status)}`}
                    >
                      {t(farmer.status)}
                    </span>
                    {farmer.profile?.verified && (
                      <span className="inline-flex items-center text-xs text-green-600">
                        ✓ {t('verified')}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-900">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{farmer.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatNumber(farmer.farmSites || 0)}</span>
                    <span className="text-xs text-gray-500">{t('sites')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(farmer.revenue || 0)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatNumber(farmer.totalOrders || 0)} {t('ordersCount')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Wifi className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {farmer.deviceStatus?.online || 0}
                      </span>
                    </div>
                    {(farmer.deviceStatus?.offline || 0) > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-sm text-red-600">{farmer.deviceStatus?.offline}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onUserSelect(farmer)}
                    className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    aria-label={t('viewUserDetails')}
                  >
                    <Eye className="w-4 h-4" />
                    {t('view')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {t('showing')} {startIndex + 1} {t('to')} {Math.min(endIndex, filteredFarmers.length)}{' '}
          {t('of')} {formatNumber(filteredFarmers.length)} {t('entries')}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <span className="rtl:rotate-180">←</span>
            {t('previous')}
          </button>

          <span className="px-3 py-1 text-sm text-gray-700">
            {t('page')} {currentPage} {t('of')} {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {t('next')}
            <span className="rtl:rotate-180">→</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredFarmers.length === 0 && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 text-gray-400 mx-auto mb-4 flex items-center justify-center">
              <Sprout className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noFarmersFound')}</h3>
            <p className="text-gray-500">{t('adjustSearchCriteria')}</p>
          </div>
        </div>
      )}
    </div>
  );
};
