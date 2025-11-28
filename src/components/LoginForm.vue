<template>
  <div class="card p-4 shadow border-0">
    <h4 class="text-center text-primary mb-4">Login no DermaSync</h4>

    <form @submit.prevent="doLogin">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="password" required />
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
import { ref } from 'vue'
import { login } from '../services/authService'
import { useRouter } from 'vue-router'
import api from '../lib/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

async function doLogin() {
  loading.value = true
  error.value = null

  try {
    const response = await login(email.value, password.value)

    // Check if token exists in response
    const token = response.token || response.access_token
    if (!token) {
      throw new Error('Token não retornado pelo servidor')
    }

    // Salvar token no localStorage como authToken como solicitado
    localStorage.setItem('authToken', token)

    // Get user profile to determine role after login
    const profile = await api.get('/auth/me').then(r => r.data)
    const role = profile.role || 'usuario'

    // Decide where to redirect based on user role
    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'colaborador') {
      router.push('/colaborador')
    } else {
      router.push('/galeria') // Default dashboard page
    }
  } catch (e) {
    console.error('Erro no login:', e)
    // Exibir mensagens de erro vindas da API como solicitado
    error.value = e.message || 'Credenciais inválidas.'
  } finally {
    loading.value = false
  }
}
</script>
