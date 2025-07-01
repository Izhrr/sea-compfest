import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Subscription API
export const subscriptionAPI = {
  // Create new subscription
  create: async (subscriptionData) => {
    try {
      const response = await api.post('/subscription', subscriptionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  // Get all subscriptions (optional)
  getAll: async () => {
    try {
      const response = await api.get('/subscription');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Review API
export const reviewAPI = {
  create: async (reviewData) => {
    try {
      const response = await api.post('/review', reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getAll: async () => {
    try {
      const response = await api.get('/review');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// Contact Us API
export const contactAPI = {
  create: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};