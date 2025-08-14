'use client';

import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUserDetail, isLoggedIn, doLogout } from '../auth/index'; 
import ClientOnly from '../src/components/basicComponents/ClientOnly'; 

interface UserContextType {
  user: { fullname: string; email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ fullname: string; email: string } | null>>; 
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<{ fullname: string; email: string } | null>(null);

 useEffect(() => {
  const fetchUser = async () => {
    if (isLoggedIn()) {
      try {
        const userData = await getCurrentUserDetail();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user detail:", err);
        setUser(null);
      }
    }
  };
  fetchUser();
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
