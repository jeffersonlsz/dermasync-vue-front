<template>
    <div class="container py-5">
      <h2 class="fw-bold mb-4 text-center">Compartilhe sua Jornada</h2>
  
      <form @submit.prevent="enviarJornada" class="card p-4 shadow-sm">
        <div class="mb-3">
          <label class="form-label">Faixa etária</label>
          <select class="form-select" v-model="form.idade" required>
            <option disabled value="">Selecione</option>
            <option>Criança</option>
            <option>Adolescente</option>
            <option>Adulto</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Tags (várias opções)</label>
          <div class="d-flex flex-wrap gap-2">
            <label v-for="tag in tagsDisponiveis" :key="tag" class="form-check-label">
              <input type="checkbox" class="form-check-input me-1" :value="tag" v-model="form.tags" /> {{ tag }}
            </label>
          </div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Solução encontrada</label>
          <textarea class="form-control" v-model="form.solucao" rows="3" required></textarea>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Foto "Antes"</label>
          <input type="file" class="form-control" @change="handleFile($event, 'antes')" accept="image/*" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Foto "Durante"</label>
          <input type="file" class="form-control" @change="handleFile($event, 'durante')" accept="image/*" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Foto "Depois"</label>
          <input type="file" class="form-control" @change="handleFile($event, 'depois')" accept="image/*" required />
        </div>
  
        <div class="text-center">
          <button class="btn btn-success" type="submit">Enviar Jornada</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const form = ref({
    idade: '',
    tags: [],
    solucao: '',
    arquivos: {
      antes: null,
      durante: null,
      depois: null
    }
  });
  
  const tagsDisponiveis = [
    'creme', 'banho de aveia', 'corticoide', 'hidratante',
    'alimentacao', 'pomada', 'protetor solar'
  ];
  
  function handleFile(event, etapa) {
    form.value.arquivos[etapa] = event.target.files[0];
  }
  
  function enviarJornada() {
    console.log('📤 Enviando:', form.value);
    alert('Jornada enviada com sucesso!');
  }
  </script>
  
  <style scoped>
  form {
    max-width: 600px;
    margin: auto;
  }
  </style>
  