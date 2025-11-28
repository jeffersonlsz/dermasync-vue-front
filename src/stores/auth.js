import { defineStore } from 'pinia';
import api from '../lib/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        refreshToken: localStorage.getItem('refresh_token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    actions: {
        setTokens(accessToken, refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;

            // SECURITY NOTE: Storing refresh_token in localStorage is NOT recommended for production due to XSS risks.
            // TODO: Migrate to HttpOnly cookies for production.
            if (process.env.NODE_ENV === 'development') {
                localStorage.setItem('refresh_token', refreshToken);
            }

            // Log for debugging/verification as requested
            console.info('DERMASYNC: TOKEN', {
                access_token: accessToken,
                refresh_token: refreshToken,
            });
        },

        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },

        clearTokens() {
            this.accessToken = null;
            this.refreshToken = null;
            this.user = null;
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        },

        async login(email, password) {
            try {
                const response = await api.post('/auth/login', { email, password });
                const { access_token, refresh_token, expires_at } = response.data;

                this.setTokens(access_token, refresh_token);
                this.setUser({ email }); // Store email from input since backend might not return it

                if (expires_at) {
                    console.info('DERMASYNC: TOKEN EXPIRES AT', expires_at);
                }

                return true;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },

        async register(userData) {
            try {
                const response = await api.post('/auth/register', userData);
                // Check if registration auto-logs in (returns tokens)
                if (response.data && response.data.access_token) {
                    const { access_token, refresh_token } = response.data;
                    this.setTokens(access_token, refresh_token);
                    this.setUser({ email: userData.email });
                    return { success: true, autoLogin: true };
                }
                return { success: true, autoLogin: false };
            } catch (error) {
                console.error('Registration failed:', error);
                throw error;
            }
        },

        async logout() {
            try {
                if (this.refreshToken) {
                    await api.post('/auth/logout', { refresh_token: this.refreshToken });
                }
            } catch (error) {
                console.warn('Logout API call failed', error);
            } finally {
                this.clearTokens();
            }
        }
    },
});
