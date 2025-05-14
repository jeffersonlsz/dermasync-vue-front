<template>
<!-- OVERLAY CONTAINER -->
 <transition name="fade-overlay">
<div v-if="jornadaSelecionada" class="overlay-wrapper">
  <div class="overlay-content bg-white p-4 rounded shadow position-relative">
    <button class="btn-close position-absolute top-0 end-0 m-3" @click="$emit('update:jornadaSelecionada', null)"></button>

    <div class="row g-4 mt-3">
      <!-- LADO ESQUERDO -->
      <div class="col-md-6 border-end">

          <!-- Título + ícone -->
        <div class="d-flex align-items-center mt-3 mb-5">
          <i class="bi bi-images me-2 fs-5 text-secondary"></i>
          <h5 class="m-0">Fotos da jornada</h5>

 
        </div>

        <div class="text-center">
    <!-- Imagem Principal -->
    <img
      :src="imagens[currentIndex]"
      class="img-fluid rounded shadow-sm mb-2"
      alt="Imagem selecionada"
      style="max-height: 300px; object-fit: contain; width: 100%;"
       @click="abrirImagemAmpliada"
    />

    <!-- Thumbnails -->
    <div class="d-flex justify-content-center gap-2 mt-2 flex-wrap">
      <img
        v-for="(img, index) in imagens"
        :key="index"
        :src="img"
        @click="currentIndex = index"
        class="miniatura"
        :class="{ 'border border-primary': index === currentIndex }"
        alt="Thumbnail"
        style="width: 60px; height: 60px; object-fit: cover; cursor: pointer;"
      />
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
        <p><strong>Áreas afetadas:</strong></p>
        <div>
          <span v-for="(regiao, index) in jornadaSelecionada.regioesAfetadas" :key="index" class="badge bg-gradient-faded-info  me-1">{{ regiao }}</span>
        </div>

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
</transition>
<!-- OVERLAY IMAGEM AMPLIADA-->
<div
  v-if="showImagemAmpliada"
  class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
  style="z-index: 9999;"
  @click.self="fecharImagemAmpliada"
>
  <img
    :src="imagens[currentIndex]"
    alt="Imagem ampliada"
    style="max-height: 90vh; max-width: 90vw; object-fit: contain;"
    class="rounded shadow"
  />
  <button
    @click="fecharImagemAmpliada"
    class="btn btn-light position-absolute top-0 end-0 m-3"
  >
    &times;
  </button>
</div>


</template>

<script setup>

import { ref, computed, onMounted, onUpdated } from 'vue'

// Organiza as imagens da jornada
const props = defineProps({
  jornadaSelecionada: Object
})

const emit = defineEmits(['update:jornadaSelecionada'])
const showImagemAmpliada = ref(false)
onMounted(() => {
   console.log('Card recebido:', props.jornadaSelecionada? props.jornadaSelecionada : 'null');
   

})

onUpdated(() => {
  console.log('Card atualizado:', props.jornadaSelecionada? props.jornadaSelecionada : 'null');

  })


  const abrirImagemAmpliada = () => {
  showImagemAmpliada.value = true
}
const fecharImagemAmpliada = () => {
  showImagemAmpliada.value = false
}

const imagens = computed(() => {
  const lista = []
  if (props.jornadaSelecionada.imgAntes) lista.push(props.jornadaSelecionada.imgAntes)
  if (props.jornadaSelecionada.imgDepois) lista.push(props.jornadaSelecionada.imgDepois)
  if (props.jornadaSelecionada.imgDurante && Array.isArray(props.jornadaSelecionada.imgDurante)) {
    lista.push(...props.jornadaSelecionada.imgDurante)
  }
  return lista
})

const currentIndex = ref(0) 

</script>

<style lang="css" scoped>

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-overlay-enter-active, .fade-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}

.fade-overlay-enter-to,
.fade-overlay-leave-from {
  opacity: 1;
}

</style>