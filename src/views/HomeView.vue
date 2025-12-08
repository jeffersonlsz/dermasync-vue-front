<template>
  <BaseLayout>
    <!-- Hero Section -->
    <section class="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Text Column -->
          <div class="text-left space-y-6">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
              Supere a <span class="text-primary">Dermatite Atópica</span> com histórias reais.
            </h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Uma comunidade segura para compartilhar relatos, encontrar soluções aprovadas e ver que você não está
              sozinho.
            </p>

            <div class="flex flex-col sm-flex-row gap-4 pt-2">
              <RouterLink to="/galeria"
                class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary rounded-xl shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                Explorar Galeria de Histórias
              </RouterLink>
            </div>

            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-500 font-medium pt-2">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-2">
                  <div class="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                  <div class="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div class="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                </div>
                <span>Mais de 1000 relatos verificados</span>
              </div>

              <div class="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>

              <div class="flex items-center gap-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
                <span>100% Anônimo e Seguro</span>
              </div>
            </div>
          </div>

          <!-- Image Column -->
          <div class="relative hidden md:block">
            <!-- Decorative blob/shape behind -->
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-100/50 rounded-full blur-3xl -z-10">
            </div>

            <!-- Placeholder Image -->
            <div
              class="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img :src="currentHeroImage"
                alt="Conexão humana e bem-estar" class="w-full h-auto object-cover aspect-[4/3]" />
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl font-heading font-bold text-gray-900 mb-4">Como funciona o DermaSync?</h2>
          <p class="text-lg text-gray-600">Simples, seguro e focado em ajudar você a encontrar respostas.</p>
        </div>

        <HomeComoFunciona />
      </div>
    </section>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';
import HomeComoFunciona from '../components/HomeComoFunciona.vue';

const heroImages = [
  '/img/hero-images/hero-008.png',
  '/img/hero-images/hero-009.jpg',
  '/img/hero-images/hero-dermatite_001.jpg',
  '/img/hero-images/hero-dermatite_002.png'
];

const currentHeroImage = ref(heroImages[Math.floor(Math.random() * heroImages.length)]);
</script>