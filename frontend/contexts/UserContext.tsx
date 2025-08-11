'use client';

import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUserDetail, isLoggedIn, doLogout } from '../auth'; // Adjust the import path as necessary
import ClientOnly from '@/components/basicComponents/ClientOnly'; // Import ClientOnly component

interface UserContextType {
  user: { fullname: string; email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ fullname: string; email: string } | null>>; 
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<{ fullname: string; email: string } | null>(null);

  useEffect(() => {
    if (isLoggedIn()) {
      setUser(getCurrentUserDetail());
    }
  }, []);

  const logout = () => {
    doLogout(() => {
      setUser(null);
    });
  };

  return (
    <ClientOnly>
      <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
      </UserContext.Provider>
    </ClientOnly>
  );
};
