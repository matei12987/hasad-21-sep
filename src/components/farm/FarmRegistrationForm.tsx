import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Image as ImageIcon,
  Sprout,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Farm } from '../../types';

interface FarmRegistrationFormProps {
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  existingFarm?: Farm;
}

export const FarmRegistrationForm: React.FC<FarmRegistrationFormProps> = ({
  onClose,
  onSuccess,
  userId,
  existingFarm,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    existingFarm?.roof_photo_url || null
  );

  const [formData, setFormData] = useState<Partial<Farm>>({
    farm_name: existingFarm?.farm_name || '',
    farm_email: existingFarm?.farm_email || '',
    farm_mobile: existingFarm?.farm_mobile || '',
    roof_area: existingFarm?.roof_area || 0,
    location: existingFarm?.location || '',
    housing_type: existingFarm?.housing_type || 'rental_singles',
    ownership_status: existingFarm?.ownership_status || 'rental',
    desired_crop_types: existingFarm?.desired_crop_types || [],
    available_budget: existingFarm?.available_budget || 0,
  });

  const cropTypes = [
    { value: 'cucumber', label: t('cucumber') },
    { value: 'tomatoes', label: t('tomatoes') },
    { value: 'lettuce', label: t('lettuce') },
    { value: 'strawberries', label: t('strawberries') },
    { value: 'leafy_greens', label: t('leafyGreens') },
  ];

  const housingTypes = [
    { value: 'rental_singles', label: t('rentalSingles') },
    { value: 'rental_families', label: t('rentalFamilies') },
    { value: 'owned', label: t('ownedProperty') },
  ];

  const handleHousingTypeChange = (housingType: Farm['housing_type']) => {
    const ownershipStatus = housingType === 'owned' ? 'owned' : 'rental';
    setFormData({
      ...formData,
      housing_type: housingType,
      ownership_status: ownershipStatus,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Photo size must be less than 5MB');
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropTypeToggle = (cropType: string) => {
    const currentTypes = formData.desired_crop_types || [];
    if (currentTypes.includes(cropType)) {
      setFormData({
        ...formData,
        desired_crop_types: currentTypes.filter((t) => t !== cropType),
      });
    } else {
      setFormData({
        ...formData,
        desired_crop_types: [...currentTypes, cropType],
      });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.farm_name?.trim()) {
      setError(t('allFieldsRequired'));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.farm_email || !emailRegex.test(formData.farm_email)) {
      setError(t('invalidEmail'));
      return false;
    }

    const saudiMobileRegex = /^(\+966|00966|966|05)[0-9]{8,9}$/;
    if (!formData.farm_mobile || !saudiMobileRegex.test(formData.farm_mobile.replace(/\s/g, ''))) {
      setError(t('invalidMobileNumber'));
      return false;
    }

    if (!formData.roof_area || formData.roof_area <= 0) {
      setError(t('roofAreaRequired'));
      return false;
    }

    if (!formData.location?.trim()) {
      setError(t('allFieldsRequired'));
      return false;
    }

    if (!formData.desired_crop_types || formData.desired_crop_types.length === 0) {
      setError(t('selectAtLeastOneCrop'));
      return false;
    }

    if (!formData.available_budget || formData.available_budget < 0) {
      setError(t('budgetRequired'));
      return false;
    }

    return true;
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return existingFarm?.roof_photo_url || null;

    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `roof-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('farm-photos')
        .upload(filePath, photoFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('farm-photos').getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err) {
      console.error('Photo upload error:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const photoUrl = await uploadPhoto();

      const farmData: Partial<Farm> = {
        user_id: userId,
        farm_name: formData.farm_name!,
        farm_email: formData.farm_email!,
        farm_mobile: formData.farm_mobile!,
        roof_area: formData.roof_area!,
        location: formData.location!,
        housing_type: formData.housing_type!,
        ownership_status: formData.ownership_status!,
        roof_photo_url: photoUrl || undefined,
        desired_crop_types: formData.desired_crop_types!,
        available_budget: formData.available_budget!,
        status: 'pending',
      };

      let result;
      if (existingFarm?.farm_id) {
        result = await supabase
          .from('farms')
          .update(farmData)
          .eq('farm_id', existingFarm.farm_id)
          .select()
          .single();
      } else {
        result = await supabase.from('farms').insert([farmData]).select().single();
      }

      if (result.error) throw result.error;

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Farm registration error:', err);
      setError(err.message || t('farmRegistrationError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">
                {existingFarm ? t('editFarm') : t('farmRegistration')}
              </h2>
              <p className="text-sm text-green-50">{t('registerRooftopFarm')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={t('close')}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              {t('contactDetails')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('farmName')} *
              </label>
              <input
                type="text"
                value={formData.farm_name}
                onChange={(e) => setFormData({ ...formData, farm_name: e.target.value })}
                placeholder={t('farmNamePlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline me-1" />
                  {t('farmEmail')} *
                </label>
                <input
                  type="email"
                  value={formData.farm_email}
                  onChange={(e) => setFormData({ ...formData, farm_email: e.target.value })}
                  placeholder={t('farmEmailPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline me-1" />
                  {t('farmMobile')} *
                </label>
                <input
                  type="tel"
                  value={formData.farm_mobile}
                  onChange={(e) => setFormData({ ...formData, farm_mobile: e.target.value })}
                  placeholder={t('farmMobilePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Home className="w-5 h-5 text-green-600" />
              {t('roofSpecifications')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('roofArea')} *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.roof_area || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, roof_area: parseFloat(e.target.value) || 0 })
                  }
                  placeholder={t('roofAreaPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline me-1" />
                  {t('farmLocation')} *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={t('farmLocationPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('roofPhoto')}
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors">
                    <div className="flex items-center justify-center gap-3">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                      <div className="text-sm">
                        <p className="font-medium text-gray-700">{t('choosePhoto')}</p>
                        <p className="text-gray-500">
                          {photoFile ? t('photoSelected') : t('noPhotoSelected')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                {photoPreview && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={photoPreview}
                      alt="Roof preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('housingInformation')}</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('housingType')} *
              </label>
              <p className="text-sm text-gray-600 mb-3">{t('housingTypeDescription')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {housingTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleHousingTypeChange(type.value as Farm['housing_type'])}
                    className={`p-4 border-2 rounded-lg text-sm font-medium transition-all ${
                      formData.housing_type === type.value
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-green-600" />
              {t('cropPreferences')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('desiredCropTypes')} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cropTypes.map((crop) => (
                  <button
                    key={crop.value}
                    type="button"
                    onClick={() => handleCropTypeToggle(crop.value)}
                    className={`p-4 border-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      formData.desired_crop_types?.includes(crop.value)
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {formData.desired_crop_types?.includes(crop.value) && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {crop.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              {t('budgetInformation')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('availableBudget')} *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.available_budget || ''}
                onChange={(e) =>
                  setFormData({ ...formData, available_budget: parseFloat(e.target.value) || 0 })
                }
                placeholder={t('budgetPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={loading}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('submittingFarm') : t('submitFarmRegistration')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
