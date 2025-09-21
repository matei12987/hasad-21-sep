import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const MessagesScreen: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const conversations =
    user?.type === 'farmer'
      ? [
          {
            id: '1',
            name: 'Emma Johnson',
            avatar: '👩‍💼',
            lastMessage: 'Is the lettuce still available?',
            time: '2 min ago',
            unread: 2,
            online: true,
          },
          {
            id: '2',
            name: 'Mike Chen',
            avatar: '👨‍💻',
            lastMessage: 'Thank you for the fresh tomatoes!',
            time: '1 hour ago',
            unread: 0,
            online: false,
          },
          {
            id: '3',
            name: 'Sarah Wilson',
            avatar: '👩‍🎨',
            lastMessage: 'When will the corn be ready?',
            time: '3 hours ago',
            unread: 1,
            online: true,
          },
        ]
      : [
          {
            id: '1',
            name: 'Green Valley Farm',
            avatar: '👨‍🌾',
            lastMessage: 'Your order has been shipped!',
            time: '30 min ago',
            unread: 1,
            online: true,
          },
          {
            id: '2',
            name: 'Sunny Acres',
            avatar: '🌻',
            lastMessage: 'We have fresh strawberries available',
            time: '2 hours ago',
            unread: 0,
            online: false,
          },
          {
            id: '3',
            name: 'Harvest Hills',
            avatar: '🏔️',
            lastMessage: 'Thanks for your order!',
            time: '1 day ago',
            unread: 0,
            online: false,
          },
        ];

  const messages = [
    {
      id: '1',
      sender: 'other',
      message: 'Hi! Is the lettuce still available?',
      time: '10:30 AM',
      avatar: '👩‍💼',
    },
    {
      id: '2',
      sender: 'me',
      message: 'Yes, we have fresh lettuce available! How much do you need?',
      time: '10:32 AM',
      avatar: '👨‍🌾',
    },
    {
      id: '3',
      sender: 'other',
      message: 'I need about 5 pounds. Can you deliver today?',
      time: '10:35 AM',
      avatar: '👩‍💼',
    },
    {
      id: '4',
      sender: 'me',
      message: 'Absolutely! I can deliver this afternoon. The total would be $19.95.',
      time: '10:37 AM',
      avatar: '👨‍🌾',
    },
  ];

  if (selectedChat) {
    return (
      <div className="flex flex-col h-screen">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedChat(null)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg">👩‍💼</span>
            </div>
            <div className="flex-1">
              <h3 className="heading-sm">Emma Johnson</h3>
              <p className="body-sm text-green-600">● Online</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">📞</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'me' ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{message.avatar}</span>
              </div>
              <div className={`max-w-[70%] ${message.sender === 'me' ? 'text-right' : ''}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="body-md">{message.message}</p>
                </div>
                <p className="body-sm text-gray-500 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
            />
            <button className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700">
              ➤
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="heading-lg mb-2">Messages 💬</h1>
        <p className="body-md text-gray-600">
          {user?.type === 'farmer' ? 'Chat with your customers' : 'Chat with farmers'}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input type="text" placeholder="Search conversations..." className="form-input pl-10" />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {conversations.map(conversation => (
          <div
            key={conversation.id}
            onClick={() => setSelectedChat(conversation.id)}
            className="card card-hover"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">{conversation.avatar}</span>
                </div>
                {conversation.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="heading-sm truncate">{conversation.name}</h3>
                  <span className="body-sm text-gray-500">{conversation.time}</span>
                </div>
                <p className="body-sm text-gray-600 truncate">{conversation.lastMessage}</p>
              </div>

              {conversation.unread > 0 && (
                <div className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {conversation.unread}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="heading-md mb-2">No conversations yet</h3>
          <p className="body-md text-gray-600">
            {user?.type === 'farmer'
              ? 'Customers will message you about your products'
              : 'Start shopping to connect with farmers'}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="fixed bottom-24 right-4">
        <button className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700">
          ✏️
        </button>
      </div>
    </div>
  );
};
