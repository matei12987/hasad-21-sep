import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContacts } from '../../hooks/useContacts';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';
import { Contact } from '../../types';
import { ContactFormData } from '../../lib/validation';
import { Plus, Search, Filter } from 'lucide-react';

export const ContactList: React.FC = () => {
  const { t } = useTranslation();
  const { contacts, loading, addContact, updateContact, deleteContact } = useContacts();
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [formLoading, setFormLoading] = useState(false);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.contact_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.contact_mobile && contact.contact_mobile.includes(searchTerm));

    const matchesFilter = filterType === 'all' || contact.contact_type === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleAddContact = async (data: ContactFormData) => {
    setFormLoading(true);
    try {
      await addContact(data);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding contact:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateContact = async (data: ContactFormData) => {
    if (!editingContact?.contact_id) return;

    setFormLoading(true);
    try {
      await updateContact(editingContact.contact_id, data);
      setEditingContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      await deleteContact(contactId);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <span className="ml-4 text-gray-600">{t('loading')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('contacts')}</h2>
          <p className="text-gray-600 mt-1">
            {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('addContact')}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={t('search')}
            className="w-full ps-10 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Filter className="absolute inset-inline-start-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="ps-10 pe-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Types</option>
            <option value="consumer">{t('consumer')}</option>
            <option value="institutional">{t('institutional')}</option>
            <option value="corporate">{t('corporate')}</option>
          </select>
        </div>
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No contacts found' : t('noContacts')}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first contact'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              {t('addContact')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContacts.map(contact => (
            <ContactCard
              key={contact.contact_id}
              contact={contact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />
          ))}
        </div>
      )}

      {/* Contact Form Modal */}
      {(showForm || editingContact) && (
        <ContactForm
          contact={editingContact || undefined}
          onSubmit={editingContact ? handleUpdateContact : handleAddContact}
          onCancel={handleCancelForm}
          loading={formLoading}
        />
      )}
    </div>
  );
};
