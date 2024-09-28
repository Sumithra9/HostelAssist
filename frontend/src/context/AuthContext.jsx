import React, { createContext, useContext, useState } from 'react';
import authService from '../api/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const register = async (username, password) => {
    return await authService.register(username, password);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
