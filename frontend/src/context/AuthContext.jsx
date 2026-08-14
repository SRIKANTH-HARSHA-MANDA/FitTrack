import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('fittrack_token');

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/user/profile')
      .then((r) => setUser(r.data))
      .catch(() => localStorage.removeItem('fittrack_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    const r = await api.post('/auth/login', data);
    localStorage.setItem('fittrack_token', r.data.token);
    setUser(r.data.user);
  };

  const register = async (data) => {
    const r = await api.post('/auth/register', data);
    localStorage.setItem('fittrack_token', r.data.token);
    setUser(r.data.user);
  };

  const logout = () => {
    localStorage.removeItem('fittrack_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);