<script setup>
import { ref } from 'vue';
import intersect from '../directives/intersect.js'; // ajuste o path conforme estrutura

const props = defineProps({
  card: Object
});
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
  console.log('Ver jornada:', card);
  abrirOverlay(card);
}

function abrirOverlay(card) {
  jornadaSelecionada.value = card;

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
        <a href="#" class="small text-primary text-decoration-none" @click.prevent="verJornada(card)">Ver jornada</a>
        <button class="btn btn-outline-secondary btn-sm">Curtir ❤️</button>
      </div>
    </div>
  </div>

      <!-- OVERLAY -->
      <div v-if="jornadaSelecionada" class="overlay">
        <div class="overlay-content">
          <button class="btn-close float-end" @click="jornadaSelecionada = null"></button>
          <div class="row g-4">
            <div class="col-md-6">
              <img :src="jornadaSelecionada.imgDepois" class="img-fluid rounded" alt="Imagem" />
              <div class="mt-3 d-flex gap-2">
                <img :src="jornadaSelecionada.imgAntes" width="70" height="70" class="rounded border" />
                <img :src="jornadaSelecionada.imgDepois" width="70" height="70" class="rounded border" />
              </div>
              <div class="mt-3">
                <span v-for="tag in jornadaSelecionada.tags" :key="tag" class="badge bg-primary me-2">{{ tag }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <p><strong>Faixa etária:</strong> {{ jornadaSelecionada.classificacao }}</p>
              <p><strong>Gênero:</strong> feminino</p>
              <p><strong>Área afetada:</strong> braços</p>
              <p><strong>Descrição:</strong></p>
              <p class="text-muted">{{ jornadaSelecionada.solucao }}</p>
            </div>
          </div>
        </div>
      </div>

</template>


<style scoped>

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

.overlay-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 800px;
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
