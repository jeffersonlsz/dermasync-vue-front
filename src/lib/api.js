import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import router from '../router';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Adjust base URL as needed or keep empty if proxying
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization header
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 and Refresh Token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const authStore = useAuthStore();
      console.info('DERMASYNC: REFRESH ATTEMPT');

      try {
        // Call refresh action from store
        // Note: We use axios directly here or a specific instance to avoid interceptor loop if needed,
        // but since refresh endpoint is usually public or uses refresh token in body, it might be fine.
        // However, to be safe and strictly follow "body { refresh_token }", we do:

        // We need to access the store's refresh action or logic. 
        // Ideally, the store handles the API call. But here we are inside the API interceptor.
        // Circular dependency risk if store imports API. 
        // Solution: We'll manually make the refresh call here or use a separate axios instance for refresh if needed.
        // For simplicity, we'll assume authStore has a method or we do it here.
        // Let's do it here to keep api logic encapsulated, or call a store method that doesn't use *this* api instance for the refresh call itself if possible.
        // Actually, the prompt says: "POST /auth/refresh — body { refresh_token }".

        const refreshToken = authStore.refreshToken;

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Using a clean axios instance for refresh to avoid interceptors
        const response = await axios.post('/auth/refresh', { refresh_token: refreshToken });

        const { access_token, refresh_token: newRefreshToken } = response.data;

        authStore.setTokens(access_token, newRefreshToken);

        processQueue(null, access_token);

        // Update header and retry original
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        authStore.logout(); // Clear state
        router.push('/login');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
