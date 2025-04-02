
import axios from 'axios';

// Create a configured axios instance
const api = axios.create({
  // In a real app, this would point to your backend API
  // For now, we'll use a public API for demonstration
  baseURL: 'https://api.npoint.io/c3d47d35ff8c5d98e527',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
