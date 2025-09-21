import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize i18n before rendering
import './i18n';

// Set initial document direction based on stored language
const getStoredLanguage = (): 'ar' | 'en' => {
  try {
    const stored = localStorage.getItem('hasad-language');
    return stored === 'ar' || stored === 'en' ? stored : 'ar';
  } catch {
    return 'ar';
  }
};

const initialLanguage = getStoredLanguage();
document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = initialLanguage;

// Add error handling for development
if (import.meta.env.DEV) {
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
