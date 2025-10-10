import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useContacts } from '../../hooks/useContacts';
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Clock,
  User,
} from 'lucide-react';

interface SupportScreenProps {
  onBack: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { contacts } = useContacts();
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [issueDescription, setIssueDescription] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitTicket = async () => {
    if (!selectedContact || !issueDescription.trim()) {
      setError(t('pleaseCompleteAllFields'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/raise-support-ticket`;
      
      const headers = {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          contact_id: parseInt(selectedContact),
          issue: issueDescription,
          contact_method: contactMethod,
          user_id: user?.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit support ticket');
      }

      setSuccess(true);
      setIssueDescription('');
      setSelectedContact('');
    } catch (err) {
      console.error('Support ticket error:', err);
      setError(err instanceof Error ? err.message : t('supportTicketError'));
    } finally {
      setLoading(false);
    }
  };

  const handleCallSupport = () => {
    window.open('tel:+966800123456', '_self');
  };

  const handleEmailSupport = () => {
    window.open('mailto:support@hasad.com?subject=Support Request', '_self');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 preserve-position">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 preserve-position">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={t('back')}
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('helpAndSupport')}</h1>
                <p className="text-xs text-gray-600">{t('appSlogan')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('ticketSubmittedSuccessfully')}</h2>
            <p className="text-gray-600 mb-6">{t('supportTeamWillContact')}</p>
            <div className="space-y-3">
              <button
                onClick={onBack}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {t('backToProfile')}
              </button>
              <button
                onClick={handleCallSupport}
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t('callSupportNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 preserve-position">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 preserve-position">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={t('back')}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">{t('helpAndSupport')}</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Contact Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('quickContact')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleCallSupport}
              className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-start">
                <h3 className="font-semibold text-blue-900">{t('callSupport')}</h3>
                <p className="text-sm text-blue-700">{t('immediateAssistance')}</p>
                <p className="text-xs text-blue-600 font-mono" dir="ltr">+966 800 123 456</p>
              </div>
            </button>

            <button
              onClick={handleEmailSupport}
              className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-start">
                <h3 className="font-semibold text-green-900">{t('emailSupport')}</h3>
                <p className="text-sm text-green-700">{t('detailedInquiries')}</p>
                <p className="text-xs text-green-600 font-mono" dir="ltr">support@hasad.com</p>
              </div>
            </button>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">{t('raiseSupportTicket')}</h2>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Contact Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('selectContact')} *
              </label>
              <select
                value={selectedContact}
                onChange={e => setSelectedContact(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">{t('chooseContact')}</option>
                {contacts.map(contact => (
                  <option key={contact.contact_id} value={contact.contact_id}>
                    {contact.contact_name} - {contact.contact_email}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('preferredContactMethod')}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="email"
                    checked={contactMethod === 'email'}
                    onChange={e => setContactMethod(e.target.value as 'email' | 'phone')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">{t('email')}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="phone"
                    checked={contactMethod === 'phone'}
                    onChange={e => setContactMethod(e.target.value as 'email' | 'phone')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">{t('phone')}</span>
                </label>
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('describeIssue')} *
              </label>
              <textarea
                value={issueDescription}
                onChange={e => setIssueDescription(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder={t('issueDescriptionPlaceholder')}
                required
              />
              <div className="mt-1 text-xs text-gray-500">
                {issueDescription.length}/500 {t('characters')}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitTicket}
              disabled={loading || !selectedContact || !issueDescription.trim()}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  {t('submittingTicket')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t('submitTicket')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            {t('supportInformation')}
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">{t('businessHours')}</h4>
                <p className="text-sm text-blue-700">{t('supportHours')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">{t('responseTime')}</h4>
                <p className="text-sm text-green-700">{t('expectedResponseTime')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <User className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-purple-900">{t('dedicatedSupport')}</h4>
                <p className="text-sm text-purple-700">{t('personalizedAssistance')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('frequentlyAskedQuestions')}</h3>
          
          <div className="space-y-3">
            {[
              {
                question: t('howToUpdateContact'),
                answer: t('updateContactAnswer'),
              },
              {
                question: t('howToDeleteContact'),
                answer: t('deleteContactAnswer'),
              },
              {
                question: t('dataSecurityQuestion'),
                answer: t('dataSecurityAnswer'),
              },
            ].map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-3 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};