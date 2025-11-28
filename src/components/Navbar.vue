<template>
  <nav
    class="navbar navbar-expand-lg sticky-top z-index-3 navbar-transparent bg-white-glass shadow-sm my-3 mx-4 border-radius-xl">
    <div class="container-fluid px-3">
      <!-- Logo -->
      <RouterLink class="navbar-brand fw-bolder text-dark d-flex align-items-center" to="/">
        <span class="logo-text">DermaSync</span>
      </RouterLink>

      <!-- Mobile Toggle -->
      <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
        data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>

      <!-- Navigation Links -->
      <div class="collapse navbar-collapse" id="navigation">
        <ul class="navbar-nav mx-auto ms-xl-auto me-xl-7">
          <li class="nav-item">
            <RouterLink class="nav-link d-flex align-items-center me-2 active" aria-current="page" to="/">
              Início
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link me-2" to="/cadastro">
              Cadastrar-se
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link me-2" to="/videos-explicativos">
              Relatos em vídeo
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link me-2" to="/galeria">
              Galeria
            </RouterLink>
          </li>
        </ul>

        <!-- Right Side: Auth Actions -->
        <ul class="navbar-nav d-lg-block d-none">
          <!-- Logged In State -->
          <li v-if="isAuthenticated" class="nav-item d-flex align-items-center gap-3">
            <div class="user-profile d-flex align-items-center px-3 py-2 bg-gray-100 border-radius-lg">
              <i class="fas fa-user-circle text-primary me-2 text-lg"></i>
              <span class="text-sm fw-bold text-dark">{{ userEmail }}</span>
            </div>
            <button class="btn btn-sm btn-outline-danger mb-0 px-3" @click="handleLogout">
              Sair
            </button>
          </li>

          <!-- Logged Out State -->
          <li v-else class="nav-item">
            <div class="dropdown">
              <button class="btn bg-gradient-primary btn-sm mb-0 px-4" type="button" id="dropdownMenuButton"
                @click="toggleMenu" :aria-expanded="isMenuOpen">
                Entrar
              </button>
              <ul class="dropdown-menu dropdown-menu-end px-4 py-4 me-sm-n4 shadow-lg border-radius-xl"
                :class="{ show: isMenuOpen }" aria-labelledby="dropdownMenuButton">
                <li class="mb-3">
                  <h6 class="text-center font-weight-bolder">Bem-vindo de volta!</h6>
                  <p class="text-xs text-center text-secondary">Insira suas credenciais para entrar.</p>
                </li>
                <li class="mb-3">
                  <div class="form-group">
                    <label for="email" class="form-label text-xs font-weight-bold">Email</label>
                    <input type="email" id="email" class="form-control" placeholder="seu@email.com" v-model="email" />
                  </div>
                </li>
                <li class="mb-3">
                  <div class="form-group">
                    <label for="password" class="form-label text-xs font-weight-bold">Senha</label>
                    <input type="password" id="password" class="form-control" placeholder="******" v-model="password" />
                  </div>
                </li>

                <li v-if="errorMessage" class="mb-2 text-danger text-xs text-center fw-bold">
                  {{ errorMessage }}
                </li>

                <li class="mb-3">
                  <button class="btn btn-primary w-100 mb-0" type="button" @click="handleLogin" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                      aria-hidden="true"></span>
                    {{ isLoading ? 'Entrando...' : 'Entrar' }}
                  </button>
                </li>

                <li class="text-center my-2 position-relative">
                  <p class="text-secondary text-xs bg-white px-2 position-relative z-index-2 d-inline-block mb-0">ou</p>
                  <hr class="horizontal dark position-absolute w-100 top-50 z-index-1 m-0">
                </li>

                <li class="mb-2">
                  <button
                    class="btn btn-outline-light w-100 d-flex align-items-center justify-content-center border-gray-300 text-dark"
                    type="button">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google"
                      class="me-2" width="18">
                    <span class="text-xs font-weight-bold">Entrar com Google</span>
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const isMenuOpen = ref(false)
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => !!authStore.accessToken)
const userEmail = computed(() => authStore.user?.email || 'Usuário')

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await authStore.login(email.value, password.value)
    isMenuOpen.value = false
    // Redirect to gallery
    router.push('/galeria')
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Credenciais inválidas.'
    } else {
      errorMessage.value = 'Erro ao fazer login.'
    }
  } finally {
    isLoading.value = false
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.bg-white-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.logo-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.25rem;
  letter-spacing: -0.5px;
}

.nav-link {
  font-weight: 600;
  font-size: 0.875rem;
  color: #344767;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #cb0c9f;
  /* Primary color hint */
}

.dropdown-menu {
  border: none;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  min-width: 20rem;
}

.form-control:focus {
  border-color: #cb0c9f;
  box-shadow: 0 0 0 2px rgba(203, 12, 159, 0.2);
}

.user-profile {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}
</style>
