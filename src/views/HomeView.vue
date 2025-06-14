<template>
  <BaseLayout>
   
        

    
    <section class="hero-section container py-5 remove-mobile">
      <div class="row align-items-center">
        <!-- Texto -->
        <div class="col-lg-6 mb-4 mb-lg-0">

          <h1 class="fw-bold mb-3 remove-mobile">
            Veja como outras pessoas superaram a <span class="text-primary">Dermatite Atópica</span>
          </h1>
          <p class="mb-3 remove-mobile">Relatos reais. Soluções aprovadas. Totalmente anônimo.</p>
          <div class="d-flex gap-3 flex-wrap mb-2">
            <RouterLink to="/galeria" class="">
              <button class="animated-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                  </path>
                </svg>
                <span class="text">Explorar Galeria</span>
                <span class="circle"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                  <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                  </path>
                </svg>
              </button>
            </RouterLink>
          </div>
          <div class="hero-subtext mt-2 remove-mobile">
            <span class="me-2">👁️</span>Veja como outras pessoas venceram a coceira
          </div>
        </div>

        <!-- Imagens em cápsulas -->
        <div class="col-lg-6 d-flex justify-content-center gap-5 " style="overflow: visible;">
          <div class="hero-img-wrapper ms-3 remove-mobile">
            <img src="/img/hero-004.jpg" class="hero-img" alt="capsule 4" />
            <img src="/img/hero-006.jpg" class="hero-img" alt="capsule 5" />
          </div>
          <div class="hero-img-wrapper">
            <img src="/img/hero-005.jpg" class="hero-img" alt="capsule 1" />
            <img src="/img/hero-002.jpg" class="hero-img" alt="capsule 2" />
            <img src="/img/hero-001.jpg" class="hero-img" alt="capsule 3" />
          </div>
          <div class="hero-img-wrapper ms-3 remove-mobile" style="margin-top: 72px;">
            <img src="/img/hero-007.jpg" class="hero-img" alt="capsule 4" />
            <img src="/img/hero-008.png" class="hero-img" alt="capsule 5" />
          </div>
        </div>
      </div>
    </section>


    <section class="hero-section px-3 py-5 remove-desktop position-relative">
       
      <div class="d-flex justify-content-between align-items-start" style="width: 100%;">
        <!-- Texto à esquerda -->
        <div class="flex-column align-items-center mb-4" style="margin-top: 3rem;">
          <h1 class="fw-bold mb-3">
            Veja como outras pessoas superaram a <span class="text-primary">Dermatite Atópica</span>
          </h1>
          <p class="mb-3">Relatos reais. Soluções aprovadas. Totalmente anônimo.</p>  
          <RouterLink to="/galeria" class="btn btn-primary w-75">Veja pessoas reais e aprenda</RouterLink>
          <button class="btn-video-explicativo btn  mt-3" @click="mostrarVideo = true">
            ▶️ Veja um vídeo explicativo
          </button>
        </div>
      </div>

      <!-- Overlay com vídeo -->
      <!-- Transição para o overlay -->
      <transition name="fade">
        <div v-if="mostrarVideo" class="video-overlay" @click.self="fecharOverlay">
          <div class="video-container">
            <button class="close-btn" @click="fecharOverlay">✖</button>
            <video controls autoplay muted class="video-player">
              <source
                src="https://firebasestorage.googleapis.com/v0/b/dermasync-3d14a.firebasestorage.app/o/public%2Fvideos%2Fvideo-sample.mp4?alt=media"
                type="video/mp4" />
              Seu navegador não suporta o formato de vídeo.
            </video>
          </div>
        </div>
      </transition>
    
    </section>

    <section class="hero-bottom remove-mobile">


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


      <!--div class="hero-buttons flex flex-wrap gap-4 ">
      <RouterLink to="/galeria" class="btn btn-primary">Explorar Galeria</RouterLink> 
    </div-->
    </section>

    
    <HomeComoFunciona />
    <!--HomeGaleriaColaborativa /-->
    
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
import { ref } from 'vue'
import BaseLayout from '../layouts/BaseLayout.vue';
import HomeGaleriaColaborativa from '../components/HomeGaleriaColaborativa.vue';
import HomeComoFunciona from '../components/HomeComoFunciona.vue';
import WordCloud from '../components/WordCloud.vue';


const numeros_imagens = ref([1, 2, 3, 4, 5, 6, 7]);
const mostrarVideo = ref(false);

function fecharOverlay() {
  mostrarVideo.value = false;
}
</script>

