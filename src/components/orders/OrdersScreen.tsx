import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const OrdersScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  const consumerOrders = [
    {
      id: '#1234',
      date: '2024-01-15',
      farmer: 'Green Valley Farm',
      items: [
        { name: 'Fresh Lettuce', quantity: 2, price: 3.99, image: '🥬' },
        { name: 'Organic Tomatoes', quantity: 1, price: 4.5, image: '🍅' },
      ],
      status: 'Delivered',
      total: 12.48,
      deliveryDate: '2024-01-16',
    },
    {
      id: '#1235',
      date: '2024-01-14',
      farmer: 'Sunny Acres',
      items: [{ name: 'Sweet Corn', quantity: 3, price: 2.99, image: '🌽' }],
      status: 'Shipped',
      total: 8.97,
      deliveryDate: '2024-01-17',
    },
    {
      id: '#1236',
      date: '2024-01-13',
      farmer: 'Harvest Hills',
      items: [
        { name: 'Fresh Apples', quantity: 2, price: 3.25, image: '🍎' },
        { name: 'Organic Carrots', quantity: 1, price: 2.75, image: '🥕' },
      ],
      status: 'Processing',
      total: 9.25,
      deliveryDate: '2024-01-18',
    },
  ];

  const farmerOrders = [
    {
      id: '#1234',
      date: '2024-01-15',
      customer: 'Emma Johnson',
      customerAvatar: '👩‍💼',
      items: [{ name: 'Fresh Lettuce', quantity: 5, price: 3.99, image: '🥬' }],
      status: 'Delivered',
      total: 19.95,
      deliveryDate: '2024-01-16',
    },
    {
      id: '#1235',
      date: '2024-01-14',
      customer: 'Mike Chen',
      customerAvatar: '👨‍💻',
      items: [{ name: 'Organic Tomatoes', quantity: 3, price: 4.5, image: '🍅' }],
      status: 'Shipped',
      total: 13.5,
      deliveryDate: '2024-01-17',
    },
    {
      id: '#1236',
      date: '2024-01-13',
      customer: 'Sarah Wilson',
      customerAvatar: '👩‍🎨',
      items: [{ name: 'Sweet Corn', quantity: 8, price: 2.99, image: '🌽' }],
      status: 'Processing',
      total: 23.92,
      deliveryDate: '2024-01-18',
    },
  ];

  const orders = user?.type === 'farmer' ? farmerOrders : consumerOrders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'status-success';
      case 'Shipped':
        return 'status-info';
      case 'Processing':
        return 'status-warning';
      default:
        return 'status-info';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return '✅';
      case 'Shipped':
        return '🚚';
      case 'Processing':
        return '⏳';
      default:
        return '📦';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') {
      return order.status !== 'Delivered';
    } else {
      return order.status === 'Delivered';
    }
  });

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="heading-lg mb-2">
          {user?.type === 'farmer' ? 'Customer Orders' : 'My Orders'} 📦
        </h1>
        <p className="body-md text-gray-600">
          {user?.type === 'farmer' ? 'Manage your customer orders' : 'Track your purchases'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active Orders
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="card">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="heading-sm">{order.id}</h3>
                <p className="body-sm text-gray-600">
                  {user?.type === 'farmer' ? order.customer : order.farmer}
                </p>
                <p className="body-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <span className={`status-indicator ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
                {user?.type === 'farmer' && (
                  <div className="mt-2">
                    <span className="text-2xl">{order.customerAvatar}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{item.image}</span>
                  <div className="flex-1">
                    <p className="body-md font-medium">{item.name}</p>
                    <p className="body-sm text-gray-600">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="body-md font-medium text-green-600">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="body-sm text-gray-600">
                  {order.status === 'Delivered' ? 'Delivered on' : 'Expected delivery'}
                </p>
                <p className="body-md font-medium">{order.deliveryDate}</p>
              </div>
              <div className="text-right">
                <p className="body-sm text-gray-600">Total</p>
                <p className="heading-sm text-green-600">${order.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              {user?.type === 'farmer' ? (
                <>
                  {order.status === 'Processing' && (
                    <button className="btn btn-primary btn-sm flex-1">Mark as Shipped</button>
                  )}
                  <button className="btn btn-outline btn-sm flex-1">Contact Customer</button>
                </>
              ) : (
                <>
                  {order.status !== 'Delivered' && (
                    <button className="btn btn-outline btn-sm flex-1">Track Order</button>
                  )}
                  <button className="btn btn-outline btn-sm flex-1">Contact Farmer</button>
                  {order.status === 'Delivered' && (
                    <button className="btn btn-primary btn-sm flex-1">Reorder</button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="heading-md mb-2">No orders found</h3>
          <p className="body-md text-gray-600">
            {activeTab === 'active'
              ? 'You have no active orders at the moment'
              : 'You have no completed orders yet'}
          </p>
        </div>
      )}
    </div>
  );
};
