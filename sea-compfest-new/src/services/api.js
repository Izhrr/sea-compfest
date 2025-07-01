import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
      const response = await api.post('/subscriptions', subscriptionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all subscriptions
  getAll: async () => {
    try {
      const response = await api.get('/subscriptions');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get subscription by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update subscription status
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/subscriptions/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Testimonial API
export const testimonialAPI = {
  // Create new testimonial
  create: async (testimonialData) => {
    try {
      const response = await api.post('/testimonials', testimonialData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all approved testimonials
  getAll: async () => {
    try {
      const response = await api.get('/testimonials');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all testimonials for admin
  getAllForAdmin: async () => {
    try {
      const response = await api.get('/testimonials/admin');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Approve testimonial
  approve: async (id) => {
    try {
      const response = await api.put(`/testimonials/${id}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete testimonial
  delete: async (id) => {
    try {
      const response = await api.delete(`/testimonials/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default api;