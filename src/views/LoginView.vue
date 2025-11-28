<!--
  MANUAL TESTING INSTRUCTIONS:
  
  1. Prerequisites:
     - Backend running and accessible at VITE_API_URL (or proxy configured).
     - Open Browser DevTools (F12) -> Console.
  
  2. Test Login Success:
     - Enter valid email and password.
     - Click "Login".
     - Observe Console: "DERMASYNC: TOKEN" with token details.
     - Verify redirection to /dashboard (or home).
     - Check localStorage: 'refresh_token' should be present.
  
  3. Test Login Failure:
     - Enter invalid credentials.
     - Click "Login".
     - Verify error message is displayed on screen.
  
  4. Test Token Refresh (requires short-lived access token or manual tampering):
     - Log in successfully.
     - In DevTools, delete 'access_token' from memory (refresh page to clear store if not persisted, but refresh_token is in localstorage).
     - Wait for token expiry OR manually trigger a 401 (requires backend cooperation or mock).
     - Observe Console: "DERMASYNC: REFRESH ATTEMPT".
-->

<template>
  <div class="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h2 class="text-center mb-4">DermaSync Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" required placeholder="name@example.com">
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required>
        </div>

        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="mt-3 text-center">
        <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    await authStore.login(email.value, password.value);
    // Redirect to gallery
    router.push('/galeria');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Invalid credentials. Please try again.';
    } else {
      errorMessage.value = 'An error occurred. Please try again later.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
}
</style>
