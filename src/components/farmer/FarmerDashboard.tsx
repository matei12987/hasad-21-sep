import React from 'react';

export const FarmerDashboard: React.FC = () => {
  const crops = [
    {
      id: '1',
      name: 'Lettuce',
      image: '🥬',
      status: 'Harvest Ready',
      progress: 100,
      daysToHarvest: 0,
      yield: '30 kg',
    },
    {
      id: '2',
      name: 'Tomatoes',
      image: '🍅',
      status: 'Growing',
      progress: 75,
      daysToHarvest: 12,
      yield: '45 kg',
    },
    {
      id: '3',
      name: 'Carrots',
      image: '🥕',
      status: 'Planted',
      progress: 40,
      daysToHarvest: 35,
      yield: '25 kg',
    },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$2,450', change: '+12%', icon: '💰' },
    { label: 'Active Orders', value: '8', change: '+3', icon: '📦' },
    { label: 'Crops Ready', value: '3', change: '+1', icon: '🌱' },
    { label: 'Customer Rating', value: '4.8', change: '+0.2', icon: '⭐' },
  ];

  const recentOrders = [
    {
      id: '#1234',
      customer: 'Emma Johnson',
      product: 'Fresh Lettuce',
      quantity: '5 lbs',
      status: 'Delivered',
      amount: '$19.95',
    },
    {
      id: '#1235',
      customer: 'Mike Chen',
      product: 'Organic Tomatoes',
      quantity: '3 lbs',
      status: 'Shipped',
      amount: '$13.50',
    },
    {
      id: '#1236',
      customer: 'Sarah Wilson',
      product: 'Sweet Corn',
      quantity: '8 lbs',
      status: 'Processing',
      amount: '$23.92',
    },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="heading-lg mb-2">Farm Dashboard 📊</h1>
        <p className="body-md text-gray-600">Monitor your farm's performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`body-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="body-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Crop Status */}
      <div className="mb-6">
        <h2 className="heading-md mb-4">Crop Status 🌱</h2>
        <div className="space-y-3">
          {crops.map(crop => (
            <div key={crop.id} className="card">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{crop.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="heading-sm">{crop.name}</h3>
                    <span
                      className={`status-indicator ${
                        crop.status === 'Harvest Ready'
                          ? 'status-success'
                          : crop.status === 'Growing'
                            ? 'status-info'
                            : 'status-warning'
                      }`}
                    >
                      {crop.status === 'Harvest Ready'
                        ? '✅'
                        : crop.status === 'Growing'
                          ? '🌱'
                          : '🌰'}{' '}
                      {crop.status}
                    </span>
                  </div>

                  <div className="progress-bar mb-2">
                    <div className="progress-fill" style={{ width: `${crop.progress}%` }} />
                  </div>

                  <div className="flex justify-between body-sm text-gray-600">
                    <span>
                      {crop.daysToHarvest === 0
                        ? 'Ready to harvest'
                        : `${crop.daysToHarvest} days to harvest`}
                    </span>
                    <span>Est. yield: {crop.yield}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-6">
        <h2 className="heading-md mb-4">Recent Orders 📦</h2>
        <div className="space-y-3">
          {recentOrders.map(order => (
            <div key={order.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="heading-sm">{order.id}</h3>
                  <p className="body-sm text-gray-600">{order.customer}</p>
                </div>
                <span
                  className={`status-indicator ${
                    order.status === 'Delivered'
                      ? 'status-success'
                      : order.status === 'Shipped'
                        ? 'status-info'
                        : 'status-warning'
                  }`}
                >
                  {order.status === 'Delivered' ? '✅' : order.status === 'Shipped' ? '🚚' : '⏳'}{' '}
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="body-md font-medium">{order.product}</p>
                  <p className="body-sm text-gray-600">{order.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="heading-sm text-green-600">{order.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="btn btn-primary">🌱 Add New Crop</button>
        <button className="btn btn-outline">📊 View Analytics</button>
      </div>
    </div>
  );
};
