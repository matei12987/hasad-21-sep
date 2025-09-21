import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { formatI18nCurrency, formatI18nNumber } from '../../i18n';

export const CartScreen: React.FC = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Implement checkout logic
    alert('Checkout functionality would be implemented here');
  };

  if (items.length === 0) {
    return (
      <div className="p-4" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <h1 className="heading-lg mb-6">{t('shoppingCart')} 🛍️</h1>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="heading-md mb-2">{t('cartEmpty')}</h3>
          <p className="body-md text-gray-600 mb-6">{t('startShopping')}</p>
          <button className="btn btn-primary">
            {t('continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="heading-lg">{t('shoppingCart')} 🛍️</h1>
        <button
          onClick={clearCart}
          className="btn btn-outline btn-sm"
        >
          {t('clearCart')}
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="card" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <div className="text-3xl">{item.image}</div>
              
              {/* Product Info */}
              <div className="flex-1">
                <h3 className="heading-sm mb-1 break-words">{item.name}</h3>
                <p className="body-sm text-gray-600 mb-2 break-words">{item.farmer}</p>
                <p className="text-lg font-bold text-green-600" dir="ltr">
                  {formatI18nCurrency(item.price)} / {t(item.unit)}
                </p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 flex-row-reverse-rtl">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 rtl:scale-x-flip-rtl"
                >
                  <span className="rtl:scale-x-flip-rtl">-</span>
                </button>
                <span className="w-8 text-center font-medium" dir="ltr">{formatI18nNumber(item.quantity)}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 rtl:scale-x-flip-rtl"
                >
                  <span className="rtl:scale-x-flip-rtl">+</span>
                </button>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
                title={t('remove')}
              >
                🗑️
              </button>
            </div>
            
            {/* Item Total */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-start">
              <span className="body-md text-gray-600">{t('subtotal')}:</span>
              <span className="heading-sm text-green-600" dir="ltr">
                {formatI18nCurrency(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, #f8faf9 0%, #e8f5e8 100%)' }}>
        <h3 className="heading-md mb-4">{t('cartSummary')}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-start">
            <span className="body-md">{t('subtotal')}:</span>
            <span className="body-md font-medium" dir="ltr">{formatI18nCurrency(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between text-start">
            <span className="body-md">{t('deliveryFee')}:</span>
            <span className="body-md font-medium" dir="ltr">{formatI18nCurrency(4.99)}</span>
          </div>
          <div className="flex justify-between text-start">
            <span className="body-md">{t('tax')}:</span>
            <span className="body-md font-medium" dir="ltr">{formatI18nCurrency(getTotalPrice() * 0.08)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between text-start">
              <span className="heading-sm">{t('total')}:</span>
              <span className="heading-sm text-green-600" dir="ltr">
                {formatI18nCurrency(getTotalPrice() + 4.99 + (getTotalPrice() * 0.08))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="btn btn-primary w-full btn-lg"
      >
        {t('checkout')} 💳
      </button>

      {/* Delivery Info */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2 text-start">
          <span className="text-blue-600 rtl:scale-x-flip-rtl">🚚</span>
          <span className="body-md font-medium text-blue-800">
            {t('freeDeliveryOver')} <span dir="ltr">{formatI18nCurrency(50)}</span>
          </span>
        </div>
        <p className="body-sm text-blue-600 text-start">
          {t('estimatedDelivery')}: <span dir="ltr">{t('tomorrowTwoPm')}</span>
        </p>
      </div>
    </div>
  );
};