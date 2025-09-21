import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        console.log('🔄 Initializing authentication...');

        // Get current session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('❌ Session error:', error);
          throw error;
        }

        if (isMounted) {
          setUser(session?.user || null);
          setError(null);
          console.log('✅ Auth initialized:', session?.user?.email || 'No user');
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
          console.error('❌ Auth error:', errorMessage);
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    // Initialize auth
    initAuth();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      console.log('🔄 Auth state change:', event);
      setError(null);
      setUser(session?.user || null);
      if (initialized) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [initialized]);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      console.log('🔐 Attempting sign in...');

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
      }

      return { error };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Sign up error:', error);
      }

      return { error };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    try {
      setError(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Sign out error:', error);
      }

      return { error };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        setError(error.message);
        return { error };
      }

      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  return {
    user,
    loading,
    error,
    initialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};
