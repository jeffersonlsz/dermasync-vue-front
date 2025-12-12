<template>
  <BaseLayout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">Relatos Reais de Dermatite Atópica no
        Brasil</h1>
      <p class="mb-8 text-lg text-gray-600 max-w-3xl">
        Veja depoimentos em vídeo de pessoas que convivem com dermatite atópica. Seleção de vídeos do YouTube analisados
        com inteligência artificial.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="video in videos_pagina" :key="video.id" class="flex flex-col">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col hover:shadow-md transition-all duration-300 group">
            <a :href="video.url" target="_blank" class="block overflow-hidden relative">
              <img :src="video.thumbnail" :alt="video.title"
                class="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/90 rounded-full p-3 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-600" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </a>
            <div class="p-5 flex flex-col flex-grow">
              <h5 class="text-xl font-bold font-heading text-gray-900 mb-2 line-clamp-2">{{ video.title }}</h5>
              <p class="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">{{ video.summary }}</p>
              <div class="flex flex-wrap gap-2 mt-auto">
                <span v-for="tag in video.tags" :key="tag"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';
import { buscarTodosVideos } from '../services/videosService';

const videos_pagina = ref([]);

const buscarVideosPagina = async (pagina) => {
  let response = {};
  try {
    response = await buscarTodosVideos();

  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    return [];
  }

  //YT9x2q7dU   mxYT9x2q7dU
  const newLocal = [];
  if (response && Symbol.iterator in Object(response)) {
    for (const video of response) {
      newLocal.push({
        id: video.id_relato,
        title: 'Relato sobre dermatite atópica',
        summary: video.resumo_descritivo,
        url: video.link,
        thumbnail: `https://img.youtube.com/vi/${video.link.slice(17, 28)}/hqdefault.jpg`,
        tags: video.sintomas,
      });
    }
  }
  return newLocal;
};

onMounted(async () => {
  videos_pagina.value = await buscarVideosPagina();
});

const videos = [
  {
    id: '1',
    title: 'Minha história de vida com dermatite atópica',
    summary: 'Paciente conta sua trajetória. lidando com dermatite atópica desde a infância até a vida adulta.',
    url: 'https://www.youtube.com/watch?v=lar-NGx1_nw',
    thumbnail: 'https://img.youtube.com/vi/lar-NGx1_nw/hqdefault.jpg',
    tags: ['Adulto', 'Coceira', 'Tratamentos'],
  },
  {
    id: '2',
    title: 'O impacto da dermatite atópica nas minhas emoções',
    summary: 'Mulher desabafa sobre como a doença afetou sua saúde mental e bem-estar.',
    url: 'https://www.youtube.com/watch?v=gMGPE-mfqi0',
    thumbnail: 'https://img.youtube.com/vi/gMGPE-mfqi0/hqdefault.jpg',
    tags: ['Bem-Estar', 'Estresse'],
  },
  {
    id: '3',
    title: 'Como ajudei meu bebê com dermatite atópica',
    summary: 'Mãe compartilha cuidados e mudanças que fizeram a diferença no quadro da filha.',
    url: 'https://www.youtube.com/watch?v=9hP0Tqz2JmQ',
    thumbnail: 'https://img.youtube.com/vi/9hP0Tqz2JmQ/hqdefault.jpg',
    tags: ['Bebê', 'Hidratação', 'Rotina'],
  },
  {
    id: '4',
    title: 'Tratamentos naturais que funcionaram pra mim',
    summary: 'Homem relata como encontrou alívio com alternativas naturais e alimentação.',
    url: 'https://www.youtube.com/watch?v=M8u9hy6k1_Q',
    thumbnail: 'https://img.youtube.com/vi/M8u9hy6k1_Q/hqdefault.jpg',
    tags: ['Alimentação', 'Natural', 'Adulto'],
  },
]
</script>

<style scoped>
/* Scoped styles can be removed or minimalized as we are using Tailwind */
</style>