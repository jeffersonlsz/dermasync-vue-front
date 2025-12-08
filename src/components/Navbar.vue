<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="font-heading font-bold text-xl text-gray-900 tracking-tight">DermaSync</span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink to="/" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
          Início
        </RouterLink>
        <RouterLink to="/galeria" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
          Galeria
        </RouterLink>
        <RouterLink to="/videos-explicativos"
          class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
          Relatos em Vídeo
        </RouterLink>
      </div>

      <!-- Auth Actions -->
      <div class="flex items-center gap-4">
        <template v-if="isAuthenticated">
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-xs font-semibold text-gray-700">{{ userEmail }}</span>
          </div>
          <button @click="handleLogout" class="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
            Sair
          </button>
        </template>

        <template v-else>
          <button @click="isLoginModalOpen = true"
            class="px-5 py-2 text-sm font-semibold text-primary border border-primary rounded-full hover:bg-primary/5 transition-colors">
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
      <hr class="border-gray-100">
      <button v-if="!isAuthenticated" @click="openLoginModalMobile"
        class="text-base font-medium text-primary text-left">
        Entrar
      </button>
    </div>

    <!-- Login Modal -->
    <LoginModal :isOpen="isLoginModalOpen" @close="isLoginModalOpen = false" />
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginModal from './LoginModal.vue'

const isMenuOpen = ref(false)
const isLoginModalOpen = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => !!authStore.accessToken)
const userEmail = computed(() => authStore.user?.email || 'Usuário')

function openLoginModalMobile() {
  isMenuOpen.value = false
  isLoginModalOpen.value = true
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>
