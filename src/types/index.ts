export interface Contact {
  contact_id?: number;
  contact_name: string;
  contact_email: string;
  contact_mobile?: string;
  contact_tel?: string;
  contact_address?: string;
  contact_postcode?: string;
  contact_city?: string;
  contact_country?: string;
  contact_nationality?: string;
  contact_nationality_id?: string; // File URL
  contact_type: 'consumer' | 'institutional' | 'corporate';
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: 'farmer' | 'consumer' | 'admin';
  farm_sites?: FarmSite[];
}

export type Language = 'ar' | 'en';

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Farm Management Types
export interface FarmSite {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    country: string;
  };
  type: 'rooftop' | 'greenhouse' | 'indoor' | 'outdoor';
  size: number; // square meters
  status: 'active' | 'maintenance' | 'offline';
  created_at: string;
  updated_at: string;
}

export interface SensorData {
  id: string;
  site_id: string;
  timestamp: string;
  temperature: number; // Celsius
  humidity: number; // percentage
  ph: number;
  ec: number; // electrical conductivity
  water_level: number; // percentage
  water_flow: number; // L/min
  light_intensity: number; // lux
  co2_level: number; // ppm
  nutrient_levels: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  solar_generation: number; // kWh
  energy_consumption: number; // kWh
}

export interface IoTControl {
  id: string;
  site_id: string;
  device_type: 'pump' | 'irrigation' | 'lighting' | 'ventilation' | 'nutrient_doser';
  name: string;
  status: 'on' | 'off' | 'auto' | 'error';
  schedule?: {
    enabled: boolean;
    start_time: string;
    end_time: string;
    days: string[];
    duration?: number; // minutes
  };
  settings: Record<string, any>;
  last_updated: string;
}

export interface Crop {
  id: string;
  site_id: string;
  name: string;
  variety: string;
  category: 'vegetables' | 'fruits' | 'herbs' | 'grains' | 'leafy_greens';
  planted_date: string;
  expected_harvest_date: string;
  actual_harvest_date?: string;
  quantity_planted: number;
  estimated_yield: number; // kg
  actual_yield?: number; // kg
  status: 'planted' | 'growing' | 'flowering' | 'harvest_ready' | 'harvested';
  growth_stage: number; // 0-100 percentage
  health_score: number; // 0-100
  notes: string;
  photos: string[];
  created_at: string;
  updated_at: string;
}

export interface GrowthLog {
  id: string;
  crop_id: string;
  date: string;
  growth_stage: number;
  height: number; // cm
  health_score: number;
  notes: string;
  photos: string[];
  actions_taken: string[];
  created_by: string;
}

export interface Task {
  id: string;
  site_id: string;
  title: string;
  description: string;
  type: 'maintenance' | 'planting' | 'harvesting' | 'cleaning' | 'inspection' | 'nutrient_change';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assigned_to: string;
  due_date: string;
  completed_date?: string;
  checklist: {
    id: string;
    item: string;
    completed: boolean;
  }[];
  recurring: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  site_id: string;
  type: 'threshold' | 'fault' | 'weather' | 'maintenance' | 'harvest';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  data?: Record<string, any>;
  acknowledged: boolean;
  resolved: boolean;
  created_at: string;
  resolved_at?: string;
}

export interface PerformanceMetrics {
  site_id: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date_range: {
    start: string;
    end: string;
  };
  metrics: {
    water_usage: number; // liters
    water_per_kg: number; // L/kg
    energy_consumption: number; // kWh
    energy_per_kg: number; // kWh/kg
    solar_generation: number; // kWh
    carbon_offset: number; // kg CO2
    food_miles_saved: number; // km
    uptime: number; // percentage
    yield_efficiency: number; // percentage
    crop_health_avg: number; // 0-100
  };
}

