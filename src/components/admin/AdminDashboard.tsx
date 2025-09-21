import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminKPICards } from './AdminKPICards';
import { AdminFarmersTab } from './AdminFarmersTab';
import { AdminConsumersTab } from './AdminConsumersTab';
import { AdminAlertsPanel } from './AdminAlertsPanel';
import { AdminDetailDrawer } from './AdminDetailDrawer';
import { AdminUser, AdminAlert } from '../../types/admin';

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'farmers' | 'consumers'>('farmers');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AdminAlert | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleUserSelect = (user: AdminUser) => {
    setSelectedUser(user);
    setSelectedAlert(null);
    setIsDrawerOpen(true);
  };

  const handleAlertSelect = (alert: AdminAlert) => {
    setSelectedAlert(alert);
    setSelectedUser(null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUser(null);
    setSelectedAlert(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex preserve-position">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AdminHeader />

        {/* Content Area */}
        <div className="flex-1 flex min-h-0">
          {/* Main Panel */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* KPI Cards */}
            <div className="p-6 pb-4">
              <AdminKPICards />
            </div>

            {/* Tabs */}
            <div className="px-6 pb-4">
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setActiveTab('farmers')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'farmers'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('farmers')}
                </button>
                <button
                  onClick={() => setActiveTab('consumers')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'consumers'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('consumers')}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 px-6 pb-6 min-h-0">
              {activeTab === 'farmers' ? (
                <AdminFarmersTab onUserSelect={handleUserSelect} />
              ) : (
                <AdminConsumersTab onUserSelect={handleUserSelect} />
              )}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="w-80 border-s border-gray-200 bg-white flex-shrink-0 hidden xl:block">
            <AdminAlertsPanel onAlertSelect={handleAlertSelect} />
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {isDrawerOpen && (
        <AdminDetailDrawer user={selectedUser} alert={selectedAlert} onClose={handleCloseDrawer} />
      )}
    </div>
  );
};
