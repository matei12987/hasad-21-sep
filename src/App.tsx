import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { HomeScreen } from './components/home/HomeScreen';
import { CartScreen } from './components/cart/CartScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { AddProductScreen } from './components/farmer/AddProductScreen';
import { OrdersScreen } from './components/orders/OrdersScreen';
import { MessagesScreen } from './components/messages/MessagesScreen';
import { BottomNavigation } from './components/navigation/BottomNavigation';
import { FarmDashboard } from './components/farm/FarmDashboard';
import { IoTControls } from './components/farm/IoTControls';
import { CropManagement } from './components/farm/CropManagement';
import { TasksAndMaintenance } from './components/farm/TasksAndMaintenance';
import { ProductCatalog } from './components/marketplace/ProductCatalog';
import { AnalyticsReports } from './components/shared/AnalyticsReports';
import { SettingsScreen } from './components/settings/SettingsScreen';
import { SubscriptionPlans } from './components/marketplace/SubscriptionPlans';
import { SettingsProvider } from './contexts/SettingsContext';
import { useAuth } from './contexts/AuthContext';
import { I18nDevTools } from './components/dev/I18nDevTools';
import { MissingKeyOverlay } from './components/dev/MissingKeyOverlay';
import { RTLTestSuite } from './components/dev/RTLTestSuite';
import { I18nStorybook } from './components/dev/I18nStorybook';
import { FarmSite } from './types';
import './App.css';

function AppContent() {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [selectedFarmSite, setSelectedFarmSite] = useState<FarmSite>({
    id: 'site1',
    name: 'Green Valley Rooftop Farm',
    location: {
      lat: 24.7136,
      lng: 46.6753,
      address: '123 King Fahd Road',
      city: 'Riyadh',
      country: 'Saudi Arabia',
    },
    type: 'rooftop',
    size: 500,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-02-12T00:00:00Z',
  });

  const mockFarmSites: FarmSite[] = [
    selectedFarmSite,
    {
      id: 'site2',
      name: 'Downtown Greenhouse',
      location: {
        lat: 24.7136,
        lng: 46.6753,
        address: '456 Olaya Street',
        city: 'Riyadh',
        country: 'Saudi Arabia',
      },
      type: 'greenhouse',
      size: 300,
      status: 'active',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-02-10T00:00:00Z',
    },
  ];

  // Listen for language changes and update document direction
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const { language } = event.detail;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);

    // Set initial direction based on current language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, [i18n.language]);

  // Check if user is admin (mock check - replace with actual role check)
  const isAdmin = user?.email === 'admin@hasad.com';

  // Show admin dashboard if user is admin
  if (isAdmin && showAdminDashboard) {
    return <AdminDashboard />;
  }

  if (!user) {
    return (
      <div className="app-container">
        <Routes>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'marketplace':
        return <ProductCatalog />; // Use ProductCatalog for marketplace
      case 'subscriptions':
        return <SubscriptionPlans />; // Assuming SubscriptionPlans is used elsewhere or will be re-added
      case 'orders':
        return <OrdersScreen />;
      case 'profile':
        return <ProfileScreen onNavigateToSettings={() => setCurrentScreen('settings')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('profile')} />;
      case 'farmer-dashboard':
        return (
          <FarmDashboard
            selectedSite={selectedFarmSite}
            onSiteChange={setSelectedFarmSite}
            sites={mockFarmSites}
          />
        );
      case 'iot-controls':
        return <IoTControls selectedSite={selectedFarmSite} />;
      case 'crop-management':
        return <CropManagement selectedSite={selectedFarmSite} />;
      case 'tasks-maintenance':
        return <TasksAndMaintenance selectedSite={selectedFarmSite} />;
      case 'add-product':
        return <AddProductScreen />;
      case 'analytics':
        return <AnalyticsReports userRole={user.type || 'consumer'} />;
      case 'legacy-farmer-dashboard':
        return <FarmerDashboard />;
      case 'cart':
        return <CartScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'admin':
        if (isAdmin) {
          setShowAdminDashboard(true);
          return null;
        }
        return <HomeScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app-container">
      <div className="screen-content">
        {/* Admin Dashboard Toggle for Demo */}
        {isAdmin && !showAdminDashboard && (
          <div className="fixed top-4 end-4 z-50">
            <button
              onClick={() => setShowAdminDashboard(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Admin Dashboard
            </button>
          </div>
        )}
        {showAdminDashboard && isAdmin && (
          <div className="fixed top-4 end-4 z-50">
            <button
              onClick={() => setShowAdminDashboard(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
            >
              Back to App
            </button>
          </div>
        )}
        {renderScreen()}
      </div>
      {!showAdminDashboard && (
        <BottomNavigation
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          userType={user.type || 'consumer'}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="preserve-position">
              <AppContent />
              {/* Development Tools - Only in DEV mode */}
              {import.meta.env.DEV && (
                <>
                  <I18nDevTools show={true} />
                  <MissingKeyOverlay />
                  <RTLTestSuite />
                  <I18nStorybook />
                </>
              )}
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
