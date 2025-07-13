import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getToken } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = getToken();
        if (token) {
          const decodedUser = isAuthenticated();
          if (decodedUser) {
            setAuth(decodedUser);
          } else {
            // Token is invalid or expired, remove it
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const updateAuth = (user) => {
    setAuth(user);
  };

  const value = {
    auth,
    setAuth: updateAuth,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
