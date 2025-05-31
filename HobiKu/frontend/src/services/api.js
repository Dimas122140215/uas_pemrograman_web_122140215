// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:6543/api/auth',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (err) {
    console.error('Registration failed:', err.response?.data || err.message);
    throw new Error(err.response?.data?.error || 'Registration failed');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    throw new Error('Invalid email or password');
  }
};