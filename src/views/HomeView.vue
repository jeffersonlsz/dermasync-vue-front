<template>
    <BaseLayout>

  <section class="hero-section container py-5">
    <div class="row align-items-center">
      <!-- Texto -->
      <div class="col-lg-6 mb-4 mb-lg-0">
        
        <h1 class="fw-bold mb-3">
          Veja como outras pessoas superaram a <span class="text-primary">Dermatite Atópica</span>
        </h1>
        <p class="mb-3">Relatos reais. Soluções aprovadas. Totalmente anônimo.</p>
        <div class="d-flex gap-3 flex-wrap mb-2">
          <RouterLink to="/galeria" class="btn btn-lg btn-primary btn-lg w-50 mb-0">Explorar Galeria</RouterLink> 
          <!--a href="#" class="btn btn-purple">Compartilhar Experiência</a-->
        </div>
        <div class="hero-subtext mt-2">
          <span class="me-2">👁️</span>Veja como outras pessoas venceram a coceira
        </div>
      </div>

      <!-- Imagens em cápsulas -->
      <div class="col-lg-6 d-flex justify-content-center gap-5 " style="overflow: visible;">
        <div class="hero-img-wrapper ms-3">
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
      <!--video
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
      </video-->
    

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
      
      align-items: center;
      overflow: visible;
      gap: 22px;
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
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: #FFFFFF;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23FFFFFF' stroke-width='0.4' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cuse fill='%23fcfcfc' href='%23s' y='2'/%3E%3Cuse fill='%23fcfcfc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='2'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cg fill='%23f2f2f2'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23efefef'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(180 1000 750) scale(10.6) translate(-905.66 -679.25)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
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
  