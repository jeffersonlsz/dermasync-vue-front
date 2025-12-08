<template>
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-auto overflow-hidden flex flex-col max-h-[90vh]">
    
    <!-- Cabeçalho com título e progresso -->
    <div class="px-6 py-5 border-b border-gray-100 bg-white z-10">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-primary/10 rounded-lg text-primary">
            <i class="bi bi-journal-plus text-xl"></i>
          </div>
          <h5 class="text-lg font-bold text-gray-800">Envie sua jornada</h5>
        </div>
        <button 
          @click="$emit('fechar')" 
          class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <!-- Progress Bar -->
      <div class="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          class="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out rounded-full"
          :class="{ 'animate-pulse': carregando }"
          :style="{ width: carregando ? progresso + '%' : percentual + '%' }"
        ></div>
      </div>
      <div class="flex justify-between mt-2 text-xs font-medium text-gray-400">
        <span>Etapa {{ etapa }} de 4</span>
        <span v-if="carregando">Enviando... {{ progresso }}%</span>
      </div>
    </div>

    <!-- Conteúdo Scrollável -->
    <div class="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
      
      <!-- Etapa 1: Imagens -->
      <transition name="fade" mode="out-in">
        <div v-if="etapa === 1" key="etapa1">
          <div class="text-center mb-8">
             <h6 class="text-xl font-bold text-gray-800 mb-2">Envio das Imagens</h6>
             <p class="text-gray-500 max-w-lg mx-auto">Compartilhe fotos que mostrem a evolução do seu tratamento. É fundamental enviar o "Antes" e o "Depois".</p>
          </div>

          <div v-if="erroFormulario" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
            <i class="bi bi-exclamation-circle-fill"></i> {{ erroFormulario }}
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Dropzone label="Antes (Obrigatório)" :max="1" :multiple="false" @upload="files => jornadaFinal.imagens.antes = files[0]" />
            <Dropzone label="Durante (Opcional)" :max="3" :multiple="true" @upload="files => jornadaFinal.imagens.durante = files" />
            <Dropzone label="Depois (Obrigatório)" :max="1" :multiple="false" @upload="files => jornadaFinal.imagens.depois = files[0]" />
          </div>
        </div>
  
        <!-- Etapa 2: Informações -->
        <div v-else-if="etapa === 2" key="etapa2" class="max-w-xl mx-auto">
          <div class="text-center mb-8">
             <h6 class="text-xl font-bold text-gray-800 mb-2">Sobre você</h6>
             <p class="text-gray-500">Ajude outras pessoas a se identificarem com o seu caso.</p>
          </div>

          <div v-if="erroFormulario" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
            <i class="bi bi-exclamation-circle-fill"></i> {{ erroFormulario }}
          </div>
          
          <div class="space-y-6">
            <!-- Classificação -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Faixa Etária</label>
              <div class="flex gap-2">
                <label class="flex-1 cursor-pointer">
                  <input type="radio" class="peer sr-only" name="classificacao" value="Criança" v-model="jornadaFinal.classificacao">
                  <div class="py-2.5 px-4 text-center rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-focus:ring-2 peer-focus:ring-primary/30">Criança</div>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input type="radio" class="peer sr-only" name="classificacao" value="Adolescente" v-model="jornadaFinal.classificacao">
                  <div class="py-2.5 px-4 text-center rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-focus:ring-2 peer-focus:ring-primary/30">Adolescente</div>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input type="radio" class="peer sr-only" name="classificacao" value="Adulto" v-model="jornadaFinal.classificacao">
                  <div class="py-2.5 px-4 text-center rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-focus:ring-2 peer-focus:ring-primary/30">Adulto</div>
                </label>
              </div>
            </div>
  
            <!-- Gênero -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Gênero</label>
              <select class="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 py-2.5" v-model="jornadaFinal.genero">
                <option disabled value="">Selecione...</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
                <option>Prefiro não dizer</option>
              </select>
            </div>
  
            <!-- Regiões -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Regiões afetadas</label>
              <div class="flex gap-2 mb-3">
                <select v-model="regiaoAtual" class="flex-1 rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 py-2.5">
                  <option disabled value="">Selecionar região...</option>
                  <option v-for="op in opcoesRegioes" :key="op" :value="op">{{ op }}</option>
                </select>
                <button 
                  class="px-4 py-2 bg-gray-100 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors border border-primary/20" 
                  type="button" 
                  @click="adicionarRegiao"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
  
              <div class="flex flex-wrap gap-2 min-h-[40px] p-2 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <span v-if="regioesSelecionadas.length === 0" class="text-sm text-gray-400 p-1">Nenhuma região adicionada...</span>
                <span 
                  class="inline-flex items-center gap-1 pl-3 pr-2 py-1 bg-white border border-gray-200 shadow-sm text-gray-700 rounded-full text-sm font-medium" 
                  v-for="(regiao, index) in regioesSelecionadas"
                  :key="regiao"
                >
                  {{ regiao }}
                  <button class="p-0.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors" @click="removerRegiao(index)">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Etapa 3: Relato -->
        <div v-else-if="etapa === 3" key="etapa3" class="max-w-xl mx-auto">
          <div class="text-center mb-8">
             <h6 class="text-xl font-bold text-gray-800 mb-2">Seu Relato</h6>
             <p class="text-gray-500">Compartilhe sua dica ou tratamento. Detalhes ajudam muito!</p>
          </div>

          <div v-if="erroFormulario" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
            <i class="bi bi-exclamation-circle-fill"></i> {{ erroFormulario }}
          </div>

          <div class="relative">
            <textarea 
              class="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-4 min-h-[200px] text-gray-700 leading-relaxed resize-none" 
              v-model="jornadaFinal.descricao"
              placeholder="Conte como foi sua experiência, o que funcionou, o que não funcionou. Cite nomes de pomadas, remédios ou mudanças de hábito..."
            ></textarea>
            <div class="absolute bottom-4 right-4 text-xs text-gray-400">
              {{ jornadaFinal.descricao.length }} caracteres
            </div>
          </div>
        </div>
  
        <!-- Etapa 4: Finalização -->
        <div v-else-if="etapa === 4" key="etapa4" class="max-w-xl mx-auto">
          <template v-if="!sucesso">
            <div class="text-center mb-8">
              <h6 class="text-xl font-bold text-gray-800 mb-2">Consentimento</h6>
              <p class="text-gray-500">Último passo antes de transformar vidas.</p>
           </div>
           
            <div v-if="erroFormulario" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
              <i class="bi bi-exclamation-circle-fill"></i> {{ erroFormulario }}
            </div>

            <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
              <label class="flex items-start gap-3 cursor-pointer group">
                <input class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/50 mt-0.5 transition-colors" type="checkbox" v-model="jornadaFinal.consentimentos.imagemSegura" />
                <span class="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900">
                  Declaro que as imagens <strong class="text-gray-900">não expõem meu rosto</strong> ou dados sensíveis (documentos, endereços).
                </span>
              </label>
              
              <div class="h-px bg-blue-100"></div>

              <label class="flex items-start gap-3 cursor-pointer group">
                <input class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/50 mt-0.5 transition-colors" type="checkbox" v-model="jornadaFinal.consentimentos.exibirGaleria" />
                <span class="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900">
                  Aceito que minha jornada seja exibida na galeria colaborativa do DermaSync.
                </span>
              </label>
            </div>
          </template>
          
          <template v-else>
            <div class="text-center py-12 flex flex-col items-center justify-center animate-fadeIn">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i class="bi bi-check-lg text-4xl text-green-600"></i>
              </div>
              <h5 class="text-2xl font-bold text-gray-900 mb-2">Sucesso!</h5>
              <p class="text-gray-500">Sua jornada foi enviada e logo estará disponível.</p>
            </div>
          </template>
        </div>
      </transition>
    </div>
  
    <!-- Rodapé: Navegação -->
    <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
      <button 
        class="px-5 py-2.5 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-white border border-transparent hover:border-gray-200 transition-all font-medium text-sm" 
        @click="voltarEtapa"
        :disabled="etapa === 1 || carregando || sucesso"
        :class="{ 'opacity-0 pointer-events-none': etapa === 1 || sucesso }"
      >
        Voltar
      </button>

      <div class="flex gap-3">
        <button 
          v-if="!sucesso"
          class="px-6 py-2.5 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary-600 active:scale-95 transition-all font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed" 
          @click="etapa < 4 ? avancarEtapa() : enviarJornada()" 
          :disabled="carregando"
        >
          <span v-if="carregando" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Enviando...
          </span>
          <span v-else>
            {{ etapa < 4 ? 'Próximo Passo' : 'Enviar Jornada' }}
          </span>
        </button>
      </div>
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
import { criarJornada } from '../helpers/jornada';

