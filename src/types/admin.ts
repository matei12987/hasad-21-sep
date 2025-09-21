// Admin Dashboard Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'consumer';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  location: string;
  joinDate: string;
  lastActive: string;
  farmSites?: number;
  totalOrders?: number;
  revenue?: number;
  devices?: number;
  subscription?: {
    tier: 'basic' | 'premium' | 'enterprise' | 'trial';
    status: 'active' | 'inactive' | 'expired' | 'cancelled';
    expiryDate: string;
  };
  profile?: {
    phone?: string;
    avatar?: string;
    verified: boolean;
    farmName?: string;
    farmType?: 'hydroponic' | 'organic' | 'conventional' | 'greenhouse';
    certifications?: string[];
    preferences?: {
      organic_only?: boolean;
      delivery_window?: string;
      dietary_restrictions?: string[];
    };
  };
  deviceStatus?: {
    online: number;
    offline: number;
    maintenance: number;
    lastUpdate: string;
  };
  recentActivity?: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }[];
}

export interface AdminAlert {
  id: string;
  type:
    | 'device_fault'
    | 'threshold_exceeded'
    | 'maintenance_due'
    | 'connectivity_issue'
    | 'harvest_ready'
    | 'system_update';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  source: string;
  user_id?: string;
  device_id?: string;
  acknowledged: boolean;
  resolved: boolean;
  created_at: string;
  acknowledged_at?: string;
  resolved_at?: string;
  metadata?: Record<string, any>;
}

export interface AdminKPI {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  period: 'daily' | 'weekly' | 'monthly';
  lastUpdated: string;
}

export interface AdminSystemStatus {
  uptime: number;
  totalUsers: number;
  activeDevices: number;
  dataProcessed: string;
  avgResponseTime: number;
  lastUpdate: string;
}
