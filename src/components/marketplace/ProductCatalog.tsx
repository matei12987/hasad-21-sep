import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import { humanize } from '../../helpers/humanize';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Leaf,
  Calendar,
  ShoppingCart,
  Heart,
  Eye,
} from 'lucide-react';
import { Product } from '../../types';

export const ProductCatalog: React.FC = () => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        farmer_id: 'farmer1',
        farm_site_id: 'site1',
        crop_id: 'crop1',
        name: 'freshButterheedLettuce',
        description: 'crispTenderLettuce',
        category: 'leafy_greens',
        images: ['🥬'],
        price: 15.99,
        unit: 'kg',
        quantity_available: 25,
        minimum_order: 1,
        harvest_date: '2024-02-12',
        expiry_date: '2024-02-19',
        organic_certified: true,
        farm_provenance: {
          farm_name: 'greenValleyHydroponics',
          location: 'Riyadh, Saudi Arabia',
          farming_method: 'hydroponic',
          certifications: ['organic', 'haccp'],
        },
        seasonality: {
          peak_season: ['winter', 'spring'],
          available_months: ['jan', 'feb', 'mar', 'apr', 'nov', 'dec'],
        },
        nutritional_info: {
          calories_per_100g: 13,
          protein: 1.4,
          carbs: 2.3,
          fat: 0.1,
          fiber: 1.0,
          vitamins: { 'Vitamin A': 370, 'Vitamin K': 126, Folate: 38 },
        },
        status: 'available',
        rating: 4.8,
        review_count: 24,
        created_at: '2024-02-10T00:00:00Z',
        updated_at: '2024-02-12T00:00:00Z',
      },
      {
        id: '2',
        farmer_id: 'farmer2',
        farm_site_id: 'site2',
        name: 'organicCherryTomatoes',
        description: 'sweetJuicyTomatoes',
        category: 'vegetables',
        images: ['🍅'],
        price: 28.5,
        unit: 'kg',
        quantity_available: 15,
        minimum_order: 2,
        harvest_date: '2024-02-11',
        expiry_date: '2024-02-18',
        organic_certified: true,
        farm_provenance: {
          farm_name: 'sunnyOrganicFarm',
          location: 'Jeddah, Saudi Arabia',
          farming_method: 'organic',
          certifications: ['organic', 'fairTrade'],
        },
        seasonality: {
          peak_season: ['spring', 'summer'],
          available_months: ['mar', 'apr', 'may', 'jun', 'jul', 'aug'],
        },
        status: 'available',
        rating: 4.9,
        review_count: 18,
        created_at: '2024-02-09T00:00:00Z',
        updated_at: '2024-02-11T00:00:00Z',
      },
      {
        id: '3',
        farmer_id: 'farmer1',
        farm_site_id: 'site1',
        name: 'freshBasil',
        description: 'aromaticBasilLeaves',
        category: 'herbs',
        images: ['🌿'],
        price: 12.0,
        unit: 'bunch',
        quantity_available: 30,
        minimum_order: 1,
        harvest_date: '2024-02-12',
        expiry_date: '2024-02-15',
        organic_certified: false,
        farm_provenance: {
          farm_name: 'greenValleyHydroponics',
          location: 'Riyadh, Saudi Arabia',
          farming_method: 'hydroponic',
          certifications: ['haccp'],
        },
        seasonality: {
          peak_season: ['spring', 'summer', 'fall'],
          available_months: ['mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct'],
        },
        status: 'available',
        rating: 4.7,
        review_count: 12,
        created_at: '2024-02-08T00:00:00Z',
        updated_at: '2024-02-12T00:00:00Z',
      },
      {
        id: '4',
        farmer_id: 'farmer3',
        farm_site_id: 'site3',
        name: 'premiumStrawberries',
        description: 'sweetJuicyStrawberries',
        category: 'fruits',
        images: ['🍓'],
        price: 45.0,
        unit: 'kg',
        quantity_available: 8,
        minimum_order: 1,
        harvest_date: '2024-02-13',
        expiry_date: '2024-02-16',
        organic_certified: true,
        farm_provenance: {
          farm_name: 'berryFreshFarms',
          location: 'Dammam, Saudi Arabia',
          farming_method: 'hydroponic',
          certifications: ['organic', 'globalGap'],
        },
        seasonality: {
          peak_season: ['winter', 'spring'],
          available_months: ['dec', 'jan', 'feb', 'mar', 'apr'],
        },
        status: 'available',
        rating: 4.9,
        review_count: 31,
        created_at: '2024-02-07T00:00:00Z',
        updated_at: '2024-02-13T00:00:00Z',
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const categories = [
    { id: 'all', nameKey: 'allProducts', icon: '🌾' },
    { id: 'leafy_greens', nameKey: 'leafyGreens', icon: '🥬' },
    { id: 'vegetables', nameKey: 'vegetables', icon: '🍅' },
    { id: 'herbs', nameKey: 'herbs', icon: '🌿' },
    { id: 'fruits', nameKey: 'fruits', icon: '🍓' },
    { id: 'grains', nameKey: 'grains', icon: '🌾' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farm_provenance.farm_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  const getDaysUntilExpiry = (expiryDate: string) => {
    const days = Math.ceil(
      (new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const getFreshnessColor = (days: number) => {
    if (days <= 2) return 'text-red-600 bg-red-50';
    if (days <= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('hasadMarketplace')}</h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchProductsPlaceholder')}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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

        {/* Sort and Filter Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">{t('newestFirst')}</option>
              <option value="price_low">{t('priceLowToHigh')}</option>
              <option value="price_high">{t('priceHighToLow')}</option>
              <option value="rating">{t('highestRated')}</option>
            </select>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {t('filters')}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map(product => {
          const daysUntilExpiry = getDaysUntilExpiry(product.expiry_date);

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <span className="text-6xl">{product.images[0]}</span>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.organic_certified && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      {t('organic')}
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getFreshnessColor(daysUntilExpiry)}`}
                  >
                    {daysUntilExpiry} {t('daysFresh')}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  <button className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {t(product.name, { defaultValue: humanize(product.name) })}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 break-words">
                    {t(product.description)}
                  </p>
                </div>

                {/* Farm Info */}
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 min-w-0">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{t(product.farm_provenance.farm_name)}</span>
                  <span>•</span>
                  <span className="truncate">{product.farm_provenance.location}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.review_count} {t('reviews')})
                  </span>
                </div>

                {/* Price and Availability */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1 truncate">/ {product.unit}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 truncate">
                      {product.quantity_available} {product.unit} {t('available')}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {t('minOrder')}: {product.minimum_order} {product.unit}
                    </div>
                  </div>
                </div>

                {/* Harvest Date */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 min-w-0">
                  <Calendar className="w-4 h-4" />
                  <span className="truncate">
                    {t('harvested')}: {new Date(product.harvest_date).toLocaleDateString()}
                  </span>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-1 mb-4 overflow-hidden">
                  {product.farm_provenance.certifications.map(cert => (
                    <span
                      key={cert}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full truncate max-w-[80px] sm:max-w-none"
                    >
                      {t(cert)}
                    </span>
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                    product.status === 'available'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={product.status !== 'available'}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.status === 'available' ? t('addToCart') : t('outOfStock')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noProductsFound')}</h3>
          <p className="text-gray-600">{t('adjustSearchOrFilter')}</p>
        </div>
      )}

      {/* Advanced Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{t('advancedFilters')}</h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t('priceRange')}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder={t('min')}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    placeholder={t('max')}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Farming Method */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t('farmingMethod')}</h4>
                <div className="space-y-2">
                  {[
                    { key: 'hydroponic', label: t('hydroponic') },
                    { key: 'organic', label: t('organic') },
                    { key: 'conventional', label: t('conventional') },
                  ].map(method => (
                    <label key={method.key} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t('certifications')}</h4>
                <div className="space-y-2">
                  {[
                    { key: 'organic', label: t('organic') },
                    { key: 'haccp', label: 'HACCP' },
                    { key: 'fairTrade', label: t('fairTrade') },
                    { key: 'globalGap', label: 'GlobalGAP' },
                  ].map(cert => (
                    <label key={cert.key} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{cert.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t('location')}</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option value="">{t('allLocations')}</option>
                  <option value="riyadh">{t('riyadh')}</option>
                  <option value="jeddah">{t('jeddah')}</option>
                  <option value="dammam">{t('dammam')}</option>
                  <option value="mecca">{t('mecca')}</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{t('availability')}</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{t('inStockOnly')}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{t('sameDayDelivery')}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {t('clearFilters')}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t('applyFilters')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
