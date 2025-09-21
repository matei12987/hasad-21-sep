import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Leaf,
  Calendar,
  Camera,
  TrendingUp,
  Droplets,
  Sun,
  Thermometer,
  Plus,
  Edit,
  Eye,
  BarChart3,
} from 'lucide-react';
import { Crop, GrowthLog, FarmSite } from '../../types';

interface CropManagementProps {
  selectedSite: FarmSite;
}

export const CropManagement: React.FC<CropManagementProps> = ({ selectedSite }) => {
  const { t } = useTranslation();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [growthLogs, setGrowthLogs] = useState<GrowthLog[]>([]);
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showGrowthLog, setShowGrowthLog] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCrops: Crop[] = [
      {
        id: '1',
        site_id: selectedSite.id,
        name: 'Butterhead Lettuce',
        variety: 'Boston Bibb',
        category: 'leafy_greens',
        planted_date: '2024-01-15',
        expected_harvest_date: '2024-02-15',
        quantity_planted: 200,
        estimated_yield: 50,
        actual_yield: 48,
        status: 'harvest_ready',
        growth_stage: 95,
        health_score: 92,
        notes: 'Excellent growth, ready for harvest',
        photos: [],
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-02-10T00:00:00Z',
      },
      {
        id: '2',
        site_id: selectedSite.id,
        name: 'Cherry Tomatoes',
        variety: 'Sweet 100',
        category: 'vegetables',
        planted_date: '2024-01-20',
        expected_harvest_date: '2024-03-20',
        quantity_planted: 50,
        estimated_yield: 75,
        status: 'flowering',
        growth_stage: 65,
        health_score: 88,
        notes: 'Flowering stage, good fruit set',
        photos: [],
        created_at: '2024-01-20T00:00:00Z',
        updated_at: '2024-02-10T00:00:00Z',
      },
      {
        id: '3',
        site_id: selectedSite.id,
        name: 'Basil',
        variety: 'Genovese',
        category: 'herbs',
        planted_date: '2024-02-01',
        expected_harvest_date: '2024-03-01',
        quantity_planted: 100,
        estimated_yield: 25,
        status: 'growing',
        growth_stage: 45,
        health_score: 85,
        notes: 'Steady growth, regular pruning needed',
        photos: [],
        created_at: '2024-02-01T00:00:00Z',
        updated_at: '2024-02-10T00:00:00Z',
      },
    ];

    const mockGrowthLogs: GrowthLog[] = [
      {
        id: '1',
        crop_id: '1',
        date: '2024-02-10',
        growth_stage: 95,
        height: 15,
        health_score: 92,
        notes: 'Ready for harvest, excellent color and texture',
        photos: [],
        actions_taken: ['Nutrient adjustment', 'pH monitoring'],
        created_by: 'farmer1',
      },
      {
        id: '2',
        crop_id: '1',
        date: '2024-02-05',
        growth_stage: 85,
        height: 12,
        health_score: 90,
        notes: 'Rapid growth, good leaf development',
        photos: [],
        actions_taken: ['Pruning', 'Water adjustment'],
        created_by: 'farmer1',
      },
    ];

    setCrops(mockCrops);
    setGrowthLogs(mockGrowthLogs);
    setLoading(false);
  }, [selectedSite]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planted':
        return 'bg-blue-100 text-blue-800';
      case 'growing':
        return 'bg-green-100 text-green-800';
      case 'flowering':
        return 'bg-yellow-100 text-yellow-800';
      case 'harvest_ready':
        return 'bg-orange-100 text-orange-800';
      case 'harvested':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'leafy_greens':
        return '🥬';
      case 'vegetables':
        return '🍅';
      case 'herbs':
        return '🌿';
      case 'fruits':
        return '🍎';
      case 'grains':
        return '🌾';
      default:
        return '🌱';
    }
  };

  const handleAddGrowthLog = (cropId: string) => {
    setSelectedCrop(crops.find(c => c.id === cropId) || null);
    setShowGrowthLog(true);
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            {t('cropManagement')} - {selectedSite.name}
          </h2>
          <button
            onClick={() => setShowAddCrop(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('addCrop')}
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{crops.length}</div>
            <div className="text-sm text-gray-600">{t('activeCrops')}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {crops.filter(c => c.status === 'harvest_ready').length}
            </div>
            <div className="text-sm text-gray-600">{t('readyToHarvest')}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {crops.reduce((sum, c) => sum + c.estimated_yield, 0)} kg
            </div>
            <div className="text-sm text-gray-600">{t('expectedYield')}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(crops.reduce((sum, c) => sum + c.health_score, 0) / crops.length)}%
            </div>
            <div className="text-sm text-gray-600">{t('avgHealthScore')}</div>
          </div>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crops.map(crop => (
          <div key={crop.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Crop Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(crop.category)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate max-w-[120px] sm:max-w-none">
                      {crop.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate max-w-[120px] sm:max-w-none">
                      {crop.variety}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crop.status)}`}
                >
                  {crop.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Growth Progress */}
            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{t('growthProgress')}</span>
                  <span className="text-sm font-bold text-green-600">{crop.growth_stage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${crop.growth_stage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">{t('healthScore')}</div>
                  <div className={`text-lg font-bold ${getHealthColor(crop.health_score)}`}>
                    {crop.health_score}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">{t('expectedYield')}</div>
                  <div className="text-lg font-bold text-gray-900">{crop.estimated_yield} kg</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('planted')}:</span>
                  <span className="font-medium text-right">
                    {new Date(crop.planted_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('harvest')}:</span>
                  <span className="font-medium text-right">
                    {new Date(crop.expected_harvest_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('quantity')}:</span>
                  <span className="font-medium text-right">{crop.quantity_planted} {t('plants')}</span>
                </div>
              </div>

              {crop.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700 break-words">
                  {crop.notes}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => handleAddGrowthLog(crop.id)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                <Camera className="w-4 h-4" />
                {t('logGrowth')}
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                <BarChart3 className="w-4 h-4" />
                {t('analytics')}
              </button>
              <button className="flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Crop Modal */}
      {showAddCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{t('addNewCrop')}</h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('cropName')}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('cropNamePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('variety')}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('varietyPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option value="leafy_greens">{t('leafyGreens')}</option>
                  <option value="vegetables">{t('vegetables')}</option>
                  <option value="herbs">{t('herbs')}</option>
                  <option value="fruits">{t('fruits')}</option>
                  <option value="grains">{t('grains')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('plantedDate')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('expectedHarvest')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('quantityPlanted')}
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={t('quantityPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('expectedYieldKg')}
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={t('yieldPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('notes')}</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('cropNotesPlaceholder')}
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddCrop(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => setShowAddCrop(false)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t('addCrop')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Growth Log Modal */}
      {showGrowthLog && selectedCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('growthLog')} - {selectedCrop.name}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('growthStagePercent')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={t('growthStagePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('heightCm')}
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={t('heightPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('healthScoreRange')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('healthScorePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('actionsTaken')}
                </label>
                <div className="space-y-2">
                  {[
                    t('watering'),
                    t('nutrientAdjustment'),
                    t('pruning'),
                    t('phMonitoring'),
                    t('pestControl'),
                  ].map(action => (
                    <label key={action} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{action}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('notes')}</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={t('observationsPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('photos')}</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{t('clickToAddPhotos')}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowGrowthLog(false);
                  setSelectedCrop(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => {
                  setShowGrowthLog(false);
                  setSelectedCrop(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t('saveLog')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
