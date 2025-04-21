<template>
  <div class="card p-4 shadow border-0">
    <h4 class="text-center text-primary mb-4">Login no DermaSync</h4>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="password" required />
      </div>
      <button class="btn btn-primary w-100" type="submit" :disabled="carregando">
        <span v-if="carregando">Entrando...</span>
        <span v-else>Entrar</span>
      </button>
      <p v-if="erro" class="text-danger text-center mt-3">{{ erro }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';

const router = useRouter();

const email = ref('');
const password = ref('');
const erro = ref(null);
const carregando = ref(false);

const login = async () => {
  carregando.value = true;
  erro.value = null;

  try {
    await auth.signOut(); // limpa a sessão antiga
    await signInWithEmailAndPassword(auth, email.value, password.value);

    // Aguarda a sessão ficar pronta
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          unsubscribe();
          resolve();
        }
      });
    });

    // Captura claims
    const tokenResult = await auth.currentUser.getIdTokenResult(true);
    const papel = (tokenResult.claims.role || 'usuario').trim();
    console.log("🎫 Papel via custom claim:", papel);

    // Redireciona via Vue Router
    if (papel === 'admin') {
      router.push('/admin').catch(err => {
          console.error("Erro ao redirecionar:", err);
    });
    } else if (papel === 'colaborador') {
      router.push('/colaborador');
    } else {
      router.push('/galeria'); // ou outro destino padrão
    }

  } catch (e) {
    console.error("❌ Erro no login:", e.code, e.message);
    erro.value = "Credenciais inválidas.";
  } finally {
    carregando.value = false;
  }
};

</script>
