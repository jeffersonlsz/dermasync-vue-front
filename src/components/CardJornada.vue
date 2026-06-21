<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import intersect from '../directives/intersect.js'; // ajuste o path conforme estrutura
import CardJornadaOverlay from './CardJornadaOverlay.vue';

onMounted(() => {
  console.log('Componente CardJornada montado!');
  console.log('props.card:', props.card);
  console.log('props.tags_extraidas:', props.tags_extraidas);
  console.log('props.microdepoimento:', props.microdepoimento);
  console.log('props.statusLLM:', props.statusLLM);
  console.log('props:', props);
  console.log('visivel:', visivel.value);
  console.log('jornadaSelecionada:', jornadaSelecionada.value);
  console.log('carregandoAntes:', carregandoAntes.value);
  console.log('carregandoDepois:', carregandoDepois.value);


});



const props = defineProps({
  card: Object,
  tags_extraidas: {
    type: Array,
    default: () => []
  },
  microdepoimento: {
    type: String,
    default: ""
  },
  statusLLM: {
    type: String,
    default: "pendente"
  }
});

const tagz = ref(props.card.tags.slice(0, 3)); // Exibe apenas as 3 primeiras tags inicialmente

const visivel = ref(false);
const jornadaSelecionada = ref(null);

const carregandoAntes = ref(true);
const carregandoDepois = ref(true);

function ativarAnimacao() {
  visivel.value = true;
}

function verJornada(card) {
  // Aqui você pode implementar a lógica para abrir a jornada
  // Por exemplo, abrir um modal ou redirecionar para outra página
  console.log('Ver jornada clicado!');
  //console.log('props.card:', props.card);
  console.log('card:', card);
  abrirOverlay(card);
}

function abrirOverlay(card) {
  console.log('Abrindo overlay com a jornada:', card);
  jornadaSelecionada.value = card;

}

function imagemCarregou(tipo) {
  if (tipo === 'antes') carregandoAntes.value = false;
  if (tipo === 'depois') carregandoDepois.value = false;
}

function verMaisTags(card, el) {
  // sempre adiciona mais 3 ou o número de tags que restam
  const tagsRestantes = card.tags.slice(tagz.value.length, tagz.value.length + 3);
  tagz.value.push(...tagsRestantes);
  // Se não houver mais tags, remove o botão
  if (tagz.value.length >= card.tags.length) {
    el.target.style.display = 'none';
  }
}

function curtir(card) {
  // Aqui você pode implementar a lógica para curtir o card
  // Por exemplo, enviar uma requisição para o servidor ou atualizar o estado local
  console.log('Curtindo card:', card);
  if (!card.curtido) {
    card.likes++;
    card.curtido = true;
  } else {
    card.likes--;
    card.curtido = false;
  }
}

console.log('Card recebido:', props.card);



</script>

<template>
  <div v-intersect="ativarAnimacao"
    :class="['group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-gray-200/60 transition-all duration-500', { 'opacity-100 translate-y-0': visivel, 'opacity-0 translate-y-6': !visivel }]">
    <!-- Semantic Metadata Header -->
    <div class="px-6 pt-6 pb-4 flex justify-between items-start">
      <div class="flex flex-col gap-1">
        <h6 class="text-[15px] text-gray-900 font-medium tracking-tight">{{ card.tituloRelato || card.classificacao ||
          'Experiência' }}</h6>
        <div class="flex items-center text-[13px] text-gray-400 font-light gap-2">
          <span>{{ card.faixaEtaria || 'Idade n/a' }}</span>
          <span class="w-1 h-1 rounded-full bg-gray-200"></span>
          <span>{{ card.genero || 'Gênero n/a' }}</span>
          <span v-if="card.regioesAfetadas && card.regioesAfetadas.length > 0"
            class="w-1 h-1 rounded-full bg-gray-200"></span>
          <span v-if="card.regioesAfetadas && card.regioesAfetadas.length > 0" class="truncate max-w-[120px]">{{
            card.regioesAfetadas.join(', ') }}</span>
        </div>
      </div>
    </div>

    <!-- Imagens: Antes / Depois -->
    <div class="px-6 flex gap-2 h-[160px] cursor-pointer" @click.prevent="verJornada(card)">
      <!-- ANTES -->
      <div class="w-1/2 relative rounded-2xl overflow-hidden bg-gray-50 group-hover:opacity-95 transition-opacity">
        <span
          class="absolute top-2 left-2 z-10 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-medium tracking-wide text-gray-600 uppercase shadow-sm">Antes</span>
        <img :src="card.imgAntes" @load="imagemCarregou('antes')" @error="imagemCarregou('antes')"
          class="w-full h-full object-cover fade-in-img" :class="{ loaded: !carregandoAntes }" />
        <div v-if="carregandoAntes" class="w-full h-full bg-gray-100 shimmer absolute top-0 left-0"></div>
      </div>

      <!-- DEPOIS -->
      <div class="w-1/2 relative rounded-2xl overflow-hidden bg-gray-50 group-hover:opacity-95 transition-opacity">
        <span
          class="absolute top-2 left-2 z-10 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-medium tracking-wide text-gray-600 uppercase shadow-sm">Depois</span>
        <img :src="card.imgDepois" @load="imagemCarregou('depois')" @error="imagemCarregou('depois')"
          class="w-full h-full object-cover fade-in-img" :class="{ loaded: !carregandoDepois }" />
        <div v-if="carregandoDepois" class="w-full h-full bg-gray-100 shimmer absolute top-0 left-0"></div>
      </div>
    </div>

    <!-- Depoimento e Conteúdo -->
    <div class="p-6">
      <p class="text-[15px] leading-relaxed text-gray-700 font-light mb-5 line-clamp-3">
        "{{ card.resumoPublico }}"
      </p>

      <!-- Tags Semânticas -->
      <div class="mb-6 flex flex-wrap gap-1.5">
        <span v-for="tag in tagz" :key="tag"
          class="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100/80 transition-colors hover:bg-gray-100 hover:text-gray-700">{{
            tag }}</span>
        <button v-if="tagz.length < card.tags.length"
          class="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-50/50 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          @click.prevent="verMaisTags(card, $event)">+{{ card.tags.length - tagz.length }}</button>
      </div>

      <!-- Footer Actions -->
      <div class="flex justify-between items-center pt-2">
        <a href="#"
          class="inline-flex items-center text-[13px] font-medium text-gray-900 transition-colors group-hover:text-gray-600"
          @click.prevent="verJornada(card)">
          Explorar jornada
          <svg
            class="w-3.5 h-3.5 ml-1.5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>

        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all focus:outline-none"
          :class="{ active: card.curtido }" @click.prevent="curtir(card)">
          <svg :class="card.curtido ? 'text-rose-500 fill-rose-500' : 'text-gray-300 fill-transparent'"
            class="w-4 h-4 transition-colors duration-300" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
            </path>
          </svg>
          <span class="text-[12px] font-medium" :class="card.curtido ? 'text-rose-500' : 'text-gray-400'">{{ card.likes
          }}</span>
        </button>
      </div>
    </div>
  </div>

  <CardJornadaOverlay :jornadaSelecionada="jornadaSelecionada"
    @update:jornadaSelecionada="jornadaSelecionada = $event" />
</template>


<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.like-button {
  transition: transform 0.15s ease-in-out;
}

.like-button.active {
  transform: scale(1.1);
}

.like-button i {
  color: #adb5bd;
  /* cinza padrão */
  transition: color 0.2s ease-in-out;
}

.like-button.active i {
  color: #dc3545;
  /* vermelho Bootstrap */
}



.thumb-jornada {
  border-radius: 15px;
  transition: transform 0.3s ease;
  cursor: pointer;

}

.miniatura {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}



.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.overlay-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: auto;
}

.overlay-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 960px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.fade-in {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.invisible {
  opacity: 0;
}

.fade-in-img {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fade-in-img.loaded {
  opacity: 1;
}

.card .card-header {
  background-color: #f8f9fa;
  padding-bottom: 3px !important;
  padding-top: 3px !important;
  padding-left: 8px !important;
  background-color: white;
  border-bottom: revert-layer;

  &>div>h6 {
    font-size: 1.0rem;
    font-weight: 300;
    color: #000000;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
