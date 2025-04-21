<template>
    <BaseLayout>
      <!-- HERO -->
      <section class="hero-bg d-flex align-items-center" style="min-height: 80vh; background: linear-gradient(to right, #edf2f4, #e4ecf0);">
        <div class="container text-center">
          <h1 class="display-5 fw-bold">A comunidade de quem vive a dermatite na pele</h1>
          <p class="lead text-muted mt-3 mb-4">Explore relatos reais. Contribua com sua jornada. Ajude outras pessoas.</p>
          <div class="d-flex justify-content-center gap-3">
            <router-link to="/login" class="btn btn-primary btn-lg">Quero Participar</router-link>
            <router-link to="/galeria" class="btn btn-outline-secondary btn-lg">Galeria Colaborativa</router-link>
          </div>
        </div>
      </section>
  
      <!-- GALERIA MOCK -->
      <section class="container my-5">
        <h2 class="text-center fw-bold mb-4">Galeria colaborativa (exemplo)</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="mock-img">Antes / Durante / Depois</div>
          </div>
          <div class="col-md-4">
            <div class="mock-img">Depoimento sobre tratamento</div>
          </div>
          <div class="col-md-4">
            <div class="mock-img">Contribuição recente</div>
          </div>
        </div>
      </section>
  
      <!-- COMO FUNCIONA -->
      <section class="container my-5">
        <h2 class="text-center fw-bold mb-4">Como funciona</h2>
        <div class="row g-4">
          <div class="col-md-4 text-center">
            <span class="badge bg-primary rounded-pill mb-2">1</span>
            <h5 class="fw-bold">Crie sua conta</h5>
            <p class="text-muted">Cadastre-se em segundos e acesse o painel.</p>
          </div>
          <div class="col-md-4 text-center">
            <span class="badge bg-primary rounded-pill mb-2">2</span>
            <h5 class="fw-bold">Envie sua jornada</h5>
            <p class="text-muted">Compartilhe fotos e informações do seu tratamento.</p>
          </div>
          <div class="col-md-4 text-center">
            <span class="badge bg-primary rounded-pill mb-2">3</span>
            <h5 class="fw-bold">Ajude outras pessoas</h5>
            <p class="text-muted">Sua experiência pode orientar e inspirar alguém.</p>
          </div>
        </div>
      </section>
    </BaseLayout>
  </template>
  
  <script setup>
  import BaseLayout from '../layouts/BaseLayout.vue';
  </script>
  
  <style scoped>
  .mock-img {
    width: 100%;
    height: 180px;
    background: #dee2e6;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-weight: 500;
  }
  </style>
  