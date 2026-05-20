import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import api from '../lib/api';
import { auth } from '../firebase/config';

function waitForAuthState() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

function normalizeUser(sessionUser, firebaseUser) {
  return {
    id: sessionUser?.id || sessionUser?.user_id || firebaseUser?.uid || null,
    firebase_uid: sessionUser?.firebase_uid || firebaseUser?.uid || null,
    email: sessionUser?.email || firebaseUser?.email || null,
    display_name: sessionUser?.display_name || sessionUser?.nome || firebaseUser?.displayName || null,
    avatar_url: sessionUser?.avatar_url || firebaseUser?.photoURL || null,
    role: sessionUser?.role || 'usuario_logado',
    is_active: sessionUser?.is_active ?? true,
  };
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('firebase_id_token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    initialized: false,
    isLoginModalOpen: false,
  }),
  actions: {
    setSession(firebaseToken, user) {
      this.accessToken = firebaseToken;
      this.user = user;
      localStorage.setItem('firebase_id_token', firebaseToken);
      localStorage.setItem('authToken', firebaseToken);
      localStorage.setItem('user', JSON.stringify(user));
    },

    clearSession() {
      this.accessToken = null;
      this.user = null;
      localStorage.removeItem('firebase_id_token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },

    async exchangeFirebaseToken(firebaseToken, firebaseUser = auth.currentUser) {
      // Define o token temporariamente para que o interceptador axios o envie
      this.accessToken = firebaseToken;
      
      await api.post('/auth/session', {
        firebase_id_token: firebaseToken,
      });
      const response = await api.get('/auth/me');
      const normalizedUser = normalizeUser(response.data, firebaseUser);
      this.setSession(firebaseToken, normalizedUser);
      return normalizedUser;
    },

    async syncSession(forceRefresh = false) {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        this.clearSession();
        return null;
      }

      const firebaseToken = await firebaseUser.getIdToken(forceRefresh);
      return this.exchangeFirebaseToken(firebaseToken, firebaseUser);
    },

    async initialize() {
      if (this.initialized) {
        return;
      }

      await waitForAuthState();

      if (auth.currentUser) {
        try {
          await this.syncSession(false);
        } catch (error) {
          console.error('Failed to initialize auth session:', error);
          this.clearSession();
        }
      } else {
        this.clearSession();
      }

      this.initialized = true;
    },

    async login(email, password) {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await credential.user.getIdToken();
      await this.exchangeFirebaseToken(firebaseToken, credential.user);
      return true;
    },

    async register(userData) {
      const credential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const firebaseToken = await credential.user.getIdToken();
      await this.exchangeFirebaseToken(firebaseToken, credential.user);
      return { success: true, autoLogin: true };
    },

    async refreshSession() {
      return this.syncSession(true);
    },

    async logout() {
      try {
        await api.post('/auth/logout');
      } catch (error) {
        console.warn('Logout API call failed', error);
      } finally {
        await signOut(auth);
        this.clearSession();
      }
    },

    openLoginModal() {
      this.isLoginModalOpen = true;
    },

    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
  },
});
