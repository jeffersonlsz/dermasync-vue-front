<template>
    <div>
      <!-- NAVBAR -->
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <router-link to="/" class="navbar-brand fw-bold text-primary">DermaSync</router-link>
        <div class="ms-auto">
          <router-link to="/login" class="btn btn-primary btn-sm">Entrar</router-link>
        </div>
      </nav>
  
      <!-- CONTEÚDO DA ROTA -->
      <main>
        <slot />
      </main>
  
      <!-- FOOTER -->
      <footer class="bg-white text-center py-4 border-top mt-5">
        <p class="text-muted small mb-0">
          © 2025 DermaSync. Todos os direitos reservados.<br />
          Este site não substitui orientação médica. Leia nossa
          <a href="#">Política de Ética</a>.
        </p>
      </footer>
    </div>
  </template>
  
  <script setup>
  console.log("🧪 BaseLayout foi renderizado");
  </script>
  
  <style scoped>
  main {
    min-height: 80vh;
  }
  </style>
  