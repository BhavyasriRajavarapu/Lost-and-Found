import axios from 'axios';

// Create Axios client with base URL
// In development, Vite proxy forwards /api to http://localhost:5000
// In production or custom env, VITE_API_URL can be set
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Item API endpoints
export const fetchItems = (params) => API.get('/items', { params });
export const fetchItemById = (id) => API.get(`/items/${id}`);
export const fetchItemStats = () => API.get('/items/stats');
export const createItem = (itemData) => API.post('/items', itemData);
export const updateItem = (id, itemData) => API.put(`/items/${id}`, itemData);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export default API;
