<template>
    <BaseLayout>

    <!-- HERO SECTION -->
    <section class="hero-section">
        <div class="hero-overlay">
          <h1 class="hero-title">
            Você não está só! <br />
            Aprenda o que funcionou para outras pessoas <br />
            <span class="highlight">Dermatite Atópica</span>
          </h1>
          <p class="hero-subtext">
            
            Aprenda com pessoas reais que enfrentam o mesmo desafio.
            <br />
            Ensine o que funcionou pra você e ajude outros a encontrar alívio.
            <br />

      
          </p>

          <div class="hero-buttons">
            <RouterLink to="/galeria" class="btn btn-primary">Explorar Galeria</RouterLink>
            <RouterLink to="/formulario" class="btn btn-secondary">Compartilhar sua experiência</RouterLink>
          </div>

          <p class="hero-promise">
            🎯 Veja relatos reais de pessoas lidando com dermatite atópica — descubra o que funcionou na prática.
          </p>
        </div>
    </section>
  
<HomeGaleriaColaborativa/>
  
<!-- COMO FUNCIONA -->
<section class="container text-center py-5">
  <h2 class="fw-bold mb-5">Como Funciona</h2>
  <div class="row g-4 justify-content-center">
    <!-- Passo 1 -->
    <div class="col-md-4">
      <div class="icon-wrapper mx-auto mb-3">
        <i class="bi bi-upload fs-2 text-primary"></i>
      </div>
      <h5 class="fw-bold">1. Envie sua jornada</h5>
      <p class="text-muted">Compartilhe sua jornada com segurança e anonimato.</p>
    </div>

    <!-- Passo 2 -->
    <div class="col-md-4">
      <div class="icon-wrapper mx-auto mb-3">
        <i class="bi bi-image fs-2 text-success"></i>
      </div>
      <h5 class="fw-bold">2. Veja experiências reais</h5>
      <p class="text-muted">Explore nossa galeria colaborativa de casos reais.</p>
    </div>

    <!-- Passo 3 -->
    <div class="col-md-4">
      <div class="icon-wrapper mx-auto mb-3">
        <i class="bi bi-lightbulb fs-2 text-warning"></i>
      </div>
      <h5 class="fw-bold">3. Descubra o que funciona</h5>
      <p class="text-muted">Aprenda com dicas e soluções que deram certo para outros.</p>
    </div>
  </div>

  
</section>
<section class="container text-center py-5">
  <!-- Rodapé de confiança -->
  <p class="text-muted fw-semibold mt-5">
    <i class="bi bi-lock-fill text-warning me-2"></i>
    <strong>100% Anônimo</strong> – Protegemos seus dados e privacidade
  </p>

</section>

    </BaseLayout>
  </template>
  
  <script setup>
  import BaseLayout from '../layouts/BaseLayout.vue';
  import HomeGaleriaColaborativa from '../components/HomeGaleriaColaborativa.vue';
  </script>
  
  <style scoped>

  .navbar {
    background-color: rgba(20, 20, 20, 0.85) !important; /* tom escuro translúcido */
    backdrop-filter: blur(6px); /* dá um efeito sutil moderno */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-section {
  position: relative;
  height: 70vh;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)),
    url('/img/hero-dermatite_002.png') center center / cover no-repeat;
  display: flex;
  align-items: center;
  padding: 2rem;
  color: white;
}

.hero-overlay {
  max-width: 700px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.highlight {
  color: #7f9cf5; /* tom azul violeta */
}

.hero-subtext {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: #7f56d9;
  color: white;
}

.btn-primary:hover {
  background-color: #6b46c1;
}

.btn-secondary {
  background-color: white;
  color: #7f56d9;
  border: 1px solid #7f56d9;
}

.btn-secondary:hover {
  background-color: #f0f0f0;
}

.hero-promise {
  font-size: 0.95rem;
  color: #f1f1f1;
  margin-top: 0.5rem;
  max-width: 500px;
}

.passo-como-funciona{
  background-color: #dee2e6;
  border-radius: 6%;
}

@media (max-width: 600px) {
  .hero-section {
    padding: 1.5rem 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }

  .hero-promise {
    font-size: 0.9rem;
  }
}

  </style>
  