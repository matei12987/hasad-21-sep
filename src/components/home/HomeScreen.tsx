import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';
import { ActivityDetailModal } from './ActivityDetailModal';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { formatCurrency } = useSettings();
  const [selectedActivity, setSelectedActivity] = React.useState<any>(null);
  const [showActivityModal, setShowActivityModal] = React.useState(false);

  const quickActions =
    user?.type === 'farmer'
      ? [
          {
            icon: '📊',
            title: t('dashboard'),
            subtitle: t('realTimeMonitoring'),
            action: 'farmer-dashboard',
          },
          {
            icon: '🔧',
            title: t('iotControls'),
            subtitle: t('deviceManagement'),
            action: 'iot-controls',
          },
          {
            icon: '🌱',
            title: t('cropManagement'),
            subtitle: t('trackGrowth'),
            action: 'crop-management',
          },
          {
            icon: '📋',
            title: t('tasks'),
            subtitle: t('maintenanceSchedule'),
            action: 'tasks-maintenance',
          },
          {
            icon: '📈',
            title: t('analytics'),
            subtitle: t('performanceReports'),
            action: 'analytics',
          },
          {
            icon: '🛒',
            title: t('hasadMarketplace'),
            subtitle: t('sellProducts'),
            action: 'add-product',
          },
        ]
      : [
          {
            icon: '🛒',
            title: t('hasadMarketplace'),
            subtitle: t('freshProduce'),
            action: 'marketplace',
          },
          { icon: '📦', title: t('plans'), subtitle: t('deliveryPlans'), action: 'subscriptions' },
          { icon: '🛍️', title: t('cart'), subtitle: t('yourItems'), action: 'cart' },
          { icon: '📋', title: t('orders'), subtitle: t('orderHistory'), action: 'orders' },
          { icon: '💬', title: t('messages'), subtitle: t('chatWithFarmers'), action: 'messages' },
          { icon: '📈', title: t('analytics'), subtitle: t('yourInsights'), action: 'analytics' },
        ];

  const recentActivity =
    user?.type === 'farmer'
      ? [
          {
            id: 'order_1234',
            type: 'order',
            icon: '✅',
            title: t('orderCompleted', { orderId: '#1234' }),
            time: t('hoursAgo', { count: 2 }),
            status: 'success',
            details: {
              orderId: '#1234',
              referenceNumber: 'REF-2024-001234',
              customer: {
                name: 'Emma Johnson',
                email: 'emma.johnson@email.com',
                phone: '+966501234567',
                address: '123 King Fahd Road, Riyadh 12345',
              },
              orderStatus: 'delivered',
              location: 'Customer Address',
              deliveryDate: '2024-02-12T14:30:00Z',
              items: [
                { name: 'freshLettuce', quantity: 5, price: 19.95 },
                { name: 'organicTomatoes', quantity: 2, price: 9.0 },
              ],
              totalAmount: 28.95,
              paymentMethod: 'Credit Card',
              deliveryMethod: 'Home Delivery',
            },
          },
          {
            id: 'order_1235',
            type: 'order',
            icon: '📦',
            title: t('newOrderReceived'),
            time: t('hoursAgo', { count: 4 }),
            status: 'info',
            details: {
              orderId: '#1235',
              referenceNumber: 'REF-2024-001235',
              customer: {
                name: 'Ahmed Al-Rashid',
                email: 'ahmed.rashid@email.com',
                phone: '+966509876543',
                address: '456 Olaya Street, Riyadh 11564',
              },
              orderStatus: 'processing',
              location: 'Farm - Preparation Area',
              estimatedDelivery: '2024-02-13T16:00:00Z',
              items: [
                { name: 'cherryTomatoes', quantity: 3, price: 28.5 },
                { name: 'freshBasil', quantity: 2, price: 12.0 },
              ],
              totalAmount: 40.5,
              paymentMethod: 'Cash on Delivery',
              deliveryMethod: 'Home Delivery',
            },
          },
          {
            id: 'crop_lettuce_001',
            type: 'crop',
            icon: '🌱',
            title: t('lettuceHarvestReady'),
            time: t('dayAgo'),
            status: 'warning',
            details: {
              plantId: 'LETTUCE-001',
              cropName: 'Butterhead Lettuce',
              variety: 'Boston Bibb',
              growthStage: 'Harvest Ready',
              healthStatus: 92,
              location: {
                farm: 'Green Valley Rooftop Farm',
                section: 'Section A',
                row: 'Row 3',
                coordinates: 'A3-15',
              },
              plantedDate: '2024-01-15',
              expectedHarvest: '2024-02-12',
              actualHarvest: null,
              careHistory: [
                { date: '2024-02-10', action: 'Nutrient adjustment', worker: 'Farmer John' },
                { date: '2024-02-08', action: 'pH monitoring', worker: 'Farmer John' },
                { date: '2024-02-05', action: 'Pruning', worker: 'Assistant Ali' },
              ],
              environmentalData: {
                temperature: 24.5,
                humidity: 65,
                ph: 6.2,
                ec: 1.8,
                lightHours: 14,
              },
              estimatedYield: '2.5 kg',
              qualityGrade: 'Premium',
            },
          },
        ]
      : [
          {
            id: 'delivery_001',
            type: 'order',
            icon: '🚚',
            title: t('orderDelivered'),
            time: t('hourAgo'),
            status: 'success',
            details: {
              orderId: '#1234',
              referenceNumber: 'REF-2024-001234',
              farmer: {
                name: 'Green Valley Farm',
                contact: '+966501234567',
                location: 'Riyadh Agricultural District',
              },
              orderStatus: 'delivered',
              deliveryDate: '2024-02-12T14:30:00Z',
              items: [
                { name: 'Fresh Lettuce', quantity: 2, price: 15.98 },
                { name: 'Hydroponic Tomatoes', quantity: 1, price: 18.5 },
              ],
              totalAmount: 34.48,
              deliveryAddress: '123 King Fahd Road, Riyadh 12345',
              deliveryNotes: 'Left at front door as requested',
            },
          },
          {
            id: 'shipment_002',
            type: 'order',
            icon: '📦',
            title: t('orderShipped'),
            time: t('daysAgo', { count: 2 }),
            status: 'info',
            details: {
              orderId: '#1235',
              referenceNumber: 'REF-2024-001235',
              farmer: {
                name: 'Sunny Acres',
                contact: '+966509876543',
                location: 'Jeddah Hydroponic Farms',
              },
              orderStatus: 'shipped',
              trackingNumber: 'TRK-789456123',
              estimatedDelivery: '2024-02-14T16:00:00Z',
              items: [{ name: 'Sweet Corn', quantity: 3, price: 12.97 }],
              totalAmount: 12.97,
              deliveryAddress: '456 Olaya Street, Riyadh 11564',
            },
          },
          {
            id: 'payment_003',
            type: 'order',
            icon: '💰',
            title: t('paymentProcessed'),
            time: t('daysAgo', { count: 3 }),
            status: 'success',
            details: {
              orderId: '#1236',
              referenceNumber: 'REF-2024-001236',
              paymentId: 'PAY-456789',
              amount: 45.75,
              paymentMethod: 'Credit Card (**** 1234)',
              transactionDate: '2024-02-09T10:15:00Z',
              farmer: {
                name: 'Harvest Hills',
                contact: '+966512345678',
              },
              items: [
                { name: 'freshApples', quantity: 2, price: 15.5 },
                { name: 'organicCarrots', quantity: 3, price: 15.25 },
              ],
            },
          },
        ];

  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const handleCloseModal = () => {
    setShowActivityModal(false);
    setSelectedActivity(null);
  };
  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="heading-lg">
              {t('goodMorning')}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="body-md text-gray-600">{t('appSlogan')}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-xl">{user?.avatar}</span>
          </div>
        </div>

        {/* Weather Widget */}
        <div
          className="card"
          style={{ background: 'linear-gradient(135deg, #4a7c59 0%, #6b9b7a 100%)' }}
        >
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-90">{t('todaysWeather')}</p>
              <p className="text-2xl font-bold">22°C</p>
              <p className="text-sm opacity-90">{t('partlyCloudy')}</p>
            </div>
            <div className="text-4xl">⛅</div>
          </div>
          {user?.type === 'farmer' && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between text-white text-sm">
                <span>{t('humidity')}: 65%</span>
                <span>{t('uvIndex')}: 6</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="heading-md mb-4">{t('quickActions')}</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <div key={index} className="card card-hover">
              <div className="text-center">
                <div className="text-3xl mb-2">{action.icon}</div>
                <h3 className="heading-sm mb-1">{action.title}</h3>
                <p className="body-sm text-gray-600">{action.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Stats - Farmer Only */}
      {user?.type === 'farmer' ? (
        <div className="mb-6">
          <h2 className="heading-md mb-4">{t('farmOverview')}</h2>
          <div className="space-y-3">
            {/* Revenue Widget - Full Width */}
            <div className="card text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$2,450</div>
              <p className="body-sm text-gray-600">{t('thisMonth')}</p>
            </div>
            
            {/* Bottom Row - Two Widgets Side by Side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <p className="body-sm text-gray-600">{t('pendingOrders')}</p>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <p className="body-sm text-gray-600">{t('activeCrops')}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="heading-md mb-4">{t('featuredProducts')}</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              {
                name: 'freshLettuce',
                price: 15.99,
                unit: t('kg'),
                image: '🥬',
                farmer: t('greenValleyFarm'),
              },
              {
                name: 'organicTomatoes',
                price: 18.5,
                unit: t('kg'),
                image: '🍅',
                farmer: t('sunnyOrganicFarm'),
              },
              {
                name: 'sweetCorn',
                price: 12.99,
                unit: t('kg'),
                image: '🌽',
                farmer: t('harvestHills'),
              },
            ].map((product, index) => (
              <div key={index} className="card card-hover min-w-[140px]">
                <div className="text-center">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <h3 className="heading-sm mb-1">{t(product.name)}</h3>
                  <p className="body-sm text-green-600 font-medium">
                    {formatCurrency(product.price)}/{product.unit}
                  </p>
                  <p className="body-sm text-gray-500">{product.farmer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="mb-6">
        <h2 className="heading-md mb-4">{t('recentActivity')}</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className="card card-hover cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => handleActivityClick(activity)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleActivityClick(activity);
                }
              }}
              aria-label={`View details for ${activity.title}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'success'
                      ? 'bg-green-100'
                      : activity.status === 'info'
                        ? 'bg-blue-100'
                        : 'bg-orange-100'
                  }`}
                >
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="body-md font-medium truncate">{activity.title}</p>
                  <p className="body-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <span className="text-lg">›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Detail Modal */}
      {showActivityModal && selectedActivity && (
        <ActivityDetailModal activity={selectedActivity} onClose={handleCloseModal} />
      )}
    </div>
  );
};