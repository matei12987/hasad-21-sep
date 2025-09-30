import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize i18n before rendering
import './i18n';

// Force LTR at the document level for SPA shell
document.documentElement.setAttribute('dir', 'ltr');

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
