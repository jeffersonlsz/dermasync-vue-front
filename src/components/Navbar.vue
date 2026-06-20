<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
    <div class="container mx-auto px-4 h-20 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10.9 14.19 12 15 15 15"/></svg>
        </div>
        <span class="font-heading font-bold text-2xl text-gray-900 tracking-tight">DermaSync</span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-10">
        <RouterLink to="/" class="relative text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2 group">
          Início
          <span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform scale-x-100" v-if="$route.path === '/'"></span>
        </RouterLink>
        <RouterLink to="/galeria" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
          Galeria
        </RouterLink>
        <RouterLink to="/videos-explicativos"
          class="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
          Relatos em Vídeo
        </RouterLink>
        <RouterLink to="/conteudos" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
          Conteúdos
        </RouterLink>
        <RouterLink to="/faq" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
          FAQ
        </RouterLink>
        <RouterLink v-if="canModerate" to="/moderacao" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors py-2">
          Moderação
        </RouterLink>
      </div>

      <!-- Auth Actions -->
      <div class="flex items-center gap-6">
        <template v-if="isAuthenticated">
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary-100 rounded-full border border-primary-300">
            <div class="w-2 h-2 rounded-full bg-primary"></div>
            <span class="text-xs font-semibold text-primary-600">{{ userEmail }}</span>
          </div>
          <button @click="handleLogout" class="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
            Sair
          </button>
        </template>

        <template v-else>
          <button @click="authStore.openLoginModal()"
            class="px-8 py-2.5 text-sm font-bold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            Entrar
          </button>
        </template>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2 text-gray-600" @click="isMenuOpen = !isMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-4 shadow-lg">
      <RouterLink to="/" class="text-base font-medium text-gray-700" @click="isMenuOpen = false">Início</RouterLink>
      <RouterLink to="/galeria" class="text-base font-medium text-gray-700" @click="isMenuOpen = false">Galeria
      </RouterLink>
      <RouterLink to="/videos-explicativos" class="text-base font-medium text-gray-700" @click="isMenuOpen = false">
        Relatos
        em Vídeo</RouterLink>
      <RouterLink to="/faq" class="text-base font-medium text-gray-700" @click="isMenuOpen = false">FAQ</RouterLink>
      <RouterLink v-if="canModerate" to="/moderacao" class="text-base font-bold text-primary"
        @click="isMenuOpen = false">
        Moderação</RouterLink>
      <hr class="border-gray-100">
      <button v-if="!isAuthenticated" @click="openLoginModalMobile"
        class="text-base font-medium text-primary text-left">
        Entrar
      </button>
    </div>

    <!-- Login Modal -->
    <LoginModal :isOpen="authStore.isLoginModalOpen" @close="authStore.closeLoginModal()" />
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginModal from './LoginModal.vue'

const isMenuOpen = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => !!authStore.accessToken)
const userEmail = computed(() => authStore.user?.email || 'Usuário')

const canModerate = computed(() => {
  const role = authStore.user?.role;
  return role === 'admin' || role === 'colaborador';
})

function openLoginModalMobile() {
  isMenuOpen.value = false
  authStore.openLoginModal()
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}
</script>
