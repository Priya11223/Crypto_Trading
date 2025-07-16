'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextProps {
  user: { name: string; email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string } | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

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