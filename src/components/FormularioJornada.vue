<template>
    <div>
      <!-- Cabeçalho com título e progresso -->
      <div class="mb-4">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-upload text-primary fs-4"></i>
          <h5 class="fw-bold text-primary mb-0">Envie sua jornada em etapas</h5>
        </div>
        <button class="btn-close" @click="$emit('fechar')" aria-label="Fechar"></button>
      </div>
      <div class="progress" style="height: 24px; background-color: #e9ecef;">
        <div
          class="progress-bar"
          :class="carregando ? 'bg-success progress-bar-striped progress-bar-animated' : 'bg-gradient'"
          role="progressbar"
          :style="{ width: carregando ? progresso + '%' : percentual + '%' }"
        >
          {{ carregando ? progresso + '%' : 'Etapa ' + etapa + ' de 4' }}
        </div>
      </div>
    </div>
  
      <!-- Etapas -->
      <div v-if="etapa === 1" class="card shadow-sm border-0 mb-4 p-4">
            <h6 class="fw-bold mb-3 text-primary">1 de 4 — Envio das Imagens</h6>
            <p class="text-muted">Envie três fotos mostrando seu progresso: antes, durante e depois.</p>

            <div class="row g-3">
                <div class="col-md-4">
                  <Dropzone
                    label="Antes"
                    :max="1"
                    :multiple="false"
                    @upload="files => jornadaFinal.imagens.antes = files[0]"
                  />
                </div>
                <div class="col-md-4">
                  <Dropzone
                    label="Durante"
                    :max="3"
                    :multiple="true"
                    @upload="files => jornadaFinal.imagens.durante = files"
                  />
                </div>
                <div class="col-md-4">
                  <Dropzone
                    label="Depois"
                    :max="1"
                    :multiple="false"
                    @upload="files => jornadaFinal.imagens.depois = files[0]"
                  />
                </div>
            </div>
            </div>

  
      <div v-else-if="etapa === 2" class="card shadow-sm border-0 mb-4 p-4">
        <h6 class="fw-bold mb-3 text-primary">2 de 4 — Informações sobre você</h6>
        <div class="mb-3">
          <label class="form-label">Classificação</label>
          <div class="btn-group w-100" role="group">
            <div class="btn-group w-100" role="group">
              <input
                type="radio"
                class="btn-check"
                name="classificacao"
                id="crianca"
                value="Criança"
                v-model="jornadaFinal.classificacao"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="crianca">Criança</label>

              <input
                type="radio"
                class="btn-check"
                name="classificacao"
                id="adolescente"
                value="Adolescente"
                v-model="jornadaFinal.classificacao"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="adolescente">Adolescente</label>

              <input
                type="radio"
                class="btn-check"
                name="classificacao"
                id="adulto"
                value="Adulto"
                v-model="jornadaFinal.classificacao"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="adulto">Adulto</label>
            </div>
          </div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Gênero</label>
          <select class="form-select" v-model="jornadaFinal.genero">
            <option disabled value="">Selecione</option>
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
        <textarea
          class="form-control"
          v-model="jornadaFinal.descricao"
          placeholder="Descreva com mais detalhes. Ex.: pomada advantan, comprimido metrexato, óleo de coco"
          rows="4"
        ></textarea>

      </div>
  
      <div v-else-if="etapa === 4" class="card shadow-sm border-0 mb-4 p-4">
      <template v-if="!sucesso">
        <h6 class="fw-bold mb-3 text-primary">4 de 4 — Consentimento</h6>
        <div class="form-check mb-2">
          <input class="form-check-input" type="checkbox" id="c1" v-model="jornadaFinal.consentimentos.imagemSegura" />
          <label class="form-check-label" for="c1">
            Declaro que as imagens não expõem meu rosto ou dados sensíveis.
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="c2" v-model="jornadaFinal.consentimentos.exibirGaleria" />
          <label class="form-check-label" for="c2">
            Aceito que minha jornada seja exibida na galeria colaborativa.
          </label>
        </div>
      </template>
      <template v-else>
        <div class="text-center p-5">
          <i class="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
          <h5 class="fw-bold text-success">Sua jornada foi enviada com sucesso!</h5>
        </div>
      </template>
    </div>
  
    <!-- Navegação -->
    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-outline-secondary" @click="voltarEtapa" :disabled="etapa === 1 || carregando">Voltar</button>
      <button class="btn btn-primary" @click="etapa < 4 ? avancarEtapa() : enviarJornada()" :disabled="carregando">
        {{ etapa < 4 ? 'Próximo' : 'Enviar Jornada' }}
      </button>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { reactive } from 'vue';
  import { db, storage } from '../firebase/config';
  import { collection, addDoc, Timestamp } from 'firebase/firestore';
  import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { autenticarAnonimamente } from '../firebase/authService';
  import Dropzone from '../components/Dropzone.vue';

  
  const jornadaFinal = reactive({
    classificacao: '',
    genero: '',
    regioesAfetadas: [],
    tags: [],
    descricao: '',
    consentimentos: {
      imagemSegura: false,
      exibirGaleria: false
    },
    imagens: {
      antes: null,
      durante: [],
      depois: null
    }
  });
  const emit = defineEmits(['fechar']);
  
  const etapa = ref(1);
  const percentual = computed(() => (etapa.value - 1) * 33.33 + 25);
  const opcoesRegioes = ['Rosto', 'Couro cabeludo', 'Pescoço', 'Axilas',
                          'Tronco', 'Barriga', 'Costas', 'Braços',
                          'Mãos', 'Pernas', 'Pés', 'Corpo inteiro'];
  const regiaoAtual = ref('');
  const regioesSelecionadas = ref([]);

  function avancarEtapa() {
      if (etapa.value < 4) 
        etapa.value++;
      else 
        alert('📤 Jornada enviada com sucesso!'); // aqui futuramente conectamos ao Firebase
  }
  
  function handleUpload(tipo, arquivos) {
      console.log(`📁 Upload (${tipo}):`, arquivos);
  }

  function voltarEtapa() {
      if (etapa.value > 1) 
          etapa.value--;
  }

  function adicionarRegiao() {
    if (regiaoAtual.value && !regioesSelecionadas.value.includes(regiaoAtual.value)) {
      regioesSelecionadas.value.push(regiaoAtual.value);
      jornadaFinal.regioesAfetadas = [...regioesSelecionadas.value]; // sincroniza
      regiaoAtual.value = '';
    }
  }

  function removerRegiao(index) {
      regioesSelecionadas.value.splice(index, 1);
      jornadaFinal.regioesAfetadas = [...regioesSelecionadas.value]; // sincroniza
  }

    function validarJornada() {
      const camposObrigatorios = [jornadaFinal.classificacao, 
                                  jornadaFinal.genero,
                                  jornadaFinal.descricao];

      const consentimentoOk = jornadaFinal.consentimentos.imagemSegura && jornadaFinal.consentimentos.exibirGaleria;
      const temImagemAntes = jornadaFinal.imagens.antes !== null;
      const temImagemDepois = jornadaFinal.imagens.depois !== null;

      return camposObrigatorios.every(c => c && c.trim() !== '') &&
            consentimentoOk &&
            temImagemAntes &&
            temImagemDepois;
  }

  const carregando = ref(false);
  const sucesso = ref(false);
  const progresso = ref(0);

  const enviarJornada = async () => {
    await autenticarAnonimamente(); // <- autenticação antes de tudo
    //if (!jornadaFinal.consentimentos.imagemSegura || !jornadaFinal.consentimentos.exibirGaleria) {
    //  alert("É necessário aceitar as duas condições.");
    //  return;
    //} //TODO trocar por validar jornada() acima
    if (!validarJornada()) {
      alert("Preencha todos os campos obrigatórios e aceite os termos.");
      return;
    }
    // Garante que ao menos 1 região seja registrada
    if (regioesSelecionadas.value.length === 0 && regiaoAtual.value) {
      jornadaFinal.regioesAfetadas = [regiaoAtual.value];
    } else {
      jornadaFinal.regioesAfetadas = [...regioesSelecionadas.value];
    }
    console.log("📦 Objeto final para Firebase:", jornadaFinal);
    
    // aqui futuramente subimos para o Firebase
    carregando.value = true;
    progresso.value = 0;

    const interval = setInterval(() => {
        if (progresso.value < 95) progresso.value += 2;
      }, 100);

      try {
          const idUnico = Date.now().toString(); // ID temporal
          const urls = {
            antes: '',
            durante: [],
            depois: ''
          };

        // Upload imagem ANTES
        const beforeRef = storageRef(storage, `jornadas/${idUnico}/antes.jpg`);
        await uploadBytes(beforeRef, jornadaFinal.imagens.antes);
        urls.antes = await getDownloadURL(beforeRef);

        // Upload DURANTE (até 3 imagens)
        for (let i = 0; i < jornadaFinal.imagens.durante.length; i++) {
          const img = jornadaFinal.imagens.durante[i];
          const refDurante = storageRef(storage, `jornadas/${idUnico}/durante_${i}.jpg`);
          await uploadBytes(refDurante, img);
          const url = await getDownloadURL(refDurante);
          urls.durante.push(url);
        }

        // Upload imagem DEPOIS
        const afterRef = storageRef(storage, `jornadas/${idUnico}/depois.jpg`);
        await uploadBytes(afterRef, jornadaFinal.imagens.depois);
        urls.depois = await getDownloadURL(afterRef);

        // Monta objeto final para o Firestore
        const dadosFinal = {
          classificacao: jornadaFinal.classificacao,
          genero: jornadaFinal.genero,
          regioesAfetadas: jornadaFinal.regioesAfetadas,
          tags: jornadaFinal.tags,
          descricao: jornadaFinal.descricao,
          consentimentos: jornadaFinal.consentimentos,
          imagens: urls,
          criadoEm: Timestamp.now()
        };

        // Salva no Firestore
        await addDoc(collection(db, 'jornadas'), dadosFinal);

        alert("🎉 Jornada enviada com sucesso!");
        // resetar se quiser aqui

        progresso.value = 100;
        sucesso.value = true;

        setTimeout(() => {
          carregando.value = false;
          sucesso.value = false;
          etapa.value = 1;
          resetarFormulario();
          emit("fechar");
        }, 2500);

      } catch (err) {
        console.error("Erro ao enviar:", err);
        alert("Erro ao enviar. Tente novamente.");
        carregando.value = false;
        clearInterval(interval);
      }
    };


    

  function resetarFormulario() {
      jornadaFinal.classificacao = '';
      jornadaFinal.genero = '';
      jornadaFinal.regioesAfetadas = [];
      jornadaFinal.tags = [];
      jornadaFinal.descricao = '';
      jornadaFinal.consentimentos = { imagemSegura: false, exibirGaleria: false };
      jornadaFinal.imagens = { antes: null, durante: [], depois: null };
      regiaoAtual.value = '';
      regioesSelecionadas.value = [];
      progresso.value = 0;
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
  