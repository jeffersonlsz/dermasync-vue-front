<template>
  <div
    class="dropzone p-4 text-center border rounded-3 bg-light position-relative"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <i class="bi bi-upload fs-2 text-primary mb-2"></i>
    <p class="mb-1">{{ label }}</p>
    <small class="text-muted">{{ multiple ? `Até ${max} imagens` : '1 imagem' }}</small>
    <input
      type="file"
      class="d-none"
      ref="fileInput"
      :multiple="multiple"
      accept="image/*"
      @change="onFileChange"
    />
    <button
      class="btn btn-sm btn-outline-primary mt-3"
      @click="fileInput.click()"
      :disabled="atingiuLimite"
    >
      {{ atingiuLimite ? 'Limite atingido' : 'Selecionar arquivo' }}
    </button>


    <!-- Pré-visualização -->
      <div v-if="previews.length" class="preview-grid mt-3">
      <div
          v-for="(src, index) in previews"
          :key="index"
          class="preview-wrapper position-relative"
      >
          <img :src="src" class="img-thumbnail" />
          <button
          class="btn btn-sm btn-close position-absolute top-0 end-0 m-1"
          @click="removerImagem(index)"
          aria-label="Remover imagem"
          ></button>
      </div>
      </div>

  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  label: String,
  multiple: Boolean,
  max: Number
});
const emit = defineEmits(['upload']);
const atingiuLimite = computed(() => arquivosSelecionados.value.length >= props.max);
const isDragging = ref(false);
const fileInput = ref(null);
const previews = ref([]);
const arquivosSelecionados = ref([]);

function updatePreview(novosArquivos) {
  const arquivosAtuais = arquivosSelecionados.value;
  const restantes = props.max - arquivosAtuais.length;

  const arquivosParaAdicionar = Array.from(novosArquivos).slice(0, restantes);
  arquivosSelecionados.value = arquivosAtuais.concat(arquivosParaAdicionar);

  arquivosParaAdicionar.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => previews.value.push(e.target.result);
    reader.readAsDataURL(file);
  });

  emit('upload', arquivosSelecionados.value);
}


function onDrop(e) {
  isDragging.value = false;
  updatePreview(e.dataTransfer.files);
}

  function onFileChange(e) {
  updatePreview(e.target.files);
  e.target.value = ''; // reseta o input para permitir o mesmo arquivo novamente
}

  function removerImagem(index) {
      previews.value.splice(index, 1);
      arquivosSelecionados.value.splice(index, 1);
      emit('upload', arquivosSelecionados.value);
  }
</script>

<style scoped>
.dropzone {
  cursor: pointer;
  transition: 0.2s;
  min-height: 250px;
}
.dropzone:hover {
  background-color: #eef2f7;
}
.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}
.preview-grid img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid #dee2e6;
}

.preview-wrapper {
  position: relative;
  display: inline-block;
}
.preview-wrapper img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid #dee2e6;
}

</style>
