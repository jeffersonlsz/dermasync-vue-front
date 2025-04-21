<template>
    <div>
      <!-- Cabeçalho com título e progresso -->
        <div class="mb-4">
        <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-upload text-primary fs-4"></i>
            <h5 class="fw-bold text-primary mb-0">Envie sua jornada em etapas</h5>
        </div>
        <div class="progress" style="height: 24px; background-color: #e9ecef;">
            <div
            class="progress-bar bg-gradient"
            role="progressbar"
            :style="{ width: percentual + '%'}"
            >
            Etapa {{ etapa }} de 4
            </div>
        </div>
        </div>
  
      <!-- Etapas -->
      <div v-if="etapa === 1" class="card shadow-sm border-0 mb-4 p-4">
            <h6 class="fw-bold mb-3 text-primary">1 de 4 — Envio das Imagens</h6>
            <p class="text-muted">Envie três fotos mostrando seu progresso: antes, durante e depois.</p>

            <div class="row g-3">
                <div class="col-md-4">
                <Dropzone label="Antes" @upload="handleUpload('antes', $event)" />
                </div>
                <div class="col-md-4">
                <Dropzone label="Durante" :multiple="true" max="3" @upload="handleUpload('durante', $event)" />
                </div>
                <div class="col-md-4">
                <Dropzone label="Depois" @upload="handleUpload('depois', $event)" />
                </div>
            </div>
            </div>

  
      <div v-else-if="etapa === 2" class="card shadow-sm border-0 mb-4 p-4">
        <h6 class="fw-bold mb-3 text-primary">2 de 4 — Informações sobre você</h6>
        <div class="mb-3">
          <label class="form-label">Classificação</label>
          <div class="btn-group w-100" role="group">
            <input type="radio" class="btn-check" name="classificacao" id="crianca" autocomplete="off" />
            <label class="btn btn-outline-primary" for="crianca">Criança</label>
  
            <input type="radio" class="btn-check" name="classificacao" id="adolescente" autocomplete="off" />
            <label class="btn btn-outline-primary" for="adolescente">Adolescente</label>
  
            <input type="radio" class="btn-check" name="classificacao" id="adulto" autocomplete="off" />
            <label class="btn btn-outline-primary" for="adulto">Adulto</label>
          </div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Gênero</label>
          <select class="form-select">
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Outro</option>
            <option>Prefiro não dizer</option>
          </select>
        </div>
  
        <div class="mb-3">
  <label class="form-label">Regiões afetadas</label>

  <div class="d-flex gap-2 mb-2">
    <select v-model="regiaoAtual" class="form-select">
      <option disabled value="">Selecionar região...</option>
      <option v-for="op in opcoesRegioes" :key="op" :value="op">{{ op }}</option>
    </select>
    <button class="btn btn-outline-primary" type="button" @click="adicionarRegiao">
      <i class="bi bi-plus-lg"></i>
    </button>
  </div>

    <div class="d-flex flex-wrap gap-2">
        <span
        class="badge bg-primary d-flex align-items-center"
        v-for="(regiao, index) in regioesSelecionadas"
        :key="regiao"
        >
        {{ regiao }}
        <button class="btn btn-sm btn-close ms-2" @click="removerRegiao(index)"></button>
        </span>
    </div>
    </div>
      </div>
  
      <div v-else-if="etapa === 3" class="card shadow-sm border-0 mb-4 p-4">
        <h6 class="fw-bold mb-3 text-primary">3 de 4 — Compartilhe sua dica ou tratamento</h6>
        <input type="text" class="form-control mb-2" placeholder="Ex: hidratante, aveia, banho morno..." />
        <textarea class="form-control" placeholder="Descreva com mais detalhes (opcional)" rows="4"></textarea>
      </div>
  
      <div v-else-if="etapa === 4" class="card shadow-sm border-0 mb-4 p-4">
        <h6 class="fw-bold mb-3 text-primary">4 de 4 — Consentimento</h6>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="c1" />
          <label class="form-check-label" for="c1">
            Declaro que as imagens não expõem meu rosto ou dados sensíveis.
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="c2" />
          <label class="form-check-label" for="c2">
            Aceito que minha jornada seja exibida na galeria colaborativa.
          </label>
        </div>
      </div>
  
      <!-- Navegação -->
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-outline-secondary" @click="voltarEtapa" :disabled="etapa === 1">Voltar</button>
        <button class="btn btn-primary" @click="avancarEtapa">
          {{ etapa < 4 ? 'Próximo' : 'Enviar Jornada' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Dropzone from '../components/Dropzone.vue';
  
  const etapa = ref(1);
  const percentual = computed(() => (etapa.value - 1) * 33.33 + 25);
  const opcoesRegioes = [
  'Rosto', 'Couro cabeludo', 'Pescoço', 'Axilas',
  'Tronco', 'Barriga', 'Costas', 'Braços',
  'Mãos', 'Pernas', 'Pés', 'Corpo inteiro'
    ];
const regiaoAtual = ref('');
const regioesSelecionadas = ref([]);

  function avancarEtapa() {
    if (etapa.value < 4) etapa.value++;
    else alert('📤 Jornada enviada com sucesso!'); // aqui futuramente conectamos ao Firebase
  }
  
  function handleUpload(tipo, arquivos) {
    console.log(`📁 Upload (${tipo}):`, arquivos);
  }

  function voltarEtapa() {
    if (etapa.value > 1) etapa.value--;
  }

  function adicionarRegiao() {
    if (
        regiaoAtual.value &&
        !regioesSelecionadas.value.includes(regiaoAtual.value)
    ) {
        regioesSelecionadas.value.push(regiaoAtual.value);
        regiaoAtual.value = '';
    }
  }

    function removerRegiao(index) {
    regioesSelecionadas.value.splice(index, 1);
    }

  </script>
  
  <style scoped>
  input[type='file'] {
    flex: 1;
  }
  .badge button {
  margin-left: 0.25rem;
  background: transparent;
  border: none;
  padding: 0;
}

  .bg-gradient {
  background-image: linear-gradient(to right, #7b2ff7, #f107a3);
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 24px;
}
  </style>
  