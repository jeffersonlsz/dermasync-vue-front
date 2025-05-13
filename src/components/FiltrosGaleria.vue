
<template>
  <div class="d-flex align-items-center gap-2 mb-3">
    <span>Filtros</span>
    <button class="btn btn-outline-secondary" @click="mostrarOverlay = true">
      <i class="bi bi-filter-circle"></i> <!-- Ícone de filtros -->
    </button>
  </div>
    

    <div v-if="mostrarOverlay" class="overlay-filtros">
      <div class="conteudo-overlay">
        <!-- Faixa Etária -->
        <label class="form-label fw-bold mb-2">Filtrar por faixa etária</label>
        <div class="d-flex flex-wrap gap-2 mb-4">
          <button
            v-for="item in ['crianca', 'adolescente', 'adulto']"
            :key="item"
            @click="toggleItem('faixaEtaria', item)"
            :class="['btn', 'filter-tag', { active: filtrosPendentes.faixaEtaria.includes(item) }]"
            style="border-radius: 20px; padding: 5px 15px;">
            {{ item.toUpperCase() }}
          </button>
        </div>

        <!-- Região Afetada -->
        <label class="form-label fw-bold mb-2">Filtrar por região afetada</label>
        <div class="d-flex flex-wrap gap-2 mb-4">
          <button
            v-for="item in ['rosto', 'pescoço', 'tronco', 'braços', 'pernas', 'mãos', 'costas', 'pés']"
            :key="item"
            @click="toggleItem('regiao', item)"
            :class="['btn', 'filter-tag', { active: filtrosPendentes.regiao.includes(item) }]"
            style="border-radius: 20px; padding: 5px 15px;">
            {{ item.toUpperCase() }}
          </button>
        </div>

            <!-- Outras Tags -->
        <label class="form-label fw-bold mb-2">Outras tags</label>
        <div class="d-flex flex-wrap gap-2 mb-4">
          <button
            v-for="tag in todasTags"
            :key="tag"
            @click="toggleTag(tag)"
            :class="['btn', 'filter-tag', { active: filtrosPendentes.tagsSelecionadas.includes(tag) }]"
            style="border-radius: 20px; padding: 5px 15px;">
            {{ tag }}
          </button>
        </div>

        <!-- Botões ao fim -->
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-outline-danger" @click="limparFiltros">Limpar filtros</button>
          <button class="btn btn-primary" @click="aplicarFiltros">Aplicar filtros</button>
        </div>
      </div>
    </div>
  
</template>

<script setup>
import { reactive, watch, ref } from 'vue';

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
  // Atualiza o estado local (caso necessário)
  console.log("Filtros pendentes:", filtrosPendentes.value);
  console.log("Filtros aplicados:", filtros.value);
  filtros.value = { ...filtrosPendentes.value }

  // Emite os filtros para o componente pai
  emit('filtrosAlterados', { ...filtrosPendentes.value })

  // Fecha o overlay
  mostrarOverlay.value = false
}

// Função para limpar os filtros
function limparFiltros() {
  filtrosPendentes.value  = {
    faixaEtaria: [],
    genero: [],
    regiao: [],
    tagsSelecionadas: []
  }
}

// Emitir sempre que um filtro mudar
/*watch(filtros, () => {
  console.log("Filtros alterados (FiltrosGaleria):", filtros);
  emit('filtrosAlterados', { ...filtros });
}, { deep: true }); */ 

function selecionar(campo, valor) {
  console.log("Campo:", campo);
  console.log("Valor:", valor);
  filtros[campo] = filtros[campo] === valor ? '' : valor;
}

// Lista base para seleção de tags (futuro: populado dinamicamente)
const todasTags = [
  "vitamina D", "corticóides", "hidratantes", "alimentação", "ácaros", 
  "imunoterapia", "medicamentos orais", "alergia alimentar", "biologicos",
   "dupixent"
];


// Função para alternar a seleção de uma categoria (faixa etária, gênero, etc.)
function toggleItem(categoria, item) {
  console.log("Categoria:", categoria);
  console.log("Item:", item);
  const idx = filtrosPendentes.value[categoria].indexOf(item)
  if (idx === -1) {
    filtrosPendentes.value[categoria].push(item)
  } else {
    filtrosPendentes.value[categoria].splice(idx, 1)
  }
}


// Função para alternar a seleção de tags
function toggleTag(tag) {
  console.log("Tag:", tag);
  console.log("Tags selecionadas:", filtrosPendentes.value.tagsSelecionadas);
  const idx = filtrosPendentes.value.tagsSelecionadas.indexOf(tag)
  if (idx === -1) {
    filtrosPendentes.value.tagsSelecionadas.push(tag)
  } else {
    filtrosPendentes.value.tagsSelecionadas.splice(idx, 1)
  }
}

</script>

<style scoped>

.overlay-filtros {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conteudo-overlay {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
}

.filter-tag {
  border: none;
  background-color: #f0f0f0;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.875rem;
  margin: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-tag.active {
  background-color: #3b82f6; /* Azul suave */
  color: white;
}

button.active {
  background-color: #0d6efd;
  color: white !important;
  border-color: #0d6efd;
}

@media screen and (max-width: 768px) {

}
</style>