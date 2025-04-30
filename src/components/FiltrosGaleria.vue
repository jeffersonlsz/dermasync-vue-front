<template>
  <div class="text-center">

    <!-- Faixa Etária -->
    <div class="mb-3">
      <strong class="d-block mb-2">Faixa etária:</strong>
      <span v-for="item in ['criança', 'adolescente', 'adulto']" :key="item"
        @click="toggleItem('faixaEtaria', item)"
        :class="['badge me-1 mb-1', filtros.faixaEtaria.includes(item) ? 'bg-primary text-white' : 'bg-light text-dark']"
        style="cursor: pointer;">
        {{ item.toUpperCase() }}
      </span>
    </div>

    <!-- Gênero -->
    <div class="mb-3">
      <strong class="d-block mb-2">Gênero:</strong>
      <span v-for="item in ['masculino', 'feminino', 'não informado']" :key="item"
        @click="toggleItem('genero', item)"
        :class="['badge me-1 mb-1', filtros.genero.includes(item) ? 'bg-primary text-white' : 'bg-light text-dark']"
        style="cursor: pointer;">
        {{ item.toUpperCase() }}
      </span>
    </div>

    <!-- Região -->
    <div class="mb-3">
      <strong class="d-block mb-2">Regiões afetadas:</strong>
      <span v-for="item in ['rosto', 'pescoço', 'tronco', 'braços', 'pernas']" :key="item"
        @click="toggleItem('regiao', item)"
        :class="['badge me-1 mb-1', filtros.regiao.includes(item) ? 'bg-primary text-white' : 'bg-light text-dark']"
        style="cursor: pointer;">
        {{ item.toUpperCase() }}
      </span>
    </div>

    <!-- Tags dinâmicas -->
    <div class="mb-2">
      <strong class="d-block mb-2">Outras tags:</strong>
      <span v-for="tag in todasTags" :key="tag"
        @click="toggleTag(tag)"
        :class="['badge me-1 mb-1', filtros.tagsSelecionadas.includes(tag) ? 'bg-secondary text-white' : 'bg-light text-muted']"
        style="cursor: pointer;">
        {{ tag }}
      </span>
    </div>

    <div class="mt-3">
      <button class="btn btn-outline-secondary btn-sm" @click="limparFiltros">
        Limpar filtros
      </button>
    </div>

  </div>
</template>


<script setup>
import { reactive, watch } from 'vue';

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
  "vitamina D", "corticóides", "hidratantes", "alimentação", "ácaros"
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