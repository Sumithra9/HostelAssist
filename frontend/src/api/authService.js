import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/'; // Adjust as necessary

// Register user
const register = async (username, password) => {
  const response = await axios.post(API_URL + 'register', { username, password });
  return response.data;
};

// Login user
const login = async (username, password) => {
  const response = await axios.post(API_URL + 'login', { username, password });
  return response.data;
};

// Logout user (Clear token)
const logout = () => {
  localStorage.removeItem('user');
};

export default { register, login, logout };
