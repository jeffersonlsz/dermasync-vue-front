<script setup>
import { ref } from 'vue';
import intersect from '../directives/intersect.js'; // ajuste o path conforme estrutura

const props = defineProps({
  card: Object
});
const visivel = ref(false);


const carregandoAntes = ref(true);
const carregandoDepois = ref(true);

function ativarAnimacao() {
  visivel.value = true;
}

function imagemCarregou(tipo) {
  if (tipo === 'antes') carregandoAntes.value = false;
  if (tipo === 'depois') carregandoDepois.value = false;
}
console.log('Card recebido:', props.card);
</script>

<template>
  <div
    v-intersect="ativarAnimacao"
    :class="['card', 'border-0', 'shadow-sm', { 'animado': visivel }]"
  >
    <div class="d-flex" style="height: 140px;">
      <!-- ANTES -->
      <div class="w-50 position-relative">
        <img
          :src="card.imgAntes"
          @load="imagemCarregou('antes')"
          @error="imagemCarregou('antes')"
          class="w-100 h-100 rounded-start fade-in-img"
          :class="{ loaded: !carregandoAntes }"
          style="object-fit: cover;"
        />
        <div v-if="carregandoAntes" class="w-100 h-100 bg-light shimmer rounded-start position-absolute top-0 start-0"></div>
      </div>

      <!-- DEPOIS -->
      <div class="w-50 position-relative">
        <img
          :src="card.imgDepois"
          @load="imagemCarregou('depois')"
          @error="imagemCarregou('depois')"
          class="w-100 h-100 rounded-end fade-in-img"
          :class="{ loaded: !carregandoDepois }"
          style="object-fit: cover;"
        />
        <div v-if="carregandoDepois" class="w-100 h-100 bg-light shimmer rounded-end position-absolute top-0 start-0"></div>
      </div>
    </div>

    <div class="p-3">
      <h6 class="fw-bold mb-1">{{ card.classificacao }}</h6>
      <div class="mb-2 d-flex flex-wrap gap-1">
        <span v-for="tag in card.tags" :key="tag" class="badge bg-light text-dark">{{ tag }}</span>
      </div>
      <p class="small text-muted mb-1">{{ card.solucao }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <a href="#" class="small text-primary text-decoration-none" @click.prevent="$emit('verJornada', card)">Ver jornada</a>
        <button class="btn btn-outline-secondary btn-sm">Curtir ❤️</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
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
.card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.card.animado {
  opacity: 1;
  transform: translateY(0);
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
