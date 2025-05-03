<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import intersect from '../directives/intersect.js'; // ajuste o path conforme estrutura

onMounted(() => {
  
 
});

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

<!-- OVERLAY CONTAINER -->
<div v-if="jornadaSelecionada" class="overlay-wrapper">
  <div class="overlay-content bg-white p-4 rounded shadow position-relative">
    <button class="btn-close position-absolute top-0 end-0 m-3" @click="jornadaSelecionada = null"></button>

    <div class="row g-4 mt-3">
      <!-- LADO ESQUERDO -->
      <div class="col-md-6 border-end">

          <!-- Título + ícone -->
        <div class="d-flex align-items-center mt-3 mb-5">
          <i class="bi bi-images me-2 fs-5 text-secondary"></i>
          <h5 class="m-0">Fotos da jornada</h5>

 
        </div>

        <div class="text-center">
          <img
              :src="jornadaSelecionada.imgDepois"
              class="img-fluid rounded shadow-sm mb-2"
              alt="Depois"
              style="max-height: 300px; object-fit: contain; width: 100%;"
            />
            <div class="d-flex justify-content-center gap-2 mt-2">
              <img :src="jornadaSelecionada.imgAntes" class="miniatura" alt="Antes" />
              <img :src="jornadaSelecionada.imgDepois" class="miniatura" alt="Depois" />
            </div>

        </div>


      </div>

      <!-- LADO DIREITO -->
      <div class="col-md-6">

            <!-- Título + ícone -->
          <div class="d-flex align-items-center  mt-3 mb-5">
            <i class="bi bi-info-circle me-2 fs-5 text-secondary"></i>
            <h5 class="m-0">Informações adicionais</h5>
          </div>

        <p><strong>Faixa etária:</strong> {{ jornadaSelecionada.classificacao }}</p>
        <p><strong>Gênero:</strong> {{ jornadaSelecionada.genero }}</p>
        <p><strong>Áreas afetada:</strong> {{ jornadaSelecionada.regioesAfetadas }}</p>

        <p class="mt-3"><strong>Descrição:</strong></p>
        <p class="text-muted">{{ jornadaSelecionada.descricao }}</p>
        
        <div class="mt-4">
          <span v-for="tag in jornadaSelecionada.tags" :key="tag" class="badge bg-primary me-2 mb-1">{{ tag }}</span>
        </div>

        <hr />

        <h6 class="fw-bold">Sugestões geradas via IA</h6>
        <p>Pessoas como você tentaram <strong>{{ jornadaSelecionada.sugestaoPrincipal || 'lorem ipsum' }}</strong> com bons resultados.</p>
        <p class="text-muted small">
          Para adultos com {{ jornadaSelecionada.condicao || 'lorem ipsum pacabis ipsis' }}, 68% relataram melhora em até 9 dias.
        </p>

        <a href="#" class="d-block mb-3 text-primary">Ver histórias semelhantes</a>

        <h6 class="fw-bold mt-4">Comparador de abordagens</h6>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Tratamento</th>
              <th>N° Relatos</th>
              <th>Média (dias)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(linha, index) in jornadaSelecionada.comparador" :key="index">
              <td>{{ linha.nome }}</td>
              <td>{{ linha.nrelatos }}</td>
              <td>{{ linha.mediaDias }}</td>
            </tr>
          </tbody>
        </table>

        <button class="btn btn-primary w-100 mt-3">Quero seguir essa jornada</button>
      </div>
    </div>
  </div>
</div>


</template>


<style scoped>

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
