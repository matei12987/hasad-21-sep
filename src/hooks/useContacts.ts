import { useState, useEffect } from 'react';
import { Contact } from '../types';
import { supabase } from '../lib/supabase';
import { cache } from '../lib/cache';
import { useAuth } from './useAuth';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchContacts = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Check cache first
      const cacheKey = `contacts:${user.id}`;
      const cachedContacts = cache.get<Contact[]>(cacheKey);

      if (cachedContacts) {
        setContacts(cachedContacts);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const contactsData = data || [];
      setContacts(contactsData);

      // Cache the results
      cache.set(cacheKey, contactsData, 3600); // 1 hour TTL
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contactData: Omit<Contact, 'contact_id' | 'user_id'>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ ...contactData, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;

    // Update local state and cache
    const newContact = data;
    setContacts(prev => [newContact, ...prev]);
    cache.invalidatePattern(`contacts:${user.id}`);

    return newContact;
  };

  const updateContact = async (contactId: number, contactData: Partial<Contact>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('contacts')
      .update(contactData)
      .eq('contact_id', contactId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    // Update local state and cache
    const updatedContact = data;
    setContacts(prev => prev.map(c => (c.contact_id === contactId ? updatedContact : c)));
    cache.invalidatePattern(`contacts:${user.id}`);

    return updatedContact;
  };

  const deleteContact = async (contactId: number) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('contact_id', contactId)
      .eq('user_id', user.id);

    if (error) throw error;

    // Update local state and cache
    setContacts(prev => prev.filter(c => c.contact_id !== contactId));
    cache.invalidatePattern(`contacts:${user.id}`);
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
  };
};
