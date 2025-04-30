<template>
  <BaseLayout>
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div class="w-100" style="max-width: 400px;">
        <LoginForm />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
console.log("✅ LoginView carregado via Vue Router");
import { onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import LoginForm from '../components/LoginForm.vue';
import { useRouter } from 'vue-router';
import BaseLayout from '../layouts/BaseLayout.vue';

const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    console.log("👤 Sessão detectada:", auth.currentUser?.email || 'deslogado');
    if (user) {
      
      const token = await user.getIdTokenResult(true);
      const role = (token.claims.role || 'usuario').trim();
      console.log("🎫 Papel via custom claim:", role);
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'colaborador') {
        router.push('/colaborador');
      } else if (role === 'usuario') {
        router.push('/login');
      } 
      else {
        router.push('/');
      }
    }
  });
});


</script>
