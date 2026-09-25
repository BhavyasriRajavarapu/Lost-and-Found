import axios from 'axios';

// Determine the API base URL:
// 1. Explicit environment variable (e.g. VITE_API_URL)
// 2. Production fallback to deployed Render backend
// 3. Localhost development fallback to Vite proxy '/api'
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || import.meta.env.PROD)) {
    return 'https://lost-and-found-1-abxg.onrender.com/api';
  }
  return '/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

// Request Interceptor: Attach JWT token to requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle auth expiration / errors gracefully
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on auth/me or protected actions, clear token
      if (error.config.url.includes('/auth/me')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const fetchCurrentUser = () => API.get('/auth/me');

// ==================== ITEMS API ====================
export const fetchItems = (params) => API.get('/items', { params });
export const fetchItemById = (id) => API.get(`/items/${id}`);
export const fetchItemStats = () => API.get('/items/stats');
export const createItem = (itemData) => API.post('/items', itemData);
export const updateItem = (id, itemData) => API.put(`/items/${id}`, itemData);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export default API;
