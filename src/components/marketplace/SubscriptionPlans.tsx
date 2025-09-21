import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import { formatDate, formatCurrency as formatI18nCurrency } from '../../i18n';
import {
  Calendar,
  Truck,
  Heart,
  Gift,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Edit,
  Pause,
  Play,
} from 'lucide-react';
import { Subscription } from '../../types';

export const SubscriptionPlans: React.FC = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { formatCurrency } = useSettings();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockSubscriptions: Subscription[] = [
      {
        id: '1',
        customer_id: 'customer1',
        type: 'farm_to_door',
        name: t('weeklyFreshBox'),
        description: t('freshSeasonalVegetables'),
        price: 89.99,
        frequency: 'weekly',
        duration: 12,
        products: [
          { product_id: '1', quantity: 2, substitution_allowed: true },
          { product_id: '2', quantity: 1, substitution_allowed: true },
          { product_id: '3', quantity: 3, substitution_allowed: false },
        ],
        delivery_schedule: {
          day_of_week: 3, // Wednesday
          time_slot: '10:00-14:00',
          address: '123 King Fahd Road, Riyadh 12345',
        },
        status: 'active',
        next_delivery: '2024-02-14',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-02-10T00:00:00Z',
      },
      {
        id: '2',
        customer_id: 'customer1',
        type: 'adopt_a_rooftop',
        name: t('myRooftopGarden'),
        description: t('sponsorYourOwnSection'),
        price: 199.99,
        frequency: 'monthly',
        duration: 6,
        products: [
          { product_id: '1', quantity: 5, substitution_allowed: false },
          { product_id: '3', quantity: 2, substitution_allowed: false },
        ],
        delivery_schedule: {
          day_of_week: 5, // Friday
          time_slot: '14:00-18:00',
          address: '123 King Fahd Road, Riyadh 12345',
        },
        status: 'active',
        next_delivery: '2024-02-16',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-02-01T00:00:00Z',
      },
    ];

    const mockAvailablePlans = [
      {
        id: 'plan1',
        type: 'farm_to_door',
        name: t('starterFreshBox'),
        description: t('perfectForSmallFamilies'),
        price: 59.99,
        frequency: 'weekly',
        duration_options: [4, 8, 12],
        sample_products: ['🥬', '🍅', '🌿'],
        features: [
          t('freshSeasonalVegetables'),
          t('recipeCardsIncluded'),
          t('flexibleDeliverySchedule'),
          t('cancelAnytime'),
        ],
        popular: false,
      },
      {
        id: 'plan2',
        type: 'farm_to_door',
        name: t('familyFreshBox'),
        description: t('idealForFamilies'),
        price: 89.99,
        frequency: 'weekly',
        duration_options: [4, 8, 12],
        sample_products: ['🥬', '🍅', '🌿', '🥕', '🍓', '🌽'],
        features: [
          t('premiumSeasonalVegetablesFruits'),
          t('recipeCardsCookingTips'),
          t('priorityDeliverySlots'),
          t('substitutionPreferences'),
          t('cancelAnytime'),
        ],
        popular: true,
      },
      {
        id: 'plan3',
        type: 'adopt_a_rooftop',
        name: t('adoptARooftop'),
        description: t('sponsorYourOwnSection'),
        price: 199.99,
        frequency: 'monthly',
        duration_options: [3, 6, 12],
        sample_products: ['🥬', '🍅', '🌿', '🥕'],
        features: [
          t('yourOwnDedicatedGrowingSpace'),
          t('monthlyHarvestDelivery'),
          t('farmVisitAccess'),
          t('growthProgressUpdates'),
          t('personalizedCropSelection'),
        ],
        popular: false,
      },
      {
        id: 'plan4',
        type: 'seasonal_box',
        name: t('seasonalSpecialtyBox'),
        description: t('curatedSelectionSeasonal'),
        price: 129.99,
        frequency: 'bi_weekly',
        duration_options: [8, 16, 24],
        sample_products: ['🍓', '🫐', '🥭', '🌶️'],
        features: [
          t('rareSpecialtyVarieties'),
          t('seasonalPeakFreshness'),
          t('educationalContent'),
          t('chefCollaborationRecipes'),
          t('premiumPackaging'),
        ],
        popular: false,
      },
    ];

    setSubscriptions(mockSubscriptions);
    setAvailablePlans(mockAvailablePlans);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return t('everyWeek');
      case 'bi_weekly':
        return t('everyTwoWeeks');
      case 'monthly':
        return t('everyMonth');
      default:
        return frequency;
    }
  };

  const getFrequencyKey = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return 'everyWeek';
      case 'bi_weekly':
        return 'everyTwoWeeks';
      case 'monthly':
        return 'everyMonth';
      default:
        return 'everyWeek';
    }
  };

  const getDayKey = (dayOfWeek: number) => {
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayKeys[dayOfWeek] || 'monday';
  };

  const formatDateLocalized = (dateString: string) => {
    return formatDate(dateString, i18n.language);
  };

  const formatCurrencyLocalized = (amount: number) => {
    return formatI18nCurrency(amount, 'SAR', i18n.language);
  };

  const handleSubscriptionAction = (subscriptionId: string, action: string) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: action === 'pause' ? 'paused' : action === 'resume' ? 'active' : sub.status,
              updated_at: new Date().toISOString(),
            }
          : sub
      )
    );
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t('subscriptionPlans')}</h2>
        <p className="text-gray-600">{t('freshProduceDelivered')}</p>
      </div>

      {/* Active Subscriptions */}
      {subscriptions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-start">
            {t('myActiveSubscriptions')}
          </h3>

          <div className="space-y-4">
            {subscriptions.map(subscription => (
              <div key={subscription.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 pe-4">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words leading-tight mb-2 text-start">
                      {subscription.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 break-words leading-relaxed mb-3">
                      {subscription.description}
                    </p>
                    <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1 break-words">
                        <Calendar className="w-4 h-4 rtl:scale-x-flip-rtl" />
                        <span className="break-words">
                          {t(getFrequencyKey(subscription.frequency))}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 break-words">
                        <Truck className="w-4 h-4 rtl:scale-x-flip-rtl" />
                        <span className="break-words">
                          {t(getDayKey(subscription.delivery_schedule.day_of_week))}s
                        </span>
                      </span>
                      <span className="flex items-center gap-1 break-words">
                        <Clock className="w-4 h-4" />
                        <span className="break-words">
                          {subscription.delivery_schedule.time_slot}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="text-end shrink-0">
                    <div className="text-2xl font-bold text-green-600" dir="ltr">
                      {formatCurrencyLocalized(subscription.price)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 break-words">
                      {t('per')} {t(getFrequencyKey(subscription.frequency)).toLowerCase()}
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(subscription.status)} text-start`}
                    >
                      {t(subscription.status)}
                    </span>
                  </div>
                </div>

                {/* Next Delivery */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-blue-600 rtl:scale-x-flip-rtl" />
                    <span className="text-sm font-medium text-blue-800">{t('nextDelivery')}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-blue-700">
                    <p className="break-words mb-1 text-start">
                      <span dir="ltr">{formatDateLocalized(subscription.next_delivery)}</span> •
                      <span dir="ltr">{subscription.delivery_schedule.time_slot}</span>
                    </p>
                    <p className="flex items-start gap-1 min-w-0">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="break-words leading-tight">
                        {subscription.delivery_schedule.address}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Products Preview */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    {t('includedProducts')}
                  </h5>
                  <div className="flex gap-2">
                    {subscription.products.slice(0, 4).map((product, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
                      >
                        <span className="text-lg">🥬</span>
                      </div>
                    ))}
                    {subscription.products.length > 4 && (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          +{subscription.products.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    <Edit className="w-4 h-4 rtl:scale-x-flip-rtl" />
                    {t('modify')}
                  </button>

                  {subscription.status === 'active' ? (
                    <button
                      onClick={() => handleSubscriptionAction(subscription.id, 'pause')}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                    >
                      <Pause className="w-4 h-4 rtl:scale-x-flip-rtl" />
                      {t('pause')}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubscriptionAction(subscription.id, 'resume')}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                    >
                      <Play className="w-4 h-4 rtl:scale-x-flip-rtl" />
                      {t('resume')}
                    </button>
                  )}

                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                    <Calendar className="w-4 h-4 rtl:scale-x-flip-rtl" />
                    {t('schedule')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Plans */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-start">
          {t('availableSubscriptionPlans')}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {availablePlans.map(plan => (
            <div
              key={plan.id}
              className={`border-2 rounded-xl p-4 sm:p-6 relative ${
                plan.popular ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {t('mostPopular')}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-4">
                <div className="flex justify-center gap-1 mb-3">
                  {plan.sample_products.map((emoji: string, index: number) => (
                    <span key={index} className="text-2xl">
                      {emoji}
                    </span>
                  ))}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-words leading-tight text-start">
                  {plan.name}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 break-words leading-relaxed">
                  {plan.description}
                </p>

                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1" dir="ltr">
                  {formatCurrencyLocalized(plan.price)}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 break-words">
                  {t('per')} {t(getFrequencyKey(plan.frequency))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4 sm:mb-6">
                {plan.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-start">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 break-words leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Duration Options */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2 text-start">
                  {t('durationOptions')}
                </h5>
                <div className="grid grid-cols-3 gap-2">
                  {plan.duration_options.map((duration: number) => (
                    <button
                      key={duration}
                      className="px-2 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-green-500 hover:bg-green-50 transition-colors break-words text-center"
                    >
                      <span dir="ltr">{duration}</span>{' '}
                      {plan.frequency === 'monthly' ? t('months') : t('weeks')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowCreatePlan(true);
                }}
                className={`w-full py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                  plan.popular
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {t('subscribeNow')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Subscription Modal */}
      {showCreatePlan && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('subscribeTo')} {selectedPlan.name}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {/* Duration Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                  {t('subscriptionDuration')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  {selectedPlan.duration_options.map((duration: number) => (
                    <option key={duration} value={duration}>
                      <span dir="ltr">{duration}</span>{' '}
                      {selectedPlan.frequency === 'monthly' ? t('months') : t('weeks')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                  {t('preferredDeliveryDay')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option value="1">{t('monday')}</option>
                  <option value="2">{t('tuesday')}</option>
                  <option value="3">{t('wednesday')}</option>
                  <option value="4">{t('thursday')}</option>
                  <option value="5">{t('friday')}</option>
                  <option value="6">{t('saturday')}</option>
                </select>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                  {t('deliveryTimeSlot')}
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option value="08:00-12:00">
                    {t('morning')} <span dir="ltr">(8:00 AM - 12:00 PM)</span>
                  </option>
                  <option value="12:00-16:00">
                    {t('afternoon')} <span dir="ltr">(12:00 PM - 4:00 PM)</span>
                  </option>
                  <option value="16:00-20:00">
                    {t('evening')} <span dir="ltr">(4:00 PM - 8:00 PM)</span>
                  </option>
                </select>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                  {t('deliveryAddress')}
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('enterCompleteAddress')}
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
                  {t('specialInstructions')} ({t('optional')})
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('specialInstructionsPlaceholder')}
                />
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 text-start">{t('planPrice')}:</span>
                  <span className="font-medium text-end" dir="ltr">
                    {formatCurrencyLocalized(selectedPlan.price)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 text-start">{t('frequency')}:</span>
                  <span className="font-medium text-end">
                    {getFrequencyText(selectedPlan.frequency)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 text-start">
                      {t('totalPerDelivery')}:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      <span dir="ltr">{formatCurrencyLocalized(selectedPlan.price)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowCreatePlan(false);
                  setSelectedPlan(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => {
                  setShowCreatePlan(false);
                  setSelectedPlan(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t('subscribeNow')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
