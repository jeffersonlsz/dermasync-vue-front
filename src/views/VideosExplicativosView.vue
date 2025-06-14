<template>
    <BaseLayout>
    <div class="container py-4">
        <h1 class="display-5 fw-bold mb-3">Relatos Reais de Dermatite Atópica no Brasil</h1>
        <p class="mb-4 text-muted">
        Veja depoimentos em vídeo de pessoas que convivem com dermatite atópica. Seleção de vídeos do YouTube analisados com inteligência artificial.
        </p>

        <div class="row g-4">
        <div class="col-md-6 col-lg-4" v-for="video in videos_pagina" :key="video.id">
            <div class="card h-100 shadow-sm">
            <a :href="video.url" target="_blank">
                <img :src="video.thumbnail" :alt="video.title" class="card-img-top" />
            </a>
            <div class="card-body">
                <h5 class="card-title">{{ video.title }}</h5>
                <p class="card-text">{{ video.summary }}</p>
                <div class="d-flex flex-wrap gap-1">
                <span
                    v-for="tag in video.tags"
                    :key="tag"
                    class="badge bg-primary text-light"
                >
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
    return;
  }

  print('')
  console.log('Response keys from buscarTodosVideos:', Object.keys(response));


  //YT9x2q7dU   mxYT9x2q7dU
  const newLocal = [];
  for (const video of response) {
    console.log(`Processing video thmb ${video.link.slice(19,28)}`);
    newLocal.push({
      id: video.id_relato,
      title: 'Relato sobre dermatite atópica',
      summary: video.resumo_descritivo,
      url: video.link,
      thumbnail: `https://img.youtube.com/vi/${video.link.slice(17,28)}/hqdefault.jpg`,
      tags: video.sintomas,
    });
  }
  return newLocal;

};

onMounted(async () => {
    console.log('VideosExplicativosView component has been mounted');
    videos_pagina.value= await buscarVideosPagina();
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
img {
  transition: transform 0.2s ease;
}
img:hover {
  transform: scale(1.02);
}
</style>