// Marketplace Types
export interface Product {
  id: string;
  farmer_id: string;
  farm_site_id: string;
  crop_id?: string;
  name: string;
  description: string;
  category: 'vegetables' | 'fruits' | 'herbs' | 'grains' | 'leafy_greens';
  images: string[];
  price: number; // SAR
  unit: 'kg' | 'piece' | 'bunch' | 'box';
  quantity_available: number;
  minimum_order: number;
  harvest_date: string;
  expiry_date: string;
  organic_certified: boolean;
  farm_provenance: {
    farm_name: string;
    location: string;
    farming_method: 'hydroponic' | 'organic' | 'conventional';
    certifications: string[];
  };
  seasonality: {
    peak_season: string[];
    available_months: string[];
  };
  nutritional_info?: {
    calories_per_100g: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    vitamins: Record<string, number>;
  };
  status: 'available' | 'out_of_stock' | 'pre_order' | 'discontinued';
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  type: 'farm_to_door' | 'adopt_a_rooftop' | 'seasonal_box';
  name: string;
  description: string;
  price: number; // SAR per delivery
  frequency: 'weekly' | 'bi_weekly' | 'monthly';
  duration: number; // months
  products: {
    product_id: string;
    quantity: number;
    substitution_allowed: boolean;
  }[];
  delivery_schedule: {
    day_of_week: number; // 0-6
    time_slot: string;
    address: string;
  };
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  next_delivery: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  type: 'regular' | 'subscription' | 'b2b';
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    farmer_id: string;
    farm_name: string;
  }[];
  subtotal: number;
  delivery_fee: number;
  tax: number;
  discount: number;
  total: number;
  currency: 'SAR';
  payment_method: 'mada' | 'sadad' | 'credit_card' | 'cash_on_delivery';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  delivery_address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    coordinates?: { lat: number; lng: number };
  };
  delivery_window: {
    date: string;
    time_slot: string;
  };
  status:
    | 'placed'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled';
  tracking_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  delivered_at?: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  order_id: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  photos: string[];
  verified_purchase: boolean;
  helpful_votes: number;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: {
    product_id?: string;
    name: string;
    quantity: string;
    unit: string;
  }[];
  instructions: string[];
  prep_time: number; // minutes
  cook_time: number; // minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine_type: string;
  dietary_tags: string[];
  images: string[];
  nutrition_facts?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  message: string;
  message_type: 'text' | 'image' | 'order' | 'product';
  attachments?: string[];
  metadata?: Record<string, any>;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'customer_farmer' | 'support' | 'group';
  title?: string;
  last_message: Message;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date_range: {
    start: string;
    end: string;
  };
  metrics: {
    // Revenue metrics
    mrr: number; // Monthly Recurring Revenue
    total_revenue: number;
    average_order_value: number;

    // Product metrics
    products_sold: number;
    top_selling_products: {
      product_id: string;
      name: string;
      quantity_sold: number;
      revenue: number;
    }[];

    // Customer metrics
    new_customers: number;
    returning_customers: number;
    customer_acquisition_cost: number;
    customer_lifetime_value: number;
    churn_rate: number;

    // Engagement metrics
    active_users: number;
    page_views: number;
    session_duration: number;
    bounce_rate: number;

    // Conversion metrics
    conversion_rate: number;
    cart_abandonment_rate: number;

    // Referral metrics
    referral_count: number;
    referral_conversion_rate: number;
  };
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'order' | 'delivery' | 'payment' | 'system' | 'marketing' | 'farm_alert';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  action_url?: string;
  created_at: string;
  expires_at?: string;
}

export interface UserPreferences {
  user_id: string;
  language: 'ar' | 'en';
  currency: 'SAR';
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
    order_updates: boolean;
    farm_alerts: boolean;
    price_alerts: boolean;
  };
  delivery_preferences: {
    default_address: string;
    preferred_time_slots: string[];
    special_instructions: string;
  };
  dietary_preferences: string[];
  favorite_farmers: string[];
  privacy_settings: {
    profile_visibility: 'public' | 'private';
    data_sharing: boolean;
    analytics_tracking: boolean;
  };
}
