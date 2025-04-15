import axios from 'axios';
import { env } from '@/config/env';
import { supabase } from '@/lib/supabase';

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const session = await supabase.auth.getSession();
    if (session?.data?.session?.access_token) {
      config.headers.Authorization = `Bearer ${session.data.session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
      if (session && !refreshError) {
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
); 