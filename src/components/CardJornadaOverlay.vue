<template>
  <transition name="fade-overlay">
    <div v-if="jornadaSelecionada" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        @click="$emit('update:jornadaSelecionada', null)"></div>

      <!-- Modal Content -->
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
          <h2 class="text-xl md:text-2xl font-heading font-bold text-gray-800 line-clamp-1">
            {{ jornadaSelecionada?.tituloRelato || 'Detalhes da Jornada' }}
          </h2>
          <button @click="$emit('update:jornadaSelecionada', null)"
            class="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Fechar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto bg-gray-50">
          <div class="p-6">

            <!-- Tags & Tabs Mobile/Desktop -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <!-- Tabs -->
              <div class="bg-gray-200/50 p-1 rounded-full inline-flex self-start md:self-auto">
                <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                  class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  :class="activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-800'">
                  {{ tab }}
                </button>
              </div>

              <!-- Badges -->
              <div class="flex gap-2">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-skin-100 text-primary-600">
                  {{ jornadaSelecionada.classificacao }}
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                  {{ jornadaSelecionada.genero }}
                </span>
              </div>
            </div>

            <!-- TAB CONTENT -->
            <div class="bg-white rounded-2xl shadow-sm p-6 md:p-8 min-h-[400px]">

              <!-- INFO TAB -->
              <div v-if="activeTab === 'Informações da jornada'"
                class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                <!-- Left Column: Carousel -->
                <div class="space-y-4">
                  <div class="relative aspect-video lg:aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden group">
                    <template v-if="imagens.length > 0">
                      <img :src="imagens[fotoAtual]"
                        class="w-full h-full object-contain cursor-zoom-in transition-transform duration-500"
                        @click="abrirImagemAmpliada" alt="Foto da jornada" />

                      <!-- Controls -->
                      <div v-if="imagens.length > 1"
                        class="absolute inset-0 flex items-center justify-between p-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click.stop="fotoAnterior"
                          class="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white shadow-lg text-gray-800 transition-all transform hover:scale-110">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button @click.stop="proximaFoto"
                          class="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white shadow-lg text-gray-800 transition-all transform hover:scale-110">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <!-- Indicators -->
                      <div v-if="imagens.length > 1"
                        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/20 backdrop-blur rounded-full">
                        <button v-for="(img, idx) in imagens" :key="idx" @click.stop="selecionarFoto(idx)"
                          class="w-2 h-2 rounded-full transition-all"
                          :class="idx === fotoAtual ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'"></button>
                      </div>
                    </template>
                    <div v-else class="flex items-center justify-center h-full text-gray-400">
                      <span class="text-sm">Sem imagens disponíveis</span>
                    </div>
                  </div>

                  <!-- Thumbnails -->
                  <div v-if="imagens.length > 1" class="flex gap-2 overflow-x-auto pb-2 justify-center">
                    <button v-for="(foto, index) in imagens" :key="index" @click="selecionarFoto(index)"
                      class="relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0"
                      :class="fotoAtual === index ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-200'">
                      <img :src="foto" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>

                <!-- Right Column: Text & Details -->
                <div class="flex flex-col">
                  <!-- UX Effects Message -->
                  <div v-if="jornadaSelecionada.ux_effects?.length > 0"
                    class="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
                    {{ jornadaSelecionada.ux_effects[0].message }}
                  </div>

                  <!-- Areas Afetadas -->
                  <div class="mb-6">
                    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Áreas Afetadas</h4>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(regiao, index) in jornadaSelecionada.regioesAfetadas" :key="index"
                        class="px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-lg border border-teal-100">
                        {{ regiao }}
                      </span>
                    </div>
                  </div>

                  <!-- Relato -->
                  <div class="mb-6 flex-1">
                    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Relato da Experiência</h4>
                    <div
                      class="prose prose-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p class="whitespace-pre-line">{{ textoResumido }}</p>
                    </div>
                    <button v-if="temTextoEscondido" @click="expandirTexto"
                      class="mt-2 text-sm text-primary font-semibold hover:text-primary-600 flex items-center gap-1 group">
                      Ler relato completo
                      <svg class="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <!-- Tags -->
                  <div v-if="jornadaSelecionada.tags && jornadaSelecionada.tags.length > 0">
                    <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                      <span v-for="tag in jornadaSelecionada.tags.slice(0, 5)" :key="tag"
                        class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- CASOS SEMELHANTES TAB -->
              <div v-else-if="activeTab === 'Casos semelhantes'" class="animate-fadeIn">
                <div v-if="loadingCasos" class="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4">
                  </div>
                  <p>Buscando conexões...</p>
                </div>

                <div v-else>
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-gray-800">Casos com alta similaridade</h3>
                    <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{{ casos.length }}
                      encontrados</span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(caso, index) in casos" :key="index"
                      class="bg-white border boundary-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex gap-4">
                      <div class="flex -space-x-4 flex-shrink-0">
                        <img :src="caso.imgAntes"
                          class="w-16 h-16 rounded-lg object-cover border-2 border-white shadow-sm" />
                        <img :src="caso.imgDepois"
                          class="w-16 h-16 rounded-lg object-cover border-2 border-white shadow-sm" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-xs font-bold text-gray-900">{{ caso.genero }}</span>
                          <span class="text-gray-300">•</span>
                          <span class="text-xs text-gray-500">{{ caso.faixaEtaria }}</span>
                        </div>
                        <p class="text-xs text-gray-600 line-clamp-2 mb-2">{{ caso.descricao }}</p>
                        <button class="text-xs text-primary font-semibold hover:underline">Ver detalhes</button>
                      </div>
                    </div>
                  </div>

                  <div class="text-center mt-8">
                    <button
                      class="px-6 py-2 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary-50 transition-colors"
                      @click="buscarCasosSemelhantes">
                      Carregar mais casos
                    </button>
                  </div>
                </div>
              </div>

              <!-- DICAS TAB -->
              <div v-else-if="activeTab === 'Dicas de tratamentos'" class="animate-fadeIn">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="(categoria, index) in categoriasTratamento" :key="index"
                    class="rounded-xl p-5 border transition-all hover:shadow-md"
                    :style="{ backgroundColor: categoria.corFundo, borderColor: categoria.corFundo }">
                    <h5 class="flex items-center gap-2 font-bold text-gray-800 mb-4 text-lg">
                      <span class="text-2xl">{{ categoria.icone }}</span> {{ categoria.nome }}
                    </h5>
                    <ul class="space-y-3">
                      <li v-for="(item, i) in categoria.itens" :key="i" class="flex items-start gap-3 text-gray-700">
                        <span class="mt-0.5">{{ item.icone }}</span>
                        <span class="text-sm font-medium leading-relaxed">{{ item.texto }}</span>
                      </li>
                    </ul>

                    <div v-if="categoria.produto"
                      class="mt-6 bg-white/60 backdrop-blur rounded-lg p-3 flex gap-4 items-center border border-white/50 shadow-sm">
                      <img :src="categoria.produto.imagem" class="w-16 h-16 object-contain bg-white rounded-md p-1" />
                      <div class="flex-1">
                        <p class="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Sugerido pela
                          comunidade</p>
                        <p class="text-sm font-bold text-gray-900 leading-tight mb-1">{{ categoria.produto.nome }}</p>
                        <p class="text-xs text-primary font-bold">{{ categoria.produto.preco }}</p>
                      </div>
                      <a :href="categoria.produto.link" target="_blank"
                        class="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full transition-colors">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="mt-8 text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <p class="text-sm text-yellow-800 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Estas dicas não substituem avaliação médica profissional.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox for Zoomed Image -->
      <transition name="fade">
        <div v-if="showImagemAmpliada" class="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4"
          @click="fecharImagemAmpliada">
          <img :src="imagens[fotoAtual]"
            class="max-w-full max-h-screen object-contain rounded-lg shadow-2xl skew-y-0" />
          <button class="absolute top-4 right-4 text-white hover:text-gray-300 p-2" @click="fecharImagemAmpliada">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </transition>

    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { buscarCasosSemelhantesAPI } from '../services/casosService'

