import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'farmer' | 'consumer';
  avatar?: string;
  location?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'farmer' | 'consumer') => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('hasad_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, type: 'farmer' | 'consumer') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: '1',
      name: type === 'farmer' ? 'John Farmer' : 'Emma Consumer',
      email,
      type,
      avatar: type === 'farmer' ? '👨‍🌾' : '👩‍💼',
      location: type === 'farmer' ? 'Green Valley Farm' : 'Downtown',
      phone: '+1 (555) 123-4567',
    };

    setUser(mockUser);
    localStorage.setItem('hasad_user', JSON.stringify(mockUser));
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      avatar: userData.type === 'farmer' ? '👨‍🌾' : '👩‍💼',
    };

    setUser(newUser);
    localStorage.setItem('hasad_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hasad_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('hasad_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
