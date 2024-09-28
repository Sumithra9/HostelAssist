// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/users/login', { email, password });
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  };

  const signup = async (userData) => {
    const response = await axios.post('/api/users/register', userData);
    setUser(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