const props = defineProps({
  jornadaSelecionada: Object
})

const emit = defineEmits(['update:jornadaSelecionada'])

const casos = ref([])
const loadingCasos = ref(false)
const textoExpandido = ref(false)

const textoResumido = computed(() => {
  const texto =
    props.jornadaSelecionada?.descricao ||
    props.jornadaSelecionada?.excerpt ||
    ""

  if (!textoExpandido.value) {
    return texto.slice(0, 180) + (texto.length > 180 ? '...' : '')
  }

  return texto
})

const temTextoEscondido = computed(() => {
  const texto =
    props.jornadaSelecionada?.descricao ||
    props.jornadaSelecionada?.excerpt ||
    ""
  return !textoExpandido.value && texto.length > 180;
});

const expandirTexto = () => {
  textoExpandido.value = true;
}

// Reset text state when journey changes
watch(() => props.jornadaSelecionada, () => {
  textoExpandido.value = false;
  fotoAtual.value = 0;
  activeTab.value = tabs['info'];
});

const buscarCasosSemelhantes = async () => {
  let info = {
    id: props.jornadaSelecionada.id,
    genero: props.jornadaSelecionada.genero,
    classificacao: props.jornadaSelecionada.classificacao,
    regioesAfetadas: props.jornadaSelecionada.regioesAfetadas,
    tags: props.jornadaSelecionada.tags,
    descricao: props.jornadaSelecionada.descricao
  };
  loadingCasos.value = true;
  try {
    const response = await buscarCasosSemelhantesAPI(info);
    casos.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar casos semelhantes:', error);
    casos.value = [];
  } finally {
    loadingCasos.value = false;
    jaBuscou.value = true;
  }
}

