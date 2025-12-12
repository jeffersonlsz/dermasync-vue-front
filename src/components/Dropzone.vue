<template>
  <div class="relative p-6 text-center border-2 border-dashed border-gray-300 rounded-xl transition-colors duration-200"
    :class="{ 'border-primary bg-primary/5': isDragging, 'bg-gray-50 hover:bg-gray-100': !isDragging }"
    @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="onDrop">
    <div class="flex flex-col items-center justify-center gap-2 pointer-events-none">
      <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-1">
        <i class="bi bi-cloud-arrow-up text-2xl"></i>
      </div>
      <p class="font-medium text-gray-700">{{ label }}</p>
      <p class="text-xs text-gray-400">{{ multiple ? `Até ${max} imagens` : '1 imagem' }}</p>
    </div>

    <input type="file" class="hidden" ref="fileInput" :multiple="multiple" accept="image/*" @change="onFileChange" />

    <button
      class="mt-4 px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-white transition-all cursor-pointer pointer-events-auto"
      @click="fileInput.click()" :disabled="atingiuLimite" :class="{ 'opacity-50 cursor-not-allowed': atingiuLimite }">
      {{ atingiuLimite ? 'Limite atingido' : 'Selecionar arquivo' }}
    </button>

    <!-- Pré-visualização -->
    <div v-if="previews.length" class="mt-6 grid grid-cols-3 gap-3">
      <div v-for="(src, index) in previews" :key="index" class="relative aspect-square group">
        <img :src="src" class="w-full h-full object-cover rounded-lg border border-gray-200 shadow-sm" />
        <button
          class="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 rounded-full p-1 shadow-md border border-gray-100 transition-colors opacity-0 group-hover:opacity-100"
          @click="removerImagem(index)" aria-label="Remover imagem">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  label: String,
  multiple: Boolean,
  max: Number
});
const emit = defineEmits(['files-changed']);
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

  emit('files-changed', arquivosSelecionados.value);
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
  emit('files-changed', arquivosSelecionados.value);
}
</script>

<style scoped>
/* Scoped styles removed in favor of Tailwind classes */
</style>
