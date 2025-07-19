'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  user: { name: string; email: string ; subId: string | null ; pic: string | null ; jwt: string} | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string ; subId: string | null ; pic: string | null ; jwt: string} | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string ; subId: string | null ; pic: string | null ; jwt: string} | null>(null);

  useEffect(() => {
    const mila = localStorage.getItem('bnda');

    if (mila) {
      const temp = JSON.parse(mila);
      setUser(temp);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};