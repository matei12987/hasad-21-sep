import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { contactSchema, ContactFormData } from '../../lib/validation';
import { Contact } from '../../types';
import { X, Upload, User, Mail, Phone, MapPin } from 'lucide-react';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: ContactFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact
      ? {
          contact_name: contact.contact_name,
          contact_email: contact.contact_email,
          contact_mobile: contact.contact_mobile || '',
          contact_tel: contact.contact_tel || '',
          contact_address: contact.contact_address || '',
          contact_postcode: contact.contact_postcode || '',
          contact_city: contact.contact_city || '',
          contact_country: contact.contact_country || '',
          contact_nationality: contact.contact_nationality || '',
          contact_type: contact.contact_type,
        }
      : {
          contact_type: 'consumer',
        },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const onFormSubmit = async (data: ContactFormData) => {
    await onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {contact ? t('editContact') : t('addContact')}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">{t('personalInfo')}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('name')} *
                </label>
                <input
                  {...register('contact_name')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contact_name ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.contact_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('type')} *
                </label>
                <select
                  {...register('contact_type')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="consumer">{t('consumer')}</option>
                  <option value="institutional">{t('institutional')}</option>
                  <option value="corporate">{t('corporate')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('nationality')}
                </label>
                <input
                  {...register('contact_nationality')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('uploadId')}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                    id="nationality-id"
                  />
                  <label
                    htmlFor="nationality-id"
                    className="flex items-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">
                      {selectedFile ? selectedFile.name : t('chooseFile')}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <Phone className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">{t('contactInfo')}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('email')} *
                </label>
                <div className="relative">
                  <Mail className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('contact_email')}
                    type="email"
                    className={`w-full ps-10 pe-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.contact_email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.contact_email && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact_email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('mobile')}
                </label>
                <div className="relative">
                  <Phone className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register('contact_mobile')}
                    type="tel"
                    placeholder="+966501234567"
                    className={`w-full ps-10 pe-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.contact_mobile ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.contact_mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact_mobile.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('telephone')}
                </label>
                <input
                  {...register('contact_tel')}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('postcode')}
                </label>
                <input
                  {...register('contact_postcode')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('city')}</label>
                <input
                  {...register('contact_city')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('country')}
                </label>
                <input
                  {...register('contact_country')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('address')}</label>
              <div className="relative">
                <MapPin className="absolute inset-inline-start-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  {...register('contact_address')}
                  rows={3}
                  className="w-full ps-10 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t('loading') : t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
