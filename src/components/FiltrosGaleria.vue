<template>
  <div class="filtros-container container">
    <h2 class="text-center mb-3">Filtrar Resultados</h2>

    <div class="accordion" id="filtrosAccordion">

      <!-- Faixa Etária -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faixaEtariaCollapse">
            Faixa etária
          </button>
        </h2>
        <div id="faixaEtariaCollapse" class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="item in ['crianca', 'adolescente', 'adulto']"
                :key="item"
                @click="toggleItem('faixaEtaria', item)"
                :class="['badge', filtros.faixaEtaria.includes(item) ? 'bg-primary' : 'bg-secondary']"
                style="cursor: pointer;">
                {{ item.toUpperCase() }} ({{ contadores.faixaEtaria[item] || 0 }})
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gênero -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#generoCollapse">
            Gênero
          </button>
        </h2>
        <div id="generoCollapse" class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="item in ['masculino', 'feminino', 'não informado']"
                :key="item"
                @click="toggleItem('genero', item)"
                :class="['badge', filtros.genero.includes(item) ? 'bg-primary' : 'bg-secondary']"
                style="cursor: pointer;">
                {{ item.toUpperCase() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Região -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#regiaoCollapse">
            Regiões afetadas
          </button>
        </h2>
        <div id="regiaoCollapse" class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="item in ['rosto', 'pescoço', 'tronco', 'braços', 'pernas', 'mãos', 'costas', 'pés']"
                :key="item"
                @click="toggleItem('regiao', item)"
                :class="['badge', filtros.regiao.includes(item) ? 'bg-primary' : 'bg-secondary']"
                style="cursor: pointer;">
                {{ item.toUpperCase() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Outras Tags -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#tagsCollapse">
            Questões relacionadas
          </button>
        </h2>
        <div id="tagsCollapse" class="accordion-collapse collapse">
          <div class="accordion-body">
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="tag in todasTags"
                :key="tag"
                @click="toggleTag(tag)"
                :class="['badge', filtros.tagsSelecionadas.includes(tag) ? 'bg-info' : 'bg-light']"
                style="cursor: pointer;">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="text-center mt-4">
      <button class="btn btn-outline-secondary" @click="limparFiltros">Limpar filtros</button>
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
  width: 50%;
  
  
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