<style scoped>
/* From Uiverse.io by Matilemak */
.animated-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 36px;
  border: 4px solid;
  border-color: transparent;
  font-size: 16px;
  background-color: inherit;
  border-radius: 100px;
  font-weight: 600;
  color: #1e1e1e;
  box-shadow: 0 0 0 2px #1e1e1e;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button svg {
  position: absolute;
  width: 24px;
  fill: #1e1e1e;
  z-index: 9;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .arr-1 {
  right: 16px;
}

.animated-button .arr-2 {
  left: -25%;
}

.animated-button .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: #fd8a26;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .text {
  position: relative;
  z-index: 1;
  transform: translateX(-12px);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button:hover {
  box-shadow: 0 0 0 12px transparent;
  color: #1e1e1e;
  border-radius: 12px;
}

.animated-button:hover .arr-1 {
  right: -25%;
}

.animated-button:hover .arr-2 {
  left: 16px;
}

.animated-button:hover .text {
  transform: translateX(12px);
}

.animated-button:hover svg {
  fill: #1e1e1e;
}

.animated-button:active {
  scale: 0.95;
  box-shadow: 0 0 0 4px #fd8a26;
}

.animated-button:hover .circle {
  width: 220px;
  height: 220px;
  opacity: 1;
}


.hero-img {
  width: 100%;
  max-width: 120px;
  height: 180px;
  border-radius: 60px;
  object-fit: cover;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  transform: scale(1.05);
}

.hero-img-wrapper {
  display: flex;
  flex-direction: column;

  align-items: center;
  overflow: visible;
  gap: 22px;
}

.btn-video-explicativo{
    background-image: linear-gradient(#0dccea, #0d70ea);
    border: 0;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, .3) 0 5px 15px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: Montserrat, sans-serif;
    font-size: .9em;
    margin: 5px;
    padding: 10px 15px;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
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
  background-color: rgba(20, 20, 20, 0.85) !important;
  /* tom escuro translúcido */
  backdrop-filter: blur(6px);
  /* dá um efeito sutil moderno */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}


.hero-video-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 2rem auto 0 auto;
  /* margem acima, centralizado */
}

.hero-video {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.15); */
}

.hero-section {
  position: relative;
  background-image: url('/img/background-layer-1.png');
  background-size: cover;
  
  
  z-index: 0;
}

/* Camada de overlay */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  /*background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)); /* ajuste como quiser */ 
}

/* Conteúdo da hero */
.hero-section > * {
  position: relative;
  z-index: 2;
}




.hero-title {
  color: #5f3c3c;  
  font-weight: 600;
  line-height: 1.3;
  font-size: 1.75rem;
}

.highlight {
  color: #7f9cf5;
  /* tom azul violeta */
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
  aspect-ratio: 16 / 9;
  /* ou 4/3, dependendo do vídeo */
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.hero-video-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 14rem auto 0 auto;
  /* margem acima, centralizado */
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
    background-image: linear-gradient(#0dccea, #0d70ea);
    border: 0;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, .3) 0 5px 15px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: Montserrat, sans-serif;
    font-size: .9em;
    margin: 5px;
    padding: 10px 15px;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.btn-primary:hover {
  background: linear-gradient(to right, #6b46c1, #8945e0);
  box-shadow: 0 6px 16px rgba(127, 86, 217, 0.3);
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

.passo-como-funciona {
  background-color: #dee2e6;
  border-radius: 6%;
}

/* Overlay e container */
.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.video-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: #000;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  background: transparent;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  z-index: 10000;
}

/* Transição Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



@media (max-width: 767px) {
  .remove-mobile {
    display: none !important;
  }

  .container{
    padding-right: 0%;
    padding-left: 0%;
  }

  .hero-section {
    position: relative;
    overflow: hidden;
    background-size: cover;
   
    padding-top: 5rem; /* desce tudo um pouco */
    padding-bottom: 3rem;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    /* background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(40, 40, 40, 0.8)); */
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 1.5rem;
  }

  .hero-title {
    color: #5f3c3c;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

  .hero-btns {
    width: 100%;
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }
  .btn-video-explicativo{
           background: #4cc7c7;
  }
  .btn-primary {
        background-image: linear-gradient(334deg, #a8ff7287, #0000001a); 
        /* font-weight: bold; */
        font-size: 1.2rem;
        /* border: none; */
        box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3);
        background: rosybrown;
  }

  .btn-outline-secondary {
    background: transparent;
    color: #f0f0f0;
    border: 1px solid #ccc;
  }

  .navbar {
    border-radius: 0 !important;
    width: 100vw;
    margin: 0 !important;
    padding: 0.5rem 1rem !important;
    border: none;
  }


}

</style>