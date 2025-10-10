import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';
import { formatI18nCurrency, formatI18nNumber } from '../../i18n';
import { ShoppingBag, Search, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  farmer: string;
  category: string;
  unit: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: number;
}

export const MarketplaceScreen: React.FC = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { addToCart } = useCart();
  const { items: cartItems, getTotalItems, getTotalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'all', nameKey: 'allCategories', icon: '🌾' },
    { id: 'vegetables', nameKey: 'vegetables', icon: '🥬' },
    { id: 'fruits', nameKey: 'fruits', icon: '🍎' },
    { id: 'herbs', nameKey: 'herbs', icon: '🌿' },
    { id: 'grains', nameKey: 'grains', icon: '🌾' },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'freshLettuce',
      price: 3.99,
      image: '🥬',
      farmer: 'Green Valley Farm',
      category: 'vegetables',
      unit: 'lb',
      description: 'Crisp, fresh lettuce grown organically',
      rating: 4.8,
      reviews: 124,
      inStock: 50,
    },
    {
      id: '2',
      name: 'organicTomatoes',
      price: 4.5,
      image: '🍅',
      farmer: 'Sunny Acres',
      category: 'vegetables',
      unit: 'lb',
      description: 'Vine-ripened hydroponic tomatoes',
      rating: 4.9,
      reviews: 89,
      inStock: 30,
    },
    {
      id: '3',
      name: 'sweetCorn',
      price: 2.99,
      image: '🌽',
      farmer: 'Harvest Hills',
      category: 'vegetables',
      unit: 'lb',
      description: 'Sweet, tender corn on the cob',
      rating: 4.7,
      reviews: 156,
      inStock: 75,
    },
    {
      id: '4',
      name: 'freshApples',
      price: 3.25,
      image: '🍎',
      farmer: 'Orchard View',
      category: 'fruits',
      unit: 'lb',
      description: 'Crisp, sweet apples perfect for snacking',
      rating: 4.6,
      reviews: 203,
      inStock: 100,
    },
    {
      id: '5',
      name: 'organicCarrots',
      price: 2.75,
      image: '🥕',
      farmer: 'Earth Grown',
      category: 'vegetables',
      unit: 'lb',
      description: 'Fresh, crunchy hydroponic carrots',
      rating: 4.8,
      reviews: 67,
      inStock: 40,
    },
    {
      id: '6',
      name: 'freshBasil',
      price: 1.99,
      image: '🌿',
      farmer: 'Herb Garden Co.',
      category: 'herbs',
      unit: 'bunch',
      description: 'Aromatic fresh basil leaves',
      rating: 4.9,
      reviews: 45,
      inStock: 25,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // You could add a toast notification here
  };

  return (
    <div className="p-4" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t('hasadMarketplace')}</h2>
        <p className="text-sm text-gray-600 mb-4">{t('appSlogan')}</p>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchProducts')}
            className="w-full ps-10 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{t(category.nameKey)}</span>
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="newest">{t('newest')}</option>
            <option value="price_low">{t('priceAscending')}</option>
            <option value="price_high">{t('priceDescending')}</option>
            <option value="rating">{t('ratingHighest')}</option>
          </select>

          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {t('filters')}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="card card-hover"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">{product.image}</div>
              <h3 className="heading-sm mb-1 break-words">{t(product.name)}</h3>
              <p className="body-sm text-gray-600 mb-2 break-words">{product.farmer}</p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-yellow-400">⭐</span>
                <span className="body-sm font-medium" dir="ltr">
                  {formatI18nNumber(product.rating)}
                </span>
                <span className="body-sm text-gray-500" dir="ltr">
                  ({formatI18nNumber(product.reviews)})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-green-600" dir="ltr">
                  {formatI18nCurrency(product.price)}
                </span>
                <span className="body-sm text-gray-500">/{t(product.unit)}</span>
              </div>

              {/* Stock Status */}
              <div className="mb-3">
                {product.inStock > 10 ? (
                  <span className="status-indicator status-success">✅ {t('inStock')}</span>
                ) : product.inStock > 0 ? (
                  <span className="status-indicator status-warning">⚠️ {t('lowStock')}</span>
                ) : (
                  <span className="status-indicator status-error">❌ {t('outOfStock')}</span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.inStock === 0}
                className={`btn w-full ${
                  product.inStock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {product.inStock === 0 ? t('outOfStock') : t('addToCart')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="heading-md mb-2">{t('noProductsFound')}</h3>
          <p className="body-md text-gray-600">{t('adjustSearchCriteria')}</p>
        </div>
      )}

      {/* Backdrop for cart dropdown */}
      {showCart && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowCart(false)} />
      )}
    </div>
  );
};