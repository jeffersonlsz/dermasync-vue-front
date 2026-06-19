<template>
  <BaseLayout>
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-cream">
      <!-- Organic Background Element -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      
      <div class="container mx-auto px-4 relative">
        <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <!-- Text Column: Offset and wider -->
          <div class="lg:w-3/5 text-left space-y-12 lg:-mt-12">
            <div class="space-y-8">
              <h1 class="text-6xl md:text-7xl lg:text-8xl font-heading font-semibold text-gray-900 leading-[1.05] tracking-tight">
                Sua jornada <br />
                <span class="text-primary block relative">
                  acolhida.
                </span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed font-normal">
                O DermaSync é uma plataforma de conexão para quem vive com dermatite atópica. Transformamos relatos reais em uma rede de apoio confiável e tecnológica.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-6 items-start">
              <RouterLink to="/galeria"
                class="inline-flex items-center justify-center px-12 py-5 text-base font-semibold text-white bg-primary rounded-full shadow-xl hover:bg-primary-600 transition-all hover:-translate-y-1">
                Explorar relatos
              </RouterLink>
              <button
                class="inline-flex items-center justify-center px-12 py-5 text-base font-medium text-gray-500 bg-transparent border border-gray-200 rounded-full hover:bg-gray-50 transition-all">
                Conheça a tecnologia
              </button>
            </div>
          </div>

          <!-- Image Column: Floating and overlapping -->
          <div class="lg:w-2/5 relative">
            <div class="relative z-10 transform lg:rotate-3 transition-transform duration-1000 hover:rotate-0">
              <img src="/img/boy-mom-001.png"
                alt="Ilustração de acolhimento" class="w-full h-auto drop-shadow-[0_35px_35px_rgba(45,90,67,0.15)]" />
            </div>
            <!-- Asymmetric decorative shape -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-primary-100/40 rounded-[60%_40%_70%_30%/50%_60%_30%_70%] -z-10 animate-blob"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar: Shifted and Asymmetric -->
    <section class="relative z-20 -mt-20 container mx-auto px-4 lg:pr-32">
      <div class="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-10 md:p-16 border border-white/80 shadow-[0_50px_100px_-20px_rgba(45,90,67,0.12)]">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div class="lg:col-span-4 space-y-6">
            <h2 class="text-3xl font-heading font-semibold text-gray-900 leading-tight text-left">
              Uma comunidade que respira junto.
            </h2>
            <div class="w-16 h-1 bg-primary-100 rounded-full"></div>
            <p class="text-gray-600 text-left font-normal leading-relaxed">
              Cada palavra compartilhada é processada com segurança para gerar entendimento mútuo.
            </p>
          </div>
          <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12 lg:pl-12">
            <div v-for="stat in stats" :key="stat.label" class="space-y-4 text-left group">
              <div class="text-primary-300 group-hover:text-primary transition-colors">
                <svg v-if="stat.icon === 'heart'" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <i v-else class="bi" :class="'bi-' + (stat.icon === 'users' ? 'people' : stat.icon === 'globe' ? 'globe-americas' : 'calendar3')" style="font-size: 1.5rem"></i>
              </div>
              <div class="space-y-1">
                <p class="text-3xl font-heading font-bold text-gray-900">{{ stat.value }}</p>
                <p class="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Stories: Staggered Layout -->
    <section class="py-32 bg-cream relative overflow-hidden">
      <!-- Background Leaf/Element -->
      <div class="absolute bottom-0 left-0 w-64 h-64 text-primary-100 opacity-20 -rotate-12 translate-y-12">
        <svg viewBox="0 0 200 200" fill="currentColor"><path d="M40,100 C40,50 100,20 160,100 C100,180 40,150 40,100 Z" /></svg>
      </div>

      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div class="max-w-2xl space-y-6 text-left">
            <h2 class="text-5xl md:text-6xl font-heading font-semibold text-gray-900 tracking-tight">Vozes que ecoam.</h2>
            <p class="text-xl text-gray-600 font-normal">Relatos que transformam o silêncio em conexão humana.</p>
          </div>
          <RouterLink to="/galeria" class="text-sm font-bold text-primary border-b-2 border-primary-100 hover:border-primary transition-all pb-2 mb-2">
            Explorar todo o acervo →
          </RouterLink>
        </div>

        <!-- Staggered Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          <div v-for="(story, index) in featuredStories" :key="story.id" 
               :class="['transition-all duration-1000', index === 1 ? 'lg:translate-y-16' : '']">
            <HomeStoryCard v-bind="story" class="!shadow-none !bg-transparent border-none" />
          </div>
        </div>
      </div>
    </section>

    <!-- Engagement Section: Breaking the Grid -->
    <section class="py-32 bg-white relative">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center gap-24">
          <!-- Illustration with background bleed -->
          <div class="lg:w-1/2 relative order-2 lg:order-1">
            <div class="absolute -inset-12 bg-primary-100/30 rounded-full blur-3xl -z-10"></div>
            <img src="/img/compartilhe.png" alt="Ilustração" class="w-full max-w-md mx-auto animate-float opacity-90" />
          </div>

          <!-- Content: Offset left -->
          <div class="lg:w-1/2 text-left space-y-12 order-1 lg:order-2 lg:pl-12">
            <div class="space-y-6">
              <h2 class="text-5xl font-heading font-semibold text-gray-900 leading-tight tracking-tight">
                Sua voz é <br /><span class="text-primary">o ponto de partida.</span>
              </h2>
              <p class="text-xl text-gray-600 font-normal leading-relaxed">
                Ao compartilhar sua história, você alimenta um ecossistema de acolhimento e dados que ajudam milhares.
              </p>
            </div>
            
            <div class="space-y-8">
              <div v-for="(benefit, i) in [
                { t: 'Segurança de Dados', d: 'Sua privacidade é nossa prioridade técnica.', i: 'shield' },
                { t: 'Conexão Humanista', d: 'Tecnologia a serviço do bem-estar emocional.', i: 'heart' }
              ]" :key="i" class="flex items-start gap-6 group">
                <div class="w-1 h-12 bg-primary-100 group-hover:bg-primary transition-all rounded-full"></div>
                <div class="space-y-1">
                  <h4 class="font-bold text-gray-900 tracking-tight">{{ benefit.t }}</h4>
                  <p class="text-gray-500 font-normal text-sm">{{ benefit.d }}</p>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <button class="px-12 py-5 bg-gray-900 text-white font-semibold rounded-full shadow-2xl hover:bg-primary transition-all transform hover:-translate-y-1">
                Iniciar meu relato
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Ribbon -->
    <section class="container mx-auto px-4 pb-24">
      <div class="bg-primary-100 rounded-2xl py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/50">
        <div class="flex items-center gap-4 text-left">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <p class="text-sm font-bold text-gray-900 leading-none mb-1">Levamos sua privacidade a sério</p>
            <p class="text-xs text-gray-500">Não coletamos dados desnecessários. Seus relatos são anônimos e usados apenas para apoiar e inspirar.</p>
          </div>
        </div>
        <a href="#" class="text-sm font-bold text-primary hover:text-primary-600 transition-colors flex items-center gap-2 group">
          Saiba mais sobre nossa ética
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
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
import HomeStoryCard from '../components/HomeStoryCard.vue';

