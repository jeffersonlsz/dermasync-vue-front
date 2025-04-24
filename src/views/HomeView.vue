<template>
    <BaseLayout>
<!-- HERO COM IMAGEM -->
<section class="hero-section my-4">
  <div class="hero-overlay"></div>

  <div class="container hero-content">
    <div class="row">
      <div class="col-lg-8">
        <h1 class="fw-bold mb-3">
          Conectando pessoas com soluções para <span class="text-primary">Dermatite Atópica</span>
        </h1>
        <p class="text-muted mb-4">
          Uma plataforma colaborativa onde você pode obter ajuda a partir de experiências reais de outras pessoas.
        </p>
        <div class="d-flex flex-column flex-sm-row gap-3">
          <router-link to="/login" class="btn btn-primary btn-lg">Quero Participar</router-link>
          <router-link to="/galeria" class="btn btn-outline-secondary btn-lg">Compartilhar sua experiência</router-link>
        </div>
      </div>
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
<section class="container text-center my-5">
  <h2 class="fw-bold mb-5">Como Funciona</h2>
  <div class="row g-5 justify-content-center">
    <!-- Passo 1 -->
    <div class="col-md-4">
      <div class="icon-wrapper mx-auto mb-3">
        <i class="bi bi-upload fs-2 text-primary"></i>
      </div>
      <h6 class="fw-bold">1. Envie sua foto</h6>
      <p class="text-muted">Compartilhe sua jornada com segurança e anonimato.</p>
    </div>

    <!-- Passo 2 -->
    <div class="col-md-4">
      <div class="icon-wrapper mx-auto mb-3">
        <i class="bi bi-image fs-2 text-success"></i>
      </div>
      <h6 class="fw-bold">2. Veja experiências reais</h6>
      <p class="text-muted">Explore nossa galeria colaborativa de casos reais.</p>
    </div>

    <!-- Passo 3 -->
    <div class="col-md-4">
      <div class="icon-wrapper mx-auto mb-3">
        <i class="bi bi-lightbulb fs-2 text-warning"></i>
      </div>
      <h6 class="fw-bold">3. Descubra o que funciona</h6>
      <p class="text-muted">Aprenda com dicas e soluções que deram certo para outros.</p>
    </div>
  </div>

  <!-- Rodapé de confiança -->
  <p class="text-muted fw-semibold mt-5">
    <i class="bi bi-lock-fill text-warning me-2"></i>
    <strong>100% Anônimo</strong> – Você pode participar com segurança
  </p>
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

  .hero-section {
  position: relative;
  min-height: 80vh;
  border-radius: 1rem;
  overflow: hidden;
  background-image: url('/img/hero-dermatite_002.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.85) 20%, rgba(255, 255, 255, 0.65) 50%, rgba(255, 255, 255, 0.3) 80%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 2rem;
}

@media (max-width: 768px) {
  .hero-content {
    text-align: center;
  }
}

  </style>
  