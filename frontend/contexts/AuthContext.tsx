
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { keycloak, initKeycloak, setAuthToken, refreshTokenIfNeeded } from '@/services/keycloakService/keycloak';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<typeof keycloak.tokenParsed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await initKeycloak();
        if (authenticated) {
          setIsAuthenticated(true);
          setUser(keycloak.tokenParsed ?? null);
          setAuthToken();
          
          setInterval(refreshTokenIfNeeded, 60000);
        }
      } catch (error) {
        console.error('Keycloak initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
