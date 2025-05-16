<template>
    <BaseLayout>

  <section class="container py-5">
    <div class="row align-items-center">
      <!-- Texto -->
      <div class="col-lg-6 mb-4 mb-lg-0">
        
        <h1 class="fw-bold mb-3">
          Veja como outras pessoas superaram a <span class="text-primary">Dermatite Atópica</span>
        </h1>
        <p class="mb-3">Relatos reais. Soluções aprovadas. Totalmente anônimo.</p>
        <div class="d-flex gap-3 flex-wrap mb-2">
          <RouterLink to="/galeria" class="btn btn-outline-secondary">Explorar Galeria</RouterLink> 
          
          <a href="#" class="btn btn-purple">Compartilhar Experiência</a>
        </div>
        <div class="hero-subtext mt-2">
          <span class="me-2">👁️</span>Veja como outras pessoas venceram a coceira
        </div>
      </div>

      <!-- Imagens em cápsulas -->
      <div class="col-lg-6 d-flex justify-content-center gap-4 " style="overflow: hidden;">
        <div class="hero-img-wrapper ms-3" style="margin-top: 72px;">
          <img src="/img/hero-004.jpg" class="hero-img" alt="capsule 4" />
          <img src="/img/hero-006.jpg" class="hero-img" alt="capsule 5" /> 
        </div>
        <div class="hero-img-wrapper">
          <img src="/img/hero-005.jpg" class="hero-img" alt="capsule 1" />
          <img src="/img/hero-002.jpg" class="hero-img" alt="capsule 2" />
          <img src="/img/hero-001.jpg" class="hero-img" alt="capsule 3" />
        </div>
        <div class="hero-img-wrapper ms-3" style="margin-top: 72px;">
          <img src="/img/hero-007.jpg" class="hero-img" alt="capsule 4" />
          <img src="/img/hero-003.jpg" class="hero-img" alt="capsule 5" />
        </div>
      </div>
    </div>
  </section>
<section class="hero-bottom remove-desktop">

      <h5 class="text-center">Veja como funciona</h5>
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
    

    <div class="hero-buttons flex flex-wrap gap-4 ">
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
 

.hero-img {
      width: 100%;
      max-width: 120px;
      height: 180px;
      border-radius: 60px;
      object-fit: cover;
      background-color: #f8f9fa;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
      transform: scale(1.1);
    }
    .hero-img-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    .btn-purple {
      background-color: #6f2dbd;
      color: white;
    }
    .btn-purple:hover {
      background-color: #5b21a3;
    }
    .hero-subtext {
      font-size: 0.95rem;
    }

 
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
  width: 80%;
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
  