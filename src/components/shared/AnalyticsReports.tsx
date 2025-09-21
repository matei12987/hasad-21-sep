import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Download,
  Calendar,
  Filter,
  Eye,
  Share,
} from 'lucide-react';
import { Analytics } from '../../types';

interface AnalyticsReportsProps {
  userRole: 'farmer' | 'consumer' | 'admin';
}

export const AnalyticsReports: React.FC<AnalyticsReportsProps> = ({ userRole }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>(
    'monthly'
  );
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockAnalytics: Analytics = {
      period: selectedPeriod,
      date_range: {
        start: '2024-01-01',
        end: '2024-02-12',
      },
      metrics: {
        // Revenue metrics
        mrr: 45250.0,
        total_revenue: 89750.0,
        average_order_value: 127.5,

        // Product metrics
        products_sold: 1250,
        top_selling_products: [
          { product_id: '1', name: 'Fresh Lettuce', quantity_sold: 245, revenue: 3920.0 },
          { product_id: '2', name: 'Cherry Tomatoes', quantity_sold: 189, revenue: 5386.5 },
          { product_id: '3', name: 'Fresh Basil', quantity_sold: 156, revenue: 1872.0 },
          { product_id: '4', name: 'Strawberries', quantity_sold: 98, revenue: 4410.0 },
        ],

        // Customer metrics
        new_customers: 127,
        returning_customers: 456,
        customer_acquisition_cost: 45.5,
        customer_lifetime_value: 890.0,
        churn_rate: 5.2,

        // Engagement metrics
        active_users: 2340,
        page_views: 15670,
        session_duration: 8.5,
        bounce_rate: 23.4,

        // Conversion metrics
        conversion_rate: 3.8,
        cart_abandonment_rate: 28.5,

        // Referral metrics
        referral_count: 89,
        referral_conversion_rate: 12.4,
      },
    };

    setAnalytics(mockAnalytics);
    setLoading(false);
  }, [selectedPeriod]);

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getMetricColor = (value: number, type: 'positive' | 'negative' = 'positive') => {
    if (type === 'positive') {
      return value > 0 ? 'text-green-600' : 'text-red-600';
    } else {
      return value < 0 ? 'text-green-600' : 'text-red-600';
    }
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Implement export functionality
    console.log(`Exporting report as ${format}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-green-600" />
            Analytics & Reports
          </h2>

          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => exportReport('pdf')}
                className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button
                onClick={() => exportReport('excel')}
                className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Excel
              </button>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Period: {new Date(analytics.date_range.start).toLocaleDateString()} -{' '}
          {new Date(analytics.date_range.end).toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+12.5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {formatCurrency(analytics.metrics.total_revenue)}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">+8.3%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {analytics.metrics.products_sold.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Products Sold</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">+15.7%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {analytics.metrics.new_customers}
          </div>
          <div className="text-sm text-gray-600">New Customers</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <span className="text-xs text-orange-600 font-medium">+2.1%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {formatPercentage(analytics.metrics.conversion_rate)}
          </div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Revenue Chart Placeholder */}
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Revenue Chart</p>
                <p className="text-sm text-gray-500">Interactive chart would be displayed here</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Monthly Recurring Revenue</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(analytics.metrics.mrr)}
              </div>
              <div className="text-xs text-green-600 mt-1">↑ 18.5% vs last month</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Average Order Value</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(analytics.metrics.average_order_value)}
              </div>
              <div className="text-xs text-blue-600 mt-1">↑ 5.2% vs last month</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Customer Lifetime Value</div>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(analytics.metrics.customer_lifetime_value)}
              </div>
              <div className="text-xs text-purple-600 mt-1">↑ 12.8% vs last month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>

        <div className="space-y-3">
          {analytics.metrics.top_selling_products.map(product => (
            <div
              key={product.product_id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg min-w-0"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600 shrink-0">
                  {product.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-600 truncate">
                    {product.quantity_sold} units sold
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-green-600">{formatCurrency(product.revenue)}</div>
                <div className="text-sm text-gray-500">Revenue</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Metrics</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">New Customers</span>
              <span className="text-lg font-bold text-blue-600">
                {analytics.metrics.new_customers}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Returning Customers</span>
              <span className="text-lg font-bold text-green-600">
                {analytics.metrics.returning_customers}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Customer Acquisition Cost</span>
              <span className="text-lg font-bold text-purple-600">
                {formatCurrency(analytics.metrics.customer_acquisition_cost)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Churn Rate</span>
              <span className="text-lg font-bold text-red-600">
                {formatPercentage(analytics.metrics.churn_rate)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Active Users</span>
              <span className="text-lg font-bold text-indigo-600">
                {analytics.metrics.active_users.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Page Views</span>
              <span className="text-lg font-bold text-teal-600">
                {analytics.metrics.page_views.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Avg Session Duration</span>
              <span className="text-lg font-bold text-orange-600">
                {analytics.metrics.session_duration.toFixed(1)} min
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Bounce Rate</span>
              <span className="text-lg font-bold text-yellow-600">
                {formatPercentage(analytics.metrics.bounce_rate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion & Performance */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion & Performance</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {formatPercentage(analytics.metrics.conversion_rate)}
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
            <div className="text-xs text-green-600 mt-1">↑ 0.8%</div>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {formatPercentage(analytics.metrics.cart_abandonment_rate)}
            </div>
            <div className="text-sm text-gray-600">Cart Abandonment</div>
            <div className="text-xs text-red-600 mt-1">↓ 2.1%</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {analytics.metrics.referral_count}
            </div>
            <div className="text-sm text-gray-600">Referrals</div>
            <div className="text-xs text-blue-600 mt-1">↑ 15.3%</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {formatPercentage(analytics.metrics.referral_conversion_rate)}
            </div>
            <div className="text-sm text-gray-600">Referral Conversion</div>
            <div className="text-xs text-purple-600 mt-1">↑ 3.2%</div>
          </div>
        </div>
      </div>

      {/* ESG Impact Report (for farmers) */}
      {userRole === 'farmer' && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ESG Impact Report</h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">2,450 kg</div>
              <div className="text-sm text-gray-600">CO₂ Offset</div>
              <div className="text-xs text-green-600 mt-1">↑ 18% vs last month</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">15,670 L</div>
              <div className="text-sm text-gray-600">Water Saved</div>
              <div className="text-xs text-blue-600 mt-1">↑ 12% vs last month</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">8,920 km</div>
              <div className="text-sm text-gray-600">Food Miles Saved</div>
              <div className="text-xs text-purple-600 mt-1">↑ 25% vs last month</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-1">98.5%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
              <div className="text-xs text-orange-600 mt-1">↑ 1.2% vs last month</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