const tabs = { 'info': 'Informações da jornada', 'casos': 'Casos semelhantes', 'dicas': 'Dicas de tratamentos' }
const activeTab = ref(tabs['info'])
const jaBuscou = ref(false)

watch(() => activeTab.value, async (novoValor) => {
  if (novoValor === tabs.casos && !jaBuscou.value) {
    await buscarCasosSemelhantes();
  }
});

/* Carousel Logic */
const fotoAtual = ref(0);
const imagens = computed(() => {
  const lista = []
  if (props.jornadaSelecionada.imgAntes) lista.push(props.jornadaSelecionada.imgAntes)
  if (props.jornadaSelecionada.imgDepois) lista.push(props.jornadaSelecionada.imgDepois)
  if (props.jornadaSelecionada.imgDurante && Array.isArray(props.jornadaSelecionada.imgDurante)) {
    lista.push(...props.jornadaSelecionada.imgDurante)
  }
  return lista
})

const selecionarFoto = (index) => {
  if (index >= 0 && index < imagens.value.length) {
    fotoAtual.value = index;
  }
};

const proximaFoto = () => {
  fotoAtual.value = (fotoAtual.value < imagens.value.length - 1) ? fotoAtual.value + 1 : 0;
};

const fotoAnterior = () => {
  fotoAtual.value = (fotoAtual.value > 0) ? fotoAtual.value - 1 : imagens.value.length - 1;
};

const showImagemAmpliada = ref(false)
const abrirImagemAmpliada = () => showImagemAmpliada.value = true
const fecharImagemAmpliada = () => showImagemAmpliada.value = false

/* Static Data for Demo/Styling */
const categoriasTratamento = [
  {
    nome: 'Hábitos Diários',
    icone: '🌿',
    corFundo: '#f0fdf4', // green-50
    itens: [
      { icone: '🧊', texto: 'Compressas frias antes de dormir' },
      { icone: '🚿', texto: 'Evitar sabonetes com perfume' },
      { icone: '🥛', texto: 'Redução de laticínios e ultraprocessados' }
    ]
  },
  {
    nome: 'Hidratantes e Óleos',
    icone: '💧',
    corFundo: '#eff6ff', // blue-50
    itens: [
      { icone: '🧴', texto: 'Hidratantes espessos aplicados 2x/dia' },
      { icone: '🥥', texto: 'Uso de óleo de coco em áreas ressecadas' }
    ],
    produto: {
      nome: 'Hidratante CeraVe Pele Seca – 473ml',
      preco: 'R$ 79,90',
      imagem: 'https://m.media-amazon.com/images/I/61vyW3Dl-7L._AC_UL320_.jpg',
      link: 'www.amazon.com.br/Loção-Hidratante-Corporal-Textura-Fluida-Cerave/dp/B07RK4HST7'
    }
  },
  {
    nome: 'Pomadas e Cremes',
    icone: '🧴',
    corFundo: '#fffbeb', // amber-50
    itens: [
      { icone: '🌿', texto: 'Pomada Zudaifu' },
      { icone: '💊', texto: 'Corticoides tópicos leves em crise aguda' }
    ]
  }
]
</script>

<style scoped>
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>