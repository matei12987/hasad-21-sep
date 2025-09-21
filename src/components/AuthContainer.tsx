import React, { useState } from 'react';
import { useEffect } from 'react';
import { LoginForm } from './auth/LoginForm';
import { SignupForm } from './auth/SignupForm';

export const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  // Add error boundary for auth components
  const [hasError, setHasError] = useState(false);

  // Add error boundary effect
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Auth Container Error:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-4">
            There was an issue loading the authentication system.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setHasError(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative preserve-position">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10 preserve-position">
        <React.Suspense
          fallback={
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading...</p>
            </div>
          }
        >
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <SignupForm onToggleMode={toggleMode} />
          )}
        </React.Suspense>
      </div>
    </div>
  );
};
