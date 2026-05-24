<template>
  <div class="card p-4 shadow border-0">
    <h4 class="text-center text-primary mb-4">Login no DermaSync</h4>

    <form @submit.prevent="doLogin">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Senha</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button class="btn btn-primary w-100" type="submit" :disabled="loading">
        <span v-if="loading">Entrando...</span>
        <span v-else>Entrar</span>
      </button>

      <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

async function doLogin() {
  loading.value = true;
  error.value = null;

  try {
    await authStore.login(email.value, password.value);
    const role = authStore.user?.role;
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'colaborador') {
      router.push('/moderacao');
    } else {
      router.push('/galeria');
    }
  } catch (err) {
    console.error('Erro no login:', err);
    error.value = 'Não foi possível entrar. Verifique suas credenciais.';
  } finally {
    loading.value = false;
  }
}
</script>
