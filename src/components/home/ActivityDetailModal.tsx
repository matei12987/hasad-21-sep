import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import {
  X,
  Package,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  CreditCard,
  Truck,
  User,
  Leaf,
  Thermometer,
  Droplets,
  Sun,
} from 'lucide-react';

interface ActivityDetailModalProps {
  activity: any;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ activity, onClose }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOrderDetails = () => (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{activity.details.orderId}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activity.details.orderStatus)}`}
          >
            {activity.details.orderStatus === 'delivered' ? t('delivered') : 
             activity.details.orderStatus === 'shipped' ? t('shipped') : 
             activity.details.orderStatus === 'processing' ? t('processing') : 
             t(activity.details.orderStatus)}
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          {t('reference')}: {activity.details.referenceNumber}
        </p>
        {activity.details.trackingNumber && (
          <p className="text-gray-600 text-sm">
            {t('tracking')}: {activity.details.trackingNumber}
          </p>
        )}
      </div>

      {/* Customer Information */}
      {activity.details.customer && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            {t('customerInformation')}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{activity.details.customer.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 break-all">
                {activity.details.customer.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <a
                href={`tel:${activity.details.customer.phone}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {activity.details.customer.phone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
              <span className="text-sm text-gray-600 break-words">
                {activity.details.customer.address}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Farmer Information (for consumer view) */}
      {activity.details.farmer && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            {t('farmerInformation', { defaultValue: 'Farmer Information' })}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{activity.details.farmer.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <a
                href={`tel:${activity.details.farmer.contact}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {activity.details.farmer.contact}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{activity.details.farmer.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Package className="w-5 h-5 text-purple-600" />
          {t('Order Items')}
        </h4>
        <div className="space-y-3">
          {activity.details.items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{t(item.name)}</p>
                <p className="text-sm text-gray-600">
                  {t('quantity')}: {item.quantity}
                </p>
              </div>
              <p className="font-bold text-green-600">{formatCurrency(item.price)}</p>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-semibold text-gray-900">{t('totalAmount')}</span>
            <span className="text-xl font-bold text-green-600">
              {formatCurrency(activity.details.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Truck className="w-5 h-5 text-orange-600" />
          {t('deliveryInformation', { defaultValue: 'Delivery Information' })}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {t('currentLocation', { defaultValue: 'Current Location' })}: {activity.details.location}
            </span>
          </div>
          {activity.details.deliveryDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {t('deliveredOn')}: {formatDate(activity.details.deliveryDate)}
              </span>
            </div>
          )}
          {activity.details.estimatedDelivery && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {t('estimatedDelivery')}: {formatDate(activity.details.estimatedDelivery)}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {t('Payment')}: {activity.details.paymentMethod}
            </span>
          </div>
          {activity.details.deliveryNotes && (
            <div className="delivery-instructions mt-3 p-3 bg-yellow-50 rounded-lg" dir="rtl">
              <div className="flex justify-between items-start gap-3">
                <span className="instruction-label" dir="rtl">
                  {t('deliveryNotes')}؍
                </span>
                <span className="instruction-value" dir="ltr">
                  {activity.details.deliveryNotes}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCropDetails = () => (
    <div className="space-y-6" dir="rtl">
      {/* Plant Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{activity.details.cropName}</h3>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {t(activity.details.growthStage)}
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          {t('plantId')}؍ <span dir="ltr">{activity.details.plantId}</span>
        </p>
        <p className="text-gray-600 text-sm">
          {t('variety')}؍ {activity.details.variety}
        </p>
      </div>

      {/* Health Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-4" dir="rtl">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          {t('healthStatus')}
        </h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{t('overallHealth')}</span>
              <span className="text-lg font-bold text-green-600" dir="ltr">
                {activity.details.healthStatus}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${activity.details.healthStatus}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">{t('qualityGrade')}؍</span>
              <span className="ml-2 font-medium text-green-600">{t('premium')}</span>
            </div>
            <div>
              <span className="text-gray-600">{t('expectedYield')}؍</span>
              <span className="ml-2 font-medium" dir="ltr">{activity.details.estimatedYield}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4" dir="rtl">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          {t('locationDetails')}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('farm')}؍</span>
            <span className="font-medium text-start break-words" dir="ltr">
              {activity.details.location.farm}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('section')}؍</span>
            <span className="font-medium">{activity.details.location.section}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('row')}؍</span>
            <span className="font-medium">{activity.details.location.row}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('coordinates')}؍</span>
            <span className="font-medium font-mono" dir="ltr">{activity.details.location.coordinates}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-4" dir="rtl">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          {t('growthTimeline')}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('planted')}؍</span>
            <span className="font-medium" dir="ltr">
              {new Date(activity.details.plantedDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t('expectedHarvest')}؍</span>
            <span className="font-medium" dir="ltr">
              {new Date(activity.details.expectedHarvest).toLocaleDateString()}
            </span>
          </div>
          {activity.details.actualHarvest && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t('actualHarvest')}؍</span>
              <span className="font-medium text-green-600" dir="ltr">
                {new Date(activity.details.actualHarvest).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Environmental Data */}
      <div className="bg-white border border-gray-200 rounded-lg p-4" dir="rtl">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-red-600" />
          {t('environmentalConditions')}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">{t('temperature')}؍</span>
            <span className="font-medium" dir="ltr">{activity.details.environmentalData.temperature}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">{t('humidity')}؍</span>
            <span className="font-medium" dir="ltr">{activity.details.environmentalData.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">{t('ph')}؍</span>
            <span className="font-medium" dir="ltr">{activity.details.environmentalData.ph}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">{t('light')}؍</span>
            <span className="font-medium" dir="ltr">{activity.details.environmentalData.lightHours}h</span>
          </div>
        </div>
      </div>

      {/* Care History */}
      <div className="bg-white border border-gray-200 rounded-lg p-4" dir="rtl">
        <h4 className="font-semibold text-gray-900 mb-3">{t('careHistory')}</h4>
        <div className="space-y-3">
          {activity.details.careHistory.map((care: any, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{care.action}</p>
                <p className="text-sm text-gray-600">
                  <span dir="ltr">{new Date(care.date).toLocaleDateString()}</span> • {care.worker}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" dir="rtl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
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
              <span className="text-xl">{activity.icon}</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 truncate max-w-[250px]">
                {activity.title}
              </h2>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6" style={{ maxHeight: 'calc(90vh - 160px)' }}>
          {activity.type === 'order' ? renderOrderDetails() : renderCropDetails()}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            {activity.type === 'order' ? (
              <>
                {activity.details.customer?.phone && (
                  <a
                    href={`tel:${activity.details.customer.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Customer
                  </a>
                )}
                {activity.details.farmer?.contact && (
                  <a
                    href={`tel:${activity.details.farmer.contact}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Farmer
                  </a>
                )}
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Package className="w-4 h-4" />
                  View Order
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Leaf className="w-4 h-4" />
                  Manage Crop
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Add Log Entry
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};