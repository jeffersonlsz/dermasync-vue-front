<template>
  <div class="flex items-center mb-3 cursor-pointer group" @click="mostrarOverlay = true">
    <div
      class="p-2 rounded-full bg-primary-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors mr-3">
      <i class="bi bi-filter text-xl"></i>
    </div>
    <span class="font-semibold text-gray-700 group-hover:text-primary transition-colors">Filtrar Galeria</span>
  </div>

  <Teleport to="body">
    <div v-if="mostrarOverlay" class="fixed inset-0 z-[1050] flex items-center justify-center px-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="mostrarOverlay = false">
      </div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">

        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 class="text-xl font-heading font-bold text-gray-900">Filtros</h3>
          <button @click="mostrarOverlay = false"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <i class="bi bi-x-lg text-lg"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

          <!-- Faixa Etária -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Faixa Etária</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="item in ['crianca', 'adolescente', 'adulto']" :key="item"
                @click="toggleItem('faixaEtaria', item)" :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
                  filtrosPendentes.faixaEtaria.includes(item)
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                ]">
                {{ item.toUpperCase() }}
              </button>
            </div>
          </div>

          <!-- Região Afetada -->
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Região Afetada</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="item in ['rosto', 'pescoço', 'tronco', 'braços', 'pernas', 'mãos', 'costas', 'pés']"
                :key="item" @click="toggleItem('regiao', item)" :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
                  filtrosPendentes.regiao.includes(item)
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                ]">
                {{ item.charAt(0).toUpperCase() + item.slice(1) }}
              </button>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <button
            class="px-4 py-2 text-sm font-medium text-error hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            @click="limparFiltros">
            Limpar filtros
          </button>
          <button
            class="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            @click="aplicarFiltros">
            Aplicar Filtros
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';

defineProps({
  contadores: {
    type: Object,
    default: () => ({
      faixaEtaria: {},
      genero: {},
      regiao: {},
      tags: {}
    })
  }
});

const mostrarOverlay = ref(false);
const emit = defineEmits(['filtrosAlterados']);

const filtros = reactive({
  faixaEtaria: [],
  genero: [],
  regiao: [],
  tagsSelecionadas: []
});

const filtrosPendentes = ref({
  faixaEtaria: [],
  genero: [],
  regiao: [],
  tagsSelecionadas: []
})

function aplicarFiltros() {
  console.log("Filtros pendentes:", filtrosPendentes.value);
  filtros.value = { ...filtrosPendentes.value }

  emit('filtrosAlterados', { ...filtrosPendentes.value })
  mostrarOverlay.value = false
}

function limparFiltros() {
  filtrosPendentes.value = {
    faixaEtaria: [],
    genero: [],
    regiao: [],
    tagsSelecionadas: []
  }
}

function toggleItem(categoria, item) {
  const idx = filtrosPendentes.value[categoria].indexOf(item)
  if (idx === -1) {
    filtrosPendentes.value[categoria].push(item)
  } else {
    filtrosPendentes.value[categoria].splice(idx, 1)
  }
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    mostrarOverlay.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
</style>