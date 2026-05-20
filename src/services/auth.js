import { useAuthStore } from '../stores/auth';

export async function login(email, password) {
  const authStore = useAuthStore();
  await authStore.login(email, password);
  return { user: authStore.user };
}

export async function logout() {
  const authStore = useAuthStore();
  await authStore.logout();
}

export function isAuthenticated() {
  return !!localStorage.getItem('firebase_id_token');
}

export function getAuthToken() {
  return localStorage.getItem('firebase_id_token');
}

export async function getProfile() {
  const authStore = useAuthStore();
  return authStore.user;
}
