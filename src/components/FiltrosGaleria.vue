<template>
  <div class="filtros-container container text-center">

    <!-- Faixa Etária -->
    <div class="row align-items-center mb-3">
      <div class="col-auto d-block mb-2">Faixa etária:</div>
      <div
        v-for="item in ['crianca', 'adolescente', 'adulto']"
        :key="item"
        @click="toggleItem('faixaEtaria', item)"
        :class="['filter-tag col-auto', filtros.faixaEtaria.includes(item) ? 'bg-primary text-white' : 'bg-light text-dark']"
        style="cursor: pointer;"
      >
        {{ item.toUpperCase() }} ({{ contadores.faixaEtaria[item] || 0 }})
    </div>
    </div>

    <!-- Gênero -->
    <div class="row align-items-center mb-3">
      <strong class="col-auto d-block mb-2">Gênero:</strong>
      <span v-for="item in ['masculino', 'feminino', 'não informado']" :key="item"
        @click="toggleItem('genero', item)"
        :class="['filter-tag col-auto', filtros.genero.includes(item) ? 'bg-primary text-white' : 'bg-light text-dark']"
        style="cursor: pointer;">
        {{ item.toUpperCase() }}
      </span>
    </div>

    <!-- Região -->
    <div class="row align-items-center mb-3">
      <strong class="col-auto d-block mb-2">Regiões afetadas:</strong>
      <span v-for="item in ['rosto', 'pescoço', 'tronco', 'braços', 'pernas', 'mãos', 'costas', 'pés']" :key="item"
        @click="toggleItem('regiao', item)"
        :class="['filter-tag col-auto', filtros.regiao.includes(item) ? 'bg-primary text-white' : 'bg-light text-dark']"
        style="cursor: pointer;">
        {{ item.toUpperCase() }}
      </span>
    </div>

    <!-- Tags dinâmicas -->
    <div class="row align-items-center mb-3">
      <strong class="col-auto d-block mb-2">Outras tags:</strong>
      <span v-for="tag in todasTags" :key="tag"
        @click="toggleTag(tag)"
        :class="['col-auto badge me-1 mb-1 bg-light text-dark', filtros.tagsSelecionadas.includes(tag) ? 'bg-secondary text-white' : 'bg-light text-muted']"
        style="cursor: pointer;">
        {{ tag }}
      </span>
    </div>

    <div class="mt-3">
      <button class="btn btn-sm" @click="limparFiltros">
        Limpar filtros
      </button>
    </div>

  </div>
</template>


<script setup>
import { reactive, watch } from 'vue';

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


const emit = defineEmits(['filtrosAlterados']);

const filtros = reactive({
  faixaEtaria: [],
  genero: [],
  regiao: [],
  tagsSelecionadas: []
});

function limparFiltros() {
  filtros.faixaEtaria = [];
  filtros.genero = [];
  filtros.regiao = [];
  filtros.tagsSelecionadas = [];
}

// Emitir sempre que um filtro mudar
watch(filtros, () => {
  console.log("Filtros alterados (FiltrosGaleria):", filtros);
  emit('filtrosAlterados', { ...filtros });
}, { deep: true });

function selecionar(campo, valor) {
  filtros[campo] = filtros[campo] === valor ? '' : valor;
}

// Lista base para seleção de tags (futuro: populado dinamicamente)
const todasTags = [
  "vitamina D", "corticóides", "hidratantes", "alimentação", "ácaros", 
  "imunoterapia", "medicamentos orais", "alergia alimentar", "biologicos",
   "dupixent"
];

function toggleItem(campo, valor) {
  const lista = filtros[campo];
  const index = lista.indexOf(valor);
  if (index >= 0) {
    lista.splice(index, 1);
  } else {
    lista.push(valor);
  }
}


function toggleTag(tag) {
  const index = filtros.tagsSelecionadas.indexOf(tag);
  if (index >= 0) {
    filtros.tagsSelecionadas.splice(index, 1);
  } else {
    filtros.tagsSelecionadas.push(tag);
  }
}

</script>

<style scoped>

.filtros-container {
  
  margin-bottom: 1rem;

  
  
}

.filtros-container  > .row {
  
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

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
</style>