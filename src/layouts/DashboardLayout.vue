<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <router-link to="/" class="navbar-brand fw-bold text-white">DermaSync Painel</router-link>
      <div class="ms-auto">
        <button class="btn btn-outline-light btn-sm" @click="logout">Sair</button>
      </div>
    </nav>

    <main class="container py-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
main {
  min-height: 80vh;
}
</style>