const stats = [
  { label: 'Relatos compartilhados', value: '2.458+', icon: 'heart' },
  { label: 'Pessoas acolhidas', value: '1.892+', icon: 'users' },
  { label: 'Países alcançados', value: '25+', icon: 'globe' },
  { label: 'Novas histórias, novas conexões', value: 'Todos os dias', icon: 'calendar' }
];

const featuredStories = [
  {
    id: 1,
    category: 'Crises nas pernas',
    image: '/img/845596ca-2f82-48e7-a5ae-ab8322c84411.png',
    excerpt: 'Após 10 dias de crise intensa, encontrei uma rotina que ajudou minha pele a melhorar gradualmente.',
    author: 'Anônimo',
    age: 28
  },
  {
    id: 2,
    category: 'Rosto',
    image: '/img/505134b3-9e50-4855-9655-f80d83f762a4.png',
    excerpt: 'Aprendi que autocuidado vai muito além da pele. Foi um processo de dentro pra fora.',
    author: 'Anônima',
    age: 22
  },
  {
    id: 3,
    category: 'Infância',
    image: '/img/9690631a-cdf3-46f2-abce-3ac976f79a53.png',
    excerpt: 'Convivo com DA desde pequeno. Hoje entendo meu corpo e meus gatilhos muito melhor.',
    author: 'Anônimo',
    age: 19
  }
];
</script>