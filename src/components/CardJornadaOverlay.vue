<template>
  <!-- OVERLAY CONTAINER -->
  <transition name="fade-overlay">
    <div v-if="jornadaSelecionada" class="overlay-wrapper">
      <div class="overlay-content bg-white p-4 rounded shadow position-relative">
        <div class="overlay-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <h5 class="mb-0">
            🧴 {{ jornadaSelecionada?.titulo || 'Detalhes da Jornada' }}
          </h5>
          <button
            class="btn-close position-absolute top-0 end-0 m-3"
            @click="$emit('update:jornadaSelecionada', null)"
          ></button>
        </div>
          
      <!-- Nav Pills bonitos -->
      <div class="nav nav-pills nav-fills my-3 hidden md:block">
        <div class="d-flex gap-3 bg-[#f8f9fa] p-1 rounded-pill shadow-inner w-full max-w-md mx-auto">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'nav-item border flex-1 text-center py-2 rounded-pill text-sm font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-white text-primary shadow-md'
                : 'text-gray-600 hover:text-primary'
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

            <!-- Conteúdo das Abas -->
        <div class="bg-white rounded-xl shadow-inner h-[500px]">
          <div v-if="activeTab === 'Informações da jornada'">
            
                <!--CONTEUDO DA PRIMEIRA ABA -->
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
              <img :src="imagens[currentIndex]" class="img-fluid rounded shadow-sm mb-2" alt="Imagem selecionada"
                style="max-height: 300px; object-fit: contain; width: 100%;" @click="abrirImagemAmpliada" />

              <!-- Thumbnails -->
              <div class="d-flex justify-content-center gap-2 mt-2 flex-wrap">
                <img v-for="(img, index) in imagens" :key="index" :src="img" @click="currentIndex = index"
                  class="miniatura" :class="{ 'border border-primary': index === currentIndex }" alt="Thumbnail"
                  style="width: 60px; height: 60px; object-fit: cover; cursor: pointer;" />
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
              <span v-for="(regiao, index) in jornadaSelecionada.regioesAfetadas" :key="index"
                class="badge bg-gradient-faded-info  me-1">{{ regiao }}</span>
            </div>

            <p class="mt-3"><strong>Descrição:</strong></p>
            <p class="text-muted">{{ jornadaSelecionada.descricao }}</p>

            <div class="mt-4">
              <span v-for="tag in jornadaSelecionada.tags" :key="tag" class="badge bg-primary me-2 mb-1">{{ tag
                }}</span>
            </div>

            <hr />


            <button class="btn btn-primary w-100 mt-3">Quero seguir essa jornada</button>
          </div>
        </div>

        <!-- FIM CONTEUDO DA PRIMEIRA ABA -->

          </div>

          <div v-if="activeTab === 'Casos semelhantes'">
            <p>Você pode listar aqui os casos com maior similaridade vetorial com base no embedding.</p>
             <div class="px-3 py-2">
          <p class="mb-3 text-muted">Encontramos {{ casos.length }} casos com alta similaridade:</p>

          <div
            v-for="(caso, index) in casos"
            :key="index"
            class="d-flex align-items-start mb-3 p-3 border rounded shadow-sm bg-white"
          >
            <img
              :src="caso.imagem"
              alt="Foto do caso semelhante"
              class="me-3 rounded"
              style="width: 64px; height: 64px; object-fit: cover;"
            />

            <div class="flex-grow-1">
              <p class="mb-1">
                <i class="bi bi-person-fill"></i>
                <strong>{{ caso.genero }}</strong> · <strong>{{ caso.faixaEtaria }}</strong>
                | Áreas: <strong>{{ caso.areas }}</strong>
              </p>
              <p class="text-muted mb-1" style="font-size: 0.9rem;">{{ caso.descricao }}</p>
              <a href="#" class="text-primary" style="font-size: 0.9rem;">
                🔍 Ver jornada completa
              </a>
            </div>
          </div>
        </div>

            <div class="text-center mt-3">
              <button class="btn btn-outline-primary">Ver mais casos semelhantes</button>
            </div>


          </div>

          <div v-if="activeTab === 'Dicas de tratamentos'">
            <p>Exiba aqui sugestões extraídas com LLM ou baseadas em recorrência de soluções na sua base.</p>
            <div class="px-3 py-2">
            <h5 class="mb-2">💡 Dicas de tratamentos</h5>
            <p class="text-muted mb-4">Baseado em experiências de usuários com casos semelhantes</p>

            <ul class="list-unstyled">
              <li v-for="(dica, index) in dicas" :key="index" class="mb-2 d-flex align-items-start">
                <span class="me-2" style="font-size: 1.2rem;">{{ dica.icone }}</span>
                <span>{{ dica.texto }}</span>
              </li>
            </ul>

            <p class="text-muted mt-4" style="font-size: 0.85rem;">
              ⚠️ Essas dicas não substituem avaliação médica.
            </p>
          </div>

          </div>
        </div>
      </div>
         
     
        
      </div>
   
  </transition>
  <!-- OVERLAY IMAGEM AMPLIADA-->
  <div v-if="showImagemAmpliada"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
    style="z-index: 9999;" @click.self="fecharImagemAmpliada">
    <img :src="imagens[currentIndex]" alt="Imagem ampliada"
      style="max-height: 90vh; max-width: 90vw; object-fit: contain;" class="rounded shadow" />
    <button @click="fecharImagemAmpliada" class="btn btn-light position-absolute top-0 end-0 m-3">
      &times;
    </button>
  </div>
  <!-- Nav flutuante visível apenas no mobile -->
