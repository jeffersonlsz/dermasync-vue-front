<template>
<nav class="bg-white blur border-radius-xl  navbar navbar-expand-lg sticky-top  z-index-3">
    <div class="container-fluid">
      <!-- Logo -->
      <RouterLink class="navbar-brand fw-bolder text-dark" to="/">DermaSync</RouterLink>

      <!-- Toggle para mobile -->
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>

      <!-- Navegação -->
      <div class="collapse navbar-collapse" id="navigation">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <RouterLink class="nav-link text-dark me-2 px-3" to="/">Início</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-dark me-2 px-3 " to="/cadastro">
              Cadastrar-se
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-dark me-2 px-3 " to="/videos-explicativos">
              Relatos em vídeo
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-dark me-2 px-3" to="/galeria">Galeria</RouterLink>
          </li>
        </ul>

        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item mt-1">
            <button 
              class="nav-link bg-gradient-primary btn btn-sm mt-2 px-4 py-2" 
              id="dropdownMenuButton"
              @click="toggleMenu"
              :aria-expanded="isMenuOpen"
            >
              Entrar
            </button>
            <ul 
              class="dropdown-menu dropdown-menu-end px-4 py-4 me-sm-n4" 
              :class="{ show: isMenuOpen }" 
              aria-labelledby="dropdownMenuButton" 
              data-bs-popper="static"
            >
              <li class="mb-3">
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input 
                type="email" 
                id="email" 
                class="form-control" 
                placeholder="Enter your email" 
                />
              </div>
              </li>
              <li class="mb-3">
              <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <input 
                type="password" 
                id="password" 
                class="form-control" 
                placeholder="Enter your password" 
                />
              </div>
              </li>
              <li class="mb-3">
              <button 
                class="btn btn-primary w-100" 
                type="button"
              >
                Login
              </button>
              </li>
              <li class="text-center mb-2">
              <span class="text-secondary">or</span>
              </li>
              <li class="mb-2">
              <button 
                class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center" 
                type="button"
              >
                <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(3.000000, 2.000000)" fill-rule="nonzero">
                        <path d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267" fill="#4285F4"></path>
                        <path d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667" fill="#34A853"></path>
                        <path d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782" fill="#FBBC05"></path>
                        <path d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769" fill="#EB4335"></path>
                      </g>
                    </g>
                  </svg> 
                
                Login with Google
              </button>
              </li>
              <li>
              <!--button 
                class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center" 
                type="button"
              >
                <i class="fab fa-facebook me-2"></i> Login with Facebook
              </button-->
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

</script>

<style scoped>
.navbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
}

</style>