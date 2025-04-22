<template>
<nav class="navbar navbar-expand-lg blur sticky-top border-radius-xl top-0 z-index-3 shadow mt-2 py-1 px-4 bg-white">
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
            <RouterLink class="nav-link text-sm text-dark me-2 px-3" to="/">Início</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-sm text-dark me-2 px-3" to="/galeria">Galeria</RouterLink>
          </li>
        </ul>

        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <RouterLink to="/login" class="btn bg-gradient-primary btn-sm px-4 py-2">
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

</script>