<div class="tab-overlay-mobile d-md-none">
  <button
    v-for="(aba, index) in abas"
    :key="index"
    @click="abaAtiva = aba.id"
    :class="['btn-tab', { ativo: abaAtiva === aba.id }]"
  >
    {{ aba.label }}
  </button>
</div>


</template>

<script setup>

import { ref, computed, onMounted, onUpdated } from 'vue'

const casos = [
  {
    imagem: "https://placehold.co/64x64.png?text=Img1",
    genero: "Mulher",
    faixaEtaria: "Adulto",
    areas: "braços",
    descricao: "Comecei a usar compressas frias e corticoide leve...",
  },
  {
    imagem: "https://placehold.co/64x64.png?text=Img2",
    genero: "Mulher",
    faixaEtaria: "Adulto",
    areas: "braços",
    descricao: "Sofri por anos até descobrir um hidratante alemão...",
  },
  {
    imagem: "https://placehold.co/64x64.png?text=Img3",
    genero: "Mulher",
    faixaEtaria: "Adulto",
    areas: "braços",
    descricao: "A alimentação foi chave no meu caso...",
  },
];

const dicas = [
  { icone: "🧴", texto: "Hidratantes espessos aplicados 2x/dia" },
  { icone: "💊", texto: "Corticoides tópicos leves em crise aguda" },
  { icone: "🧊", texto: "Compressas frias antes de dormir" },
  { icone: "🥦", texto: "Redução de laticínios e alimentos ultraprocessados" },
  { icone: "🧼", texto: "Evitar sabonetes com perfume" },
  { icone: "🥥", texto: "Uso de óleo de coco em áreas ressecadas" },
];
const abas = [
  { id: 'info', label: 'Informações' },
  { id: 'casos', label: 'Semelhantes' },
  { id: 'dicas', label: 'Tratamentos' },
];

const abaAtiva = ref('info');
const tabs = ['Informações da jornada', 'Casos semelhantes', 'Dicas de tratamentos']
const activeTab = ref(tabs[0])

// Organiza as imagens da jornada
const props = defineProps({
  jornadaSelecionada: Object
})

const emit = defineEmits(['update:jornadaSelecionada'])
const showImagemAmpliada = ref(false)
onMounted(() => {
  console.log('Card recebido:', props.jornadaSelecionada ? props.jornadaSelecionada : 'null');


})

onUpdated(() => {
  console.log('Card atualizado:', props.jornadaSelecionada ? props.jornadaSelecionada : 'null');

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
  height: 100vh;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 960px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}


.tab-overlay-mobile {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 8px 12px;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
   z-index: 9999; /* aumente isso! */
  display: flex;
  gap: 10px;
}

.btn-tab {
  border: none;
  padding: 8px 14px;
  background-color: #f1f1f1;
  border-radius: 1.5rem;
  font-size: 0.85rem;
  color: #333;
  transition: all 0.2s ease;
}

.btn-tab.ativo {
  background-color: #6c63ff;
  color: white;
  font-weight: bold;
}

.rounded-pill{
  border-radius: 5% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
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