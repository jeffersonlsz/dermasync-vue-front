<template>
  <div class="flex items-center cursor-pointer group" @click="mostrarOverlay = true">
    <div
      class="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-50 border border-gray-100/80 text-gray-600 transition-all duration-300 group-hover:bg-gray-100 group-hover:text-gray-900 group-hover:border-gray-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
      <span class="text-[13px] font-medium tracking-wide">Refinar experiências</span>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="mostrarOverlay" class="fixed inset-0 z-[1050] flex items-center justify-center px-4 sm:px-0">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" @click="mostrarOverlay = false">
      </div>

      <!-- Modal Content -->
      <div class="relative bg-white sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-xl overflow-hidden animate-fade-in-up">

        <!-- Header -->
        <div class="flex items-center justify-between px-8 py-6 border-b border-gray-100/60">
          <h3 class="text-lg font-medium text-gray-900 tracking-tight">Filtros</h3>
          <button @click="mostrarOverlay = false"
            class="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Body -->
        <div class="px-8 py-8 max-h-[70vh] overflow-y-auto custom-scrollbar flex flex-col gap-10">

          <!-- Faixa Etária -->
          <div>
            <label class="block text-[11px] font-semibold text-gray-400 mb-4 uppercase tracking-[0.1em]">Momento da vida</label>
            <div class="flex flex-wrap gap-2.5">
              <button v-for="item in ['crianca', 'adolescente', 'adulto']" :key="item"
                @click="toggleItem('faixaEtaria', item)" :class="[
                  'px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 border',
                  filtrosPendentes.faixaEtaria.includes(item)
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/10'
                    : 'bg-white text-gray-600 border-gray-200/80 hover:bg-gray-50 hover:text-gray-900'
                ]">
                {{ item.charAt(0).toUpperCase() + item.slice(1) }}
              </button>
            </div>
          </div>

          <!-- Região Afetada -->
          <div>
            <label class="block text-[11px] font-semibold text-gray-400 mb-4 uppercase tracking-[0.1em]">Região Afetada</label>
            <div class="flex flex-wrap gap-2.5">
              <button v-for="item in ['rosto', 'pescoço', 'tronco', 'braços', 'pernas', 'mãos', 'costas', 'pés']"
                :key="item" @click="toggleItem('regiao', item)" :class="[
                  'px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 border',
                  filtrosPendentes.regiao.includes(item)
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/10'
                    : 'bg-white text-gray-600 border-gray-200/80 hover:bg-gray-50 hover:text-gray-900'
                ]">
                {{ item.charAt(0).toUpperCase() + item.slice(1) }}
              </button>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-8 py-5 border-t border-gray-100/60 flex justify-between items-center bg-white">
          <button
            class="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
            @click="limparFiltros">
            Limpar tudo
          </button>
          <button
            class="px-7 py-2.5 bg-gray-900 text-white text-[14px] font-medium tracking-wide rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:bg-gray-800 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300"
            @click="aplicarFiltros">
            Aplicar
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