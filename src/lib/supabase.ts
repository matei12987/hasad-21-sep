import { createClient } from '@supabase/supabase-js';

// Supabase configuration with proper validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL is missing');
}
if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is missing');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing required Supabase environment variables');
  console.error(
    'Please check your .env file and ensure both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set'
  );
}

// Create Supabase client with proper configuration
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Simple connection check
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Database schema types
export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          contact_id: number;
          contact_name: string;
          contact_email: string;
          contact_mobile: string | null;
          contact_tel: string | null;
          contact_address: string | null;
          contact_postcode: string | null;
          contact_city: string | null;
          contact_country: string | null;
          contact_nationality: string | null;
          contact_nationality_id: string | null;
          contact_type: 'consumer' | 'institutional' | 'corporate';
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['contacts']['Row'],
          'contact_id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>;
      };
    };
  };
}
