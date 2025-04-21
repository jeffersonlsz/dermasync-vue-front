<template>
  <router-view />
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

// Você pode ainda proteger rotas futuras aqui se quiser
onAuthStateChanged(auth, (user) => {
  console.log("👤 Sessão detectada:", user?.email || 'deslogado');
  
});
</script>
