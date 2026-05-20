import { useAuthStore } from '../stores/auth';

export async function login(email, password) {
  const authStore = useAuthStore();
  await authStore.login(email, password);
  return { user: authStore.user };
}
