// src/api.js
import axios from 'axios';
import { redirectToLogin } from './utils/auth'; // Import the redirectToLogin utility

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: 'https://api.okurentals.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to indicate if a token refresh is in progress
let isRefreshing = false;

// Array to hold pending requests while token is being refreshed
let refreshSubscribers = [];

// Helper function to add subscribers for token refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Helper function to execute all subscribers once the token is refreshed
const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Create a separate Axios instance for refresh requests to avoid triggering interceptors
const refreshInstance = axios.create({
  baseURL: 'https://api.okurentals.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('admin_refresh_token');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await refreshInstance.post('/auth/v1/token/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;

    // Update access token in localStorage
    localStorage.setItem('admin_access_token', newAccessToken);

    // Update the Authorization header in the main Axios instance
    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error.response?.data || error.message);
    throw error;
  }
};

// Response interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    const originalRequest = error.config;

    // If the error is not 401 or the original request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Mark the original request as retried
    originalRequest._retry = true;

    if (isRefreshing) {
      // If a refresh is already in progress, queue the request
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newAccessToken) => {
          // Update the Authorization header and retry the request
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    // If no refresh is in progress, start refreshing
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();

      // Notify all subscribers with the new access token
      onRefreshed(newAccessToken);

      // Retry the original request with the new access token
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (err) {
      // If refresh fails, clear tokens and redirect to login
      localStorage.removeItem('admin_access_token');
      localStorage.removeItem('admin_refresh_token');
      localStorage.removeItem('admin_user');
      redirectToLogin();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

// Request interceptor to attach the access token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('admin_access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
