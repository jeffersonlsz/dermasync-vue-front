<template>
    <div class="filtros-galeria">
        <div class="mb-4 text-center">
            <div class="linha-filtro mb-2">
                <strong>Faixa etária :</strong>
                
                <span class="badge bg-light text-dark mx-1">Criança</span>
                <span class="badge bg-light text-dark mx-1">Adolescente</span>
                <span class="badge bg-light text-dark mx-1">Adulto</span>
                <span class="badge bg-light text-dark mx-1">Idoso(a)</span>
                <span class="badge bg-light text-dark mx-1">Não informado</span>
            </div>
            <div class="linha-filtro mb-2">
                <strong>Gênero :</strong>
                <span class="badge bg-light text-dark mx-1">Masculino</span>
                <span class="badge bg-light text-dark mx-1">Feminino</span>
                <span class="badge bg-light text-dark mx-1">Não informado</span>
            </div>
            <div class="linha-filtro mb-2">
                <strong>Região do corpo :</strong>
                <span class="badge bg-light text-dark mx-1">Rosto</span>
                <span class="badge bg-light text-dark mx-1">Pernas</span>
                <span class="badge bg-light text-dark mx-1">Braços</span>
            </div>
            </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const emit = defineEmits(['filtroAlterado']);
const filtros = reactive({
  genero: '',
  faixaEtaria: '',
  regiao: ''
});

function aplicarFiltro() {
  console.log('aplicar filtros ', filtros);
  emit('filtroAlterado', { ...filtros });
}

onMounted(() => {
  // Aqui você pode fazer uma chamada para buscar os filtros disponíveis
  // e preencher o objeto `filtros` com os dados recebidos.
  // Exemplo:
  // fetch('/api/filtros')
  //   .then(response => response.json())
  //   .then(data => {
  //     filtros.genero = data.genero;
  //     filtros.faixaEtaria = data.faixaEtaria;
  //     filtros.regiao = data.regiao;
  //   });
});

</script>

<style scoped>
.filtros-galeria {
    /* Add your styles here */
}
</style>