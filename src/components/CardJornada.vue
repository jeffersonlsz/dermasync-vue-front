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
  <div
    v-intersect="ativarAnimacao"
    :class="['card', 'border-0', 'shadow-lg', { 'animado': visivel }]"
  >
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
      <h6 class="mb-0">{{ card.tituloRelato || card.classificacao }}</h6>
      </div>
      <div>
      <i class="bi bi-info-circle text-muted"></i>
      </div>
    </div>
    <div class="d-flex" style="height: 140px;">
      
      <!-- ANTES -->
      <div class="w-50 position-relative">
        <img
          :src="card.imgAntes"
          @load="imagemCarregou('antes')"
          @error="imagemCarregou('antes')"
          class="thumb-jornada p-1 w-100 h-100 rounded-start fade-in-img"
          :class="{ loaded: !carregandoAntes }"
          style="object-fit: cover;"
          @click.prevent="verJornada(card)"
        />
        <div v-if="carregandoAntes" class="w-100 h-100 bg-light shimmer rounded-start position-absolute top-0 start-0"></div>
      </div>

      <!-- DEPOIS -->
      <div class="w-50 position-relative">
        <img
          :src="card.imgDepois"
          @load="imagemCarregou('depois')"
          @error="imagemCarregou('depois')"
          class="thumb-jornada p-1 w-100 h-100 rounded-end fade-in-img"
          :class="{ loaded: !carregandoDepois }"
          style="object-fit: cover;"
          @click.prevent="verJornada(card)"
        />
        <div v-if="carregandoDepois" class="w-100 h-100 bg-light shimmer rounded-end position-absolute top-0 start-0"></div>
      </div>
    </div>

    <div class="p-3">
      
      <p class="small text-muted mb-1">{{ card.solucao }}</p>
      <p class="small text-muted mb-1">{{ card.microdepoimento }}</p>
      <div class="mb-2 d-flex flex-wrap gap-1">
        <span v-for="tag in tagz" :key="tag" class="badge bg-light text-dark">{{ tag }}</span>
        <span class="bg-light badge text-dark bg-primary-subtle" @click.prevent="verMaisTags(card, $event)" >+Mais tags</span>
      </div>
      
      <hr />
      <hr class="horizontal dark my-3">
      <div class="d-flex justify-content-between align-items-center">
        <a href="#" class="btn btn-light text-primary text-decoration-none" @click.prevent="verJornada(card)">
          Ver jornada
        </a>

        <div class="d-flex align-items-center gap-1 like-button" 
            :class="{ active: card.curtido }"
            @click.prevent="curtir(card)"
            style="cursor: pointer;">
          <i :class="card.curtido ? 'bi bi-heart-fill' : 'bi bi-heart'"
            class="fs-5"></i>
          <span class="text-muted small">{{ card.likes }}</span>
        </div>
      </div>
    </div>
  </div>

  <!--CardJornadaOverlay :jornadaSelecionada="jornadaSelecionada" @close="jornadaSelecionada = null" /-->

  <CardJornadaOverlay 
      :jornadaSelecionada="jornadaSelecionada" 
      @update:jornadaSelecionada="jornadaSelecionada = $event" 
       />
  

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
  color: #adb5bd; /* cinza padrão */
  transition: color 0.2s ease-in-out;
}

.like-button.active i {
  color: #dc3545; /* vermelho Bootstrap */
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
  & > div > h6 {
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
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
