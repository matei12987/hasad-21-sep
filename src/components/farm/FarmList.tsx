import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Home,
  Sprout,
  DollarSign,
  Edit2,
  Trash2,
  Plus,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Farm } from '../../types';
import { FarmRegistrationForm } from './FarmRegistrationForm';

interface FarmListProps {
  userId: string;
}

export const FarmList: React.FC<FarmListProps> = ({ userId }) => {
  const { t } = useTranslation();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | undefined>(undefined);
  const [deletingFarmId, setDeletingFarmId] = useState<string | null>(null);

  const fetchFarms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFarms(data || []);
    } catch (err) {
      console.error('Error fetching farms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, [userId]);

  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm);
    setShowForm(true);
  };

  const handleDelete = async (farmId: string) => {
    if (!window.confirm(t('confirmDeleteFarm'))) return;

    try {
      setDeletingFarmId(farmId);
      const { error } = await supabase.from('farms').delete().eq('farm_id', farmId);

      if (error) throw error;

      setFarms(farms.filter((f) => f.farm_id !== farmId));
    } catch (err) {
      console.error('Error deleting farm:', err);
      alert(t('farmRegistrationError'));
    } finally {
      setDeletingFarmId(null);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingFarm(undefined);
  };

  const handleFormSuccess = () => {
    fetchFarms();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCropLabel = (cropType: string) => {
    const cropMap: Record<string, string> = {
      cucumber: t('cucumber'),
      tomatoes: t('tomatoes'),
      lettuce: t('lettuce'),
      strawberries: t('strawberries'),
      leafy_greens: t('leafyGreens'),
    };
    return cropMap[cropType] || cropType;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('myFarms')}</h2>
          <p className="text-gray-600 mt-1">{t('manageFarms')}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('addNewFarm')}
        </button>
      </div>

      {farms.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
          <div className="text-center">
            <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('noFarmsRegistered')}</h3>
            <p className="text-gray-600 mb-6">{t('registerFirstFarm')}</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              {t('registerYourFarm')}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {farms.map((farm) => (
            <div
              key={farm.farm_id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {farm.roof_photo_url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={farm.roof_photo_url}
                    alt={farm.farm_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{farm.farm_name}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        farm.status
                      )}`}
                    >
                      {t(farm.status || 'pending')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(farm)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label={t('editFarm')}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(farm.farm_id!)}
                      disabled={deletingFarmId === farm.farm_id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      aria-label={t('deleteFarm')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{farm.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Home className="w-4 h-4 text-gray-400" />
                    <span>
                      {farm.roof_area} {t('roofAreaUnit')} •{' '}
                      {farm.ownership_status === 'owned' ? t('owned') : t('rental')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>
                      {farm.available_budget.toLocaleString()} {t('budgetUnit')}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <Sprout className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex flex-wrap gap-2">
                      {farm.desired_crop_types.map((crop) => (
                        <span
                          key={crop}
                          className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium"
                        >
                          {getCropLabel(crop)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {t('created')}: {new Date(farm.created_at!).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <FarmRegistrationForm
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          userId={userId}
          existingFarm={editingFarm}
        />
      )}
    </div>
  );
};
