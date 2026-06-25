import axios from 'axios';
import { getToken } from '../../features/auth/utils/authStorage';

const getBaseURL = () => {
  // Smart fallback: if running locally, point to local server
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  
  return 'https://smartnestpro.onrender.com/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
