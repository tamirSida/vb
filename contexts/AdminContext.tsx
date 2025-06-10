'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../lib/firebase/config';
import { User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  isAdminMode: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleAdminMode: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin (customize this logic for your needs)
  const isAdmin = user ? (
    user.email?.includes('@versionbravo.com') ||
    user.email === 'tamir@versionbravo.com' || // Your admin email
    user.email === 'admin@vbsite.com'
  ) : false;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Auto-disable admin mode if user logs out
      if (!user) {
        setIsAdminMode(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAdminMode(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const toggleAdminMode = () => {
    if (isAdmin) {
      setIsAdminMode(!isAdminMode);
    }
  };

  const value = {
    user,
    isAdmin,
    isAdminMode,
    loading,
    login,
    logout,
    toggleAdminMode,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}