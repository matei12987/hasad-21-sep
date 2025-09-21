import React from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from '../../types';
import { Mail, Phone, MapPin, Edit, Trash2, User, Building, Building2 } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: number) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const getTypeIcon = () => {
    switch (contact.contact_type) {
      case 'consumer':
        return <User className="w-4 h-4" />;
      case 'institutional':
        return <Building className="w-4 h-4" />;
      case 'corporate':
        return <Building2 className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (contact.contact_type) {
      case 'consumer':
        return 'bg-blue-100 text-blue-800';
      case 'institutional':
        return 'bg-green-100 text-green-800';
      case 'corporate':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = () => {
    if (contact.contact_id && window.confirm(t('deleteConfirm'))) {
      onDelete(contact.contact_id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.contact_name}</h3>
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}
            >
              {getTypeIcon()}
              {t(contact.contact_type)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(contact)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title={t('edit')}
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title={t('delete')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="px-6 pb-6 space-y-3">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm truncate">{contact.contact_email}</span>
        </div>

        {contact.contact_mobile && (
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{contact.contact_mobile}</span>
          </div>
        )}

        {contact.contact_address && (
          <div className="flex items-start gap-3 text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm line-clamp-2">{contact.contact_address}</span>
          </div>
        )}

        {contact.contact_city && contact.contact_country && (
          <div className="text-sm text-gray-500">
            {contact.contact_city}, {contact.contact_country}
          </div>
        )}

        {contact.contact_nationality && (
          <div className="text-sm text-gray-500">
            <span className="font-medium">{t('nationality')}:</span> {contact.contact_nationality}
          </div>
        )}
      </div>

      {/* Footer with additional info */}
      {(contact.contact_tel || contact.contact_postcode) && (
        <div className="px-6 py-3 bg-gray-50 rounded-b-xl border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            {contact.contact_tel && (
              <span>
                {t('telephone')}: {contact.contact_tel}
              </span>
            )}
            {contact.contact_postcode && (
              <span>
                {t('postcode')}: {contact.contact_postcode}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