const erroFormulario = ref("");
const jornadaFinal = reactive(criarJornada());

function validarEtapa1() {
  const { antes, durante, depois } = jornadaFinal.imagens;

  if (!antes || !depois) {
    erroFormulario.value = "Você precisa enviar pelo menos as imagens: antes e depois.";
    return false;
  }

  erroFormulario.value = ""; // limpa erro anterior se tudo ok
  return true;
}

const emit = defineEmits([
  'uploadFinalizado',
  'uploadFalhou',
  'uploadCancelado',
  'fechar'
]);

const etapa = ref(1);
const percentual = computed(() => (etapa.value - 1) * 33.33 + 25);
const opcoesRegioes = ['Rosto', 'Couro cabeludo', 'Pescoço', 'Axilas',
  'Tronco', 'Barriga', 'Costas', 'Braços',
  'Mãos', 'Pernas', 'Pés', 'Corpo inteiro'];
const regiaoAtual = ref('');
const regioesSelecionadas = ref([]);

function avancarEtapa() {
  if (etapa.value === 1 && !validarEtapa1()) return; // valida etapa 1
  if (etapa.value < 4)
    etapa.value++;
  else
    alert('📤 Jornada enviada com sucesso!'); // aqui futuramente conectamos ao Firebase
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

const carregando = ref(false);
const sucesso = ref(false);
const progresso = ref(0);

const enviarJornada = async () => {
  await autenticarAnonimamente(); // <- autenticação antes de tudo
  const validacao = jornadaFinal.validar();
  if (validacao !== true) {
    erroFormulario.value = "Alguns campos não foram preenchidos corretamente.";
    return;
  }

  // Garante que ao menos 1 região seja registrada
  if (regioesSelecionadas.value.length === 0 && regiaoAtual.value) {
    jornadaFinal.regioesAfetadas = [regiaoAtual.value];
  } else {
    jornadaFinal.regioesAfetadas = [...regioesSelecionadas.value];
  }

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
    if (jornadaFinal.imagens.durante && jornadaFinal.imagens.durante.length) {
       for (let i = 0; i < jornadaFinal.imagens.durante.length; i++) {
        const img = jornadaFinal.imagens.durante[i];
        const refDurante = storageRef(storage, `jornadas/${idUnico}/durante_${i}.jpg`);
        await uploadBytes(refDurante, img);
        const url = await getDownloadURL(refDurante);
        urls.durante.push(url);
      }
    }
    
    // Upload imagem DEPOIS
    const afterRef = storageRef(storage, `jornadas/${idUnico}/depois.jpg`);
    await uploadBytes(afterRef, jornadaFinal.imagens.depois);
    urls.depois = await getDownloadURL(afterRef);

    //preparacao para chamada do LLM
    jornadaFinal.marcarAtualizacao(); // Atualiza a data de modificação
    jornadaFinal.statusLLM = "pendente";

    jornadaFinal.imagens = urls; // Adiciona URLs das imagens
    jornadaFinal.criado_em = new Date().toISOString(); // Adiciona timestamp do Firestore
    // Salva no Firestore
    const newDoc = await addDoc(collection(db, 'jornadas'), jornadaFinal.toJSON());
    const docId = newDoc.id; // ID do documento criado
    if (emit) emit('uploadFinalizado', newDoc.id);

    // Chamada direta à API do LLM (MVP)
    try {
      fetch("http://localhost:8080/processar-jornada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: docId,
          descricao: jornadaFinal.descricao,
          idade: jornadaFinal.idade,
          sexo: jornadaFinal.genero,
          classificacao: jornadaFinal.classificacao
        })
      }).catch(err => console.warn("Erro silencioso LLM (dev):", err));
    } catch (erro) {
      console.warn("⚠️ Falha ao chamar LLM:", erro);
    }
   
    jornadaFinal.limpar();
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
    emit('uploadFalhou', new Error('Erro ao enviar arquivos'));
    erroFormulario.value = "Ocorreu um erro ao enviar. Tente novamente.";
    carregando.value = false;
  } finally {
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
  erroFormulario.value = "";
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
