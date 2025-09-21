import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatNumber } from '../../i18n';
import { useSettings } from '../../contexts/SettingsContext';
import { AdminUser } from '../../types/admin';
import { Search, Filter, Eye, ChevronUp, ChevronDown, MapPin, ShoppingCart } from 'lucide-react';

interface AdminConsumersTabProps {
  onUserSelect: (user: AdminUser) => void;
}

export const AdminConsumersTab: React.FC<AdminConsumersTabProps> = ({ onUserSelect }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const [consumers, setConsumers] = useState<AdminUser[]>([]);
  const [filteredConsumers, setFilteredConsumers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof AdminUser>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockConsumers: AdminUser[] = [
      {
        id: '1',
        name: 'Sarah Al-Mahmoud',
        email: 'sarah.mahmoud@email.com',
        role: 'consumer',
        status: 'active',
        location: 'Riyadh, Saudi Arabia',
        joinDate: '2023-12-10',
        lastActive: '2024-02-12T15:20:00Z',
        totalOrders: 45,
        revenue: 2340.5,
        subscription: {
          tier: 'premium',
          status: 'active',
          expiryDate: '2024-12-10',
        },
        profile: {
          phone: '+966501234567',
          avatar: null,
          verified: true,
          preferences: {
            organic_only: true,
            delivery_window: 'morning',
            dietary_restrictions: ['vegetarian'],
          },
        },
        recentActivity: [
          {
            id: '1',
            type: 'order_placed',
            description: 'Placed order #5678',
            timestamp: '2024-02-12T14:30:00Z',
          },
          {
            id: '2',
            type: 'subscription_renewed',
            description: 'Renewed premium subscription',
            timestamp: '2024-02-10T09:15:00Z',
          },
        ],
      },
      {
        id: '2',
        name: 'Omar Al-Faisal',
        email: 'omar.faisal@email.com',
        role: 'consumer',
        status: 'active',
        location: 'Jeddah, Saudi Arabia',
        joinDate: '2024-01-05',
        lastActive: '2024-02-12T11:45:00Z',
        totalOrders: 23,
        revenue: 1567.25,
        subscription: {
          tier: 'basic',
          status: 'active',
          expiryDate: '2024-07-05',
        },
        profile: {
          phone: '+966509876543',
          avatar: null,
          verified: true,
          preferences: {
            organic_only: false,
            delivery_window: 'evening',
            dietary_restrictions: [],
          },
        },
        recentActivity: [
          {
            id: '1',
            type: 'order_delivered',
            description: 'Order #5677 delivered successfully',
            timestamp: '2024-02-11T16:20:00Z',
          },
        ],
      },
      {
        id: '3',
        name: 'Layla Al-Harbi',
        email: 'layla.harbi@email.com',
        role: 'consumer',
        status: 'inactive',
        location: 'Dammam, Saudi Arabia',
        joinDate: '2023-08-15',
        lastActive: '2024-01-28T10:30:00Z',
        totalOrders: 67,
        revenue: 4230.75,
        subscription: {
          tier: 'enterprise',
          status: 'expired',
          expiryDate: '2024-01-15',
        },
        profile: {
          phone: '+966512345678',
          avatar: null,
          verified: true,
          preferences: {
            organic_only: true,
            delivery_window: 'afternoon',
            dietary_restrictions: ['gluten-free', 'vegan'],
          },
        },
        recentActivity: [
          {
            id: '1',
            type: 'subscription_expired',
            description: 'Enterprise subscription expired',
            timestamp: '2024-01-15T00:00:00Z',
          },
        ],
      },
    ];

    setConsumers(mockConsumers);
    setLoading(false);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...consumers];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        consumer =>
          consumer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          consumer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(consumer => consumer.status === statusFilter);
    }

    // Apply tier filter
    if (tierFilter !== 'all') {
      filtered = filtered.filter(consumer => consumer.subscription?.tier === tierFilter);
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

    setFilteredConsumers(filtered);
    setCurrentPage(1);
  }, [consumers, searchQuery, statusFilter, tierFilter, sortField, sortDirection]);

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
  const totalPages = Math.ceil(filteredConsumers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConsumers = filteredConsumers.slice(startIndex, endIndex);

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
              placeholder={t('searchConsumers')}
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
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t('allTiers')}</option>
              <option value="basic">{t('basic')}</option>
              <option value="premium">{t('premium')}</option>
              <option value="enterprise">{t('enterprise')}</option>
              <option value="trial">{t('trial')}</option>
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
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('subscription')}
              </th>
              <th
                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('totalOrders')}
              >
                <div className="flex items-center gap-2">
                  {t('totalOrders')}
                  {getSortIcon('totalOrders')}
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
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentConsumers.map(consumer => (
              <tr key={consumer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">
                        {consumer.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {consumer.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate" dir="ltr">
                        {consumer.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t('joinDate')}: {formatDate(consumer.joinDate)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consumer.status)}`}
                    >
                      {t(consumer.status)}
                    </span>
                    {consumer.profile?.verified && (
                      <span className="inline-flex items-center text-xs text-green-600">
                        ✓ {t('verified')}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-900">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{consumer.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(consumer.subscription?.tier || 'basic')}`}
                    >
                      {t(consumer.subscription?.tier || 'basic')}
                    </span>
                    <span
                      className={`text-xs ${
                        consumer.subscription?.status === 'active'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {t(consumer.subscription?.status || 'inactive')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {formatNumber(consumer.totalOrders || 0)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(consumer.revenue || 0)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onUserSelect(consumer)}
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
          {t('showing')} {startIndex + 1} {t('to')} {Math.min(endIndex, filteredConsumers.length)}{' '}
          {t('of')} {formatNumber(filteredConsumers.length)} {t('entries')}
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
      {filteredConsumers.length === 0 && !loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 text-gray-400 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noConsumersFound')}</h3>
            <p className="text-gray-500">{t('adjustSearchCriteria')}</p>
          </div>
        </div>
      )}
    </div>
  );
};
