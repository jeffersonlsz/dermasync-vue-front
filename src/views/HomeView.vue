<template>
    <BaseLayout>

<!-- HERO SECTION -->
<section class="hero-section flex flex-col lg:flex-row items-center justify-between gap-8 px-6 py-12 max-w-7xl mx-auto">
  
  <!-- Texto à esquerda -->
  <div class="hero-overlay space-y-6">
    <h1 class="hero-title">
      
      Aprenda com outras pessoas sobre <br />
      <span class="highlight">Dermatite Atópica</span>
    </h1>

    <p class="hero-subtext">
      Depoimentos reais. <br />
      Soluções testadas <br />
      Obtenha descontos em medicamentos.
    </p>

    <div class="hero-buttons flex flex-wrap gap-4 remove-mobile">
      <RouterLink to="/galeria" class="btn btn-primary">Explorar Galeria</RouterLink>
      <RouterLink to="/formulario" class="btn btn-secondary ">Compartilhar sua experiência</RouterLink>
    </div>

    <p class="hero-promise remove-mobile">
      🎯 Veja relatos reais de pessoas lidando com dermatite atópica — descubra o que funcionou na prática.
    </p>

      <!-- Vídeo à direita -->
  
    <div class=" remove-desktop">
      <video
        controls
        preload="metadata"
        poster="/img/video-thumb.jpg"
        class="w-full max-w-full aspect-video rounded-xl shadow-lg object-cover hero-video" 
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/dermasync-3d14a.firebasestorage.app/o/public%2Fvideos%2Fvideo-sample.mp4?alt=media"
          type="video/mp4"
        />
        Seu navegador não suporta vídeos.
      </video>
    </div>
  </div>
  



  <!-- Vídeo à direita -->
  
  <div class="hero-video-wrapper">
    <video
      controls
      preload="metadata"
      poster="/img/video-thumb.jpg"
      class="w-full max-w-full aspect-video rounded-xl shadow-lg object-cover hero-video" 
    >
      <source
        src="https://firebasestorage.googleapis.com/v0/b/dermasync-3d14a.firebasestorage.app/o/public%2Fvideos%2Fvideo-sample.mp4?alt=media"
        type="video/mp4"
      />
      Seu navegador não suporta vídeos.
    </video>
  </div>
  
</section>
<section class="hero-bottom">
    <div class="hero-buttons flex flex-wrap gap-4 remove-desktop">
      <RouterLink to="/galeria" class="btn btn-primary">Explorar Galeria</RouterLink>
      
    </div>
</section>
  
<HomeGaleriaColaborativa/>
<HomeComoFunciona/>

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
  import HomeComoFunciona from '../components/HomeComoFunciona.vue';
  </script>
  
  <style scoped>
 
 
  .navbar {
    background-color: rgba(20, 20, 20, 0.85) !important; /* tom escuro translúcido */
    backdrop-filter: blur(6px); /* dá um efeito sutil moderno */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }


  .hero-video-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 2rem auto 0 auto; /* margem acima, centralizado */
}

.hero-video {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
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


video {
  width: 100%;
  max-width: 100%;
  height: auto;
  aspect-ratio: 16 / 9; /* ou 4/3, dependendo do vídeo */
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}
.hero-video-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 14rem auto 0 auto; /* margem acima, centralizado */
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

@media (min-width: 768px){
  .remove-desktop {
    display: none;
  }
}

@media (max-width: 767px) {
  .remove-mobile{
    display:none;
  }
  
  .hero-bottom{
    margin-top: 30px;
  }

  .hero-section {
    padding: 1.5rem 1rem;
    height: 70vh;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('/img/boy-mom-001.png') center center / cover no-repeat;
  }

  .hero-video-wrapper{
    display: none;
  }
   
  .hero-title {
    font-size: 2rem;
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
  