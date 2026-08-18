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
    :class="['group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-gray-200/60 transition-all duration-500 flex flex-col justify-between', { 'opacity-100 translate-y-0': visivel, 'opacity-0 translate-y-6': !visivel }]">
    
    <!-- Top Badges Row -->
    <div class="px-6 pt-6 flex justify-between items-center mb-1">
      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-100/50">
        <svg class="w-3 h-3 fill-emerald-600 text-emerald-600" fill="currentColor" viewBox="0 0 24 24" stroke="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        {{ card.regioesAfetadas?.[0] || 'Rosto' }}
      </span>

      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-xl border border-purple-100/50">
        <svg class="w-3.5 h-3.5 text-purple-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        38 relatos semelhantes
      </span>
    </div>

    <!-- Title and Profile Metadata -->
    <div class="px-6 pb-4 cursor-pointer" @click.prevent="verJornada(card)">
      <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
        {{ card.tituloRelato || 'Dermatite no rosto com tratamento' }}
      </h3>
      <div class="flex items-center text-xs text-gray-500 gap-2">
        <span class="flex items-center gap-1 font-semibold text-gray-550">
          👤 {{ card.faixaEtaria || '18-39 anos' }}
        </span>
        <span class="text-gray-300 select-none">•</span>
        <span class="flex items-center gap-1 font-semibold text-gray-550">
          ♀ {{ card.genero || 'Feminino' }}
        </span>
        <span class="text-gray-300 select-none">•</span>
        <span class="flex items-center gap-1 font-semibold text-gray-550">
          😐 {{ card.regioesAfetadas?.[0] || 'Rosto' }}
        </span>
      </div>
    </div>

    <!-- Imagens Antes/Depois with Center Arrow seam -->
    <div class="px-6 relative flex gap-3 h-[180px] cursor-pointer" @click.prevent="verJornada(card)">
      <!-- ANTES -->
      <div class="w-1/2 relative rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
        <span class="absolute top-2 left-2 z-10 bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">Antes</span>
        <img :src="card.imgAntes" @load="imagemCarregou('antes')" @error="imagemCarregou('antes')"
          class="w-full h-full object-cover fade-in-img" :class="{ loaded: !carregandoAntes }" />
        <div v-if="carregandoAntes" class="w-full h-full bg-gray-100 shimmer absolute top-0 left-0"></div>
      </div>

      <!-- Arrow circle overlay -->
      <div class="absolute inset-y-0 left-1/2 -ml-4.5 w-9 flex items-center justify-center z-20 pointer-events-none">
        <div class="w-7.5 h-7.5 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 border border-gray-150 pointer-events-auto hover:bg-gray-50 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- DEPOIS -->
      <div class="w-1/2 relative rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
        <span class="absolute top-2 left-2 z-10 bg-emerald-700/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">Depois</span>
        <img :src="card.imgDepois" @load="imagemCarregou('depois')" @error="imagemCarregou('depois')"
          class="w-full h-full object-cover fade-in-img" :class="{ loaded: !carregandoDepois }" />
        <div v-if="carregandoDepois" class="w-full h-full bg-gray-100 shimmer absolute top-0 left-0"></div>
      </div>
    </div>

    <!-- Microdepoimento Quote Box -->
    <div class="px-6 pt-5">
      <div class="relative bg-emerald-50/15 border border-emerald-50 rounded-2xl p-5 shadow-sm">
        <!-- Quotes icon -->
        <span class="absolute top-2.5 left-4.5 text-emerald-250/20 text-5xl font-serif leading-none select-none">“</span>
        <p class="text-[13px] text-gray-650 leading-relaxed relative z-10 pl-2 line-clamp-3">
          {{ card.resumoPublico || 'Descrição ainda não disponível.' }}
        </p>
      </div>
    </div>

    <!-- Metadata Row -->
    <div class="px-6 pt-5 grid grid-cols-3 gap-3 border-t border-gray-50 mt-5">
      <!-- Relato em -->
      <div class="flex items-center gap-2.5">
        <div class="w-8.5 h-8.5 rounded-full bg-emerald-50/50 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm">
          📅
        </div>
        <div>
          <p class="text-[9px] text-gray-400 font-bold uppercase leading-none">Relato em</p>
          <p class="text-xs font-bold text-gray-800 mt-0.5">12/04/2024</p>
        </div>
      </div>

      <!-- Duração -->
      <div class="flex items-center gap-2.5 border-l border-gray-100 pl-3">
        <div class="w-8.5 h-8.5 rounded-full bg-emerald-50/50 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm">
          ⏱️
        </div>
        <div>
          <p class="text-[9px] text-gray-400 font-bold uppercase leading-none">Duração</p>
          <p class="text-xs font-bold text-gray-800 mt-0.5">{{ card.duration || '2 semanas' }}</p>
        </div>
      </div>

      <!-- Resultado -->
      <div class="flex items-center gap-2.5 border-l border-gray-100 pl-3">
        <div class="w-8.5 h-8.5 rounded-full bg-emerald-50/50 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm">
          ✓
        </div>
        <div class="min-w-0">
          <p class="text-[9px] text-gray-400 font-bold uppercase leading-none">Resultado</p>
          <p class="text-xs font-bold text-emerald-700 mt-0.5 truncate" :title="card.classificacao || 'Melhora significativa'">
            {{ card.classificacao || 'Melhora significativa' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Tags Row -->
    <div class="px-6 pt-5 flex flex-wrap gap-1.5">
      <span v-for="tag in tagz" :key="tag"
        class="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 text-gray-550 border border-gray-100 transition-colors hover:bg-gray-100 hover:text-gray-700">
        {{ tag }}
      </span>
      <button v-if="tagz.length < card.tags.length"
        class="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-50/50 text-gray-450 border border-gray-100 hover:text-gray-750 transition-colors cursor-pointer"
        @click.prevent="verMaisTags(card, $event)">
        +{{ card.tags.length - tagz.length }}
      </button>
    </div>

    <!-- Footer Actions -->
    <div class="p-6 flex justify-between items-center mt-5 border-t border-gray-50">
      <!-- Explorar jornada -->
      <button @click.prevent="verJornada(card)"
        class="px-5 py-2.5 border border-emerald-600 text-emerald-700 text-sm font-bold rounded-2xl hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shadow-sm">
        Explorar jornada
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Curtir and Bookmark -->
      <div class="flex items-center gap-3">
        <!-- Curtir -->
        <button @click.prevent="curtir(card)"
          class="flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-750 text-sm font-bold rounded-2xl transition-colors shadow-sm focus:outline-none"
          :class="{ 'border-rose-300 bg-rose-50/20 text-rose-600': card.curtido }">
          <svg :class="card.curtido ? 'text-rose-500 fill-rose-500' : 'text-gray-400 fill-transparent'"
            class="w-4 h-4 transition-colors duration-300" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
            </path>
          </svg>
          <span>Curtir</span>
          <span class="text-gray-400 font-normal ml-0.5" :class="{ 'text-rose-500 font-bold': card.curtido }">
            {{ card.likes || 12 }}
          </span>
        </button>

        <!-- Bookmark -->
        <button class="p-2.5 border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-650 rounded-2xl transition-colors shadow-sm">
          <svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
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
