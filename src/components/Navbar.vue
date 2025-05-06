<template>
<nav class="bg-white blur border-radius-xl mt-2 navbar navbar-expand-lg px-4 py-1 sticky-top top-0 z-index-3">
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
            <RouterLink class="nav-link text-dark me-2 px-3" to="/galeria">Galeria</RouterLink>
          </li>
        </ul>

        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item mt-1">
            <RouterLink to="/login" class="bg-gradient-primary btn btn-sm mt-2 px-4 py-2">
              Entrar
            </RouterLink>
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