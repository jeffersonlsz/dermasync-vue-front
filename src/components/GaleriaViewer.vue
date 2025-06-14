<template>

  <div class="container py-4">
  <div class="text-center">
    <!-- Título -->
    <h1 class="display-5">Relatos reais</h1>
    <p class="lead text-muted">
      Histórias reais. Inspire-se. Compartilhe sua experiência e ajude outras pessoas.
    </p>

    <!-- Botão CTA -->
    <button class="btn btn-primary btn-lg px-4 py-4 shadow " @click.stop.prevent="mostrandoFormulario = true">
       Compartilhe sua jornada e ajude alguém hoje!
    </button>

    <!-- Alerta de responsabilidade -->
    <div class="alert mt-4 mx-auto px-4 py-2 small text-muted border rounded-3 shadow-sm" style="max-width: 650px; background-color: #f9f9f9;">
      <i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>
      Este conteúdo é colaborativo e não substitui uma consulta com dermatologista ou profissional especializado.
    </div>
  </div>



    <FiltroGaleria :contadores="contadores" @filtrosAlterados="filtrosAtuais = $event" />
 



    <div>
      <div v-if="estado === 'LOADING'" class="text-center py-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>

      <div v-else-if="estado === 'ERROR'" class="text-center py-5">
        <p class="text-danger">Erro ao carregar a galeria. Tente novamente mais tarde.</p>
        <button class="btn btn-primary mt-3" @click="carregarGaleria">Tentar novamente</button>
      </div>

      <div v-else-if="estado === 'EMPTY'" class="text-center py-5">
        <p class="text-muted">Nenhuma jornada encontrada ainda.</p>
      </div>

      <TransitionGroup v-else-if="estado === 'SUCCESS'" name="fade-slide" tag="div" class="row g-4">
        <div v-for="card in galeriaVisivel" :key="card.id" class="col-md-4">
          <CardJornada :card="card" />
        </div>
      </TransitionGroup>
      <!-- DEBUG -->
      <!--div v-if="estado === 'SUCCESS'" class="text-center text-muted my-4">
          <div style="font-size: 12px; color: #888;">
            <p><strong>[DEBUG]</strong></p>
            <p>galeriaFiltrada.length: {{ galeriaFiltrada.length }}</p>
            <p>galeriaVisivel.length: {{ galeriaVisivel.length }}</p>
            <p>Condição final: {{ galeriaVisivel.length >= galeriaFiltrada.length }}</p>
            <p>Estado: {{ estado }}</p>
          </div>
        </div-->
      <!-- Sentinel para scroll infinito -->
      <div v-if="sucesso" ref="sentinela" style="height: 1px;"></div>

      <!-- Mensagem final quando todos os cards filtrados foram exibidos -->
      <div v-if="estado === 'SUCCESS' && galeriaFiltrada.length > 0 && galeriaVisivel.length >= galeriaFiltrada.length"
        class="text-center text-muted my-4">
        <small>Todos os cards foram exibidos.</small>
      </div>

    </div>
    <transition name="fade-slide">
      <div v-if="mostrandoFormulario" class="overlay" @click.self="mostrandoFormulario = false">
        <div class="overlay-content">
          <FormularioJornada @uploadFinalizado="carregarNovoCard" @uploadFalhou="lidarComFalha"
            @uploadCancelado="limparFormulario" @fechar="mostrandoFormulario = false" />
        </div>
      </div>
    </transition>


  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { db, storage } from '../firebase/config'; // ajuste o caminho conforme seu projeto
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { computed } from 'vue';
import { watchEffect, watch } from 'vue';
import FormularioJornada from '../components/FormularioJornada.vue';
import CardJornada from '../components/CardJornada.vue';
import FiltroGaleria from '../components/FiltrosGaleria.vue';


const limite = ref(9);
const limiteVisual = ref(14);
const incremento = 6;
const galeria = ref([]);
const carregando = ref(true);

const mostrandoFormulario = ref(false);
const estado = ref('LOADING'); 
const sentinela = ref(null);

const contadores = computed(() => {
  const counts = {
    faixaEtaria: {},
    genero: {},
    regiao: {},
    tags: {}
  };

  for (const card of galeriaFiltrada.value) {
    // Faixa Etária
    const fa = card.classificacao?.toLowerCase();
    if (fa) counts.faixaEtaria[fa] = (counts.faixaEtaria[fa] || 0) + 1;

    // Gênero
    const gen = card.genero?.toLowerCase();
    if (gen) counts.genero[gen] = (counts.genero[gen] || 0) + 1;

    // Região
    for (const reg of card.regioesAfetadas || []) {
      const r = reg.toLowerCase();
      counts.regiao[r] = (counts.regiao[r] || 0) + 1;
    }

    // Tags
    for (const tag of card.tags || []) {
      const t = tag.toLowerCase();
      counts.tags[t] = (counts.tags[t] || 0) + 1;
    }
  }

  return counts;
});

const sucesso = computed(() => estado.value === 'SUCCESS');
// Filtros emitidos pelo FiltroGaleria
const filtrosAtuais = ref({
  faixaEtaria: [],
  genero: [],
  regiao: [],
  tagsSelecionadas: []
});

function carregarMaisVisiveis() {
  limiteVisual.value += incremento;
}



// Função para carregar os dados
async function carregarGaleria() {
  estado.value = 'LOADING'; 
  galeria.value = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'jornadas'));
    
    if (querySnapshot.empty) {
      estado.value = 'EMPTY';
      return;
    }
    // Se houver dados, continue
      const dados = await Promise.all(querySnapshot.docs.map(async doc => {
        const data = doc.data();
        // Pega os caminhos das imagens
        const caminhoAntes = data.imagens.antes; 
        const caminhoDepois = data.imagens.depois; 
        const caminhosDurante = data.imagens.durante; // Se houver 
        let urlAntes = '';
        let urlDepois = '';
        let urlsDurante = [];
        try {
          if (caminhoAntes) {
            urlAntes = await getDownloadURL(storageRef(storage, caminhoAntes));
          }
        } catch (e) {
          console.warn(`Erro ao carregar imagem Antes do documento ${doc.id}: usando fallback.`);
        }

        try {
          if (caminhoDepois) {
            urlDepois = await getDownloadURL(storageRef(storage, caminhoDepois));
          }
        } catch (e) {
          console.warn(`Erro ao carregar imagem Depois do documento ${doc.id}: usando fallback.`);
        }
       
        if(caminhosDurante) {
          urlsDurante = await Promise.all(caminhosDurante.map(async caminho => {
            try {
              return await getDownloadURL(storageRef(storage, caminho));
            } catch (e) {
              console.warn(`Erro ao carregar imagem Durante do documento ${doc.id}: usando fallback.`);
              return '/img/fallback-error.png'; // ou outro fallback
            }
          }));
        }

        return {
          id: doc.id,
          imgAntes: urlAntes,
          imgDepois: urlDepois,
          imgDurante: urlsDurante || [],
          descricao: data.relatoProcessado || data.descricao || 'Não informado',
          microdepoimento: data.microdepoimento || ' -- ',
          classificacao: data.classificacao || 'Não informado',
          tags: data.tags_extraidas || [],
          regioesAfetadas: data.regioesAfetadas || [],
          genero: data.genero || 'Não informado',
          solucao: data.solucao || '',
          tituloRelato: data.tituloRelato || data.classificacao + ' com dermatite em ' + data.regioesAfetadas[0] // Adiciona o título da jornada
          // outros campos se precisar
        };
    }));

    galeria.value = dados;
    estado.value = 'SUCCESS'; // Atualiza o estado para indicar que os dados foram carregados com sucesso

  } catch (error) {
    console.error('Erro ao carregar galeria:', error);
  } finally {
    carregando.value = false;
  }
}

async function esperarDownloadURL(path, tentativas = 5, intervalo = 500) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await getDownloadURL(storageRef(storage, path));
    } catch (e) {
      await new Promise(resolve => setTimeout(resolve, intervalo));
    }
  }
  throw new Error(`Arquivo ${path} não disponível após ${tentativas} tentativas`);
}
function lidarComFalha(error) {
  console.error('Erro no upload:', error);
}

async function carregarNovoCard(idNovoDoc) {
  try {
    const docRef = doc(db, 'jornadas', idNovoDoc); // cria referência ao documento
    const docSnap = await getDoc(docRef);          // busca o documento

    if (!docSnap.exists()) {
      console.warn(`Documento ${idNovoDoc} não encontrado`);
      return;
    }

    const data = docSnap.data();

    const caminhoAntes = data.imagens.antes;
    const caminhosDurante = data.imagens.durante;
    const caminhoDepois = data.imagens.depois;

    let urlAntes = '/img/fallback-error.png';
    let urlDepois = '/img/fallback-error.png';
    let urlsDurante = [];

    try {
      if (caminhoAntes) {
        urlAntes = await esperarDownloadURL(caminhoAntes);
      }
    } catch (e) {
      console.warn(`Erro ao carregar imagem Antes para novo card ${idNovoDoc}`);
    }

    try {
      if (caminhoDepois) {
        urlDepois = await esperarDownloadURL(caminhoDepois);
      }
    } catch (e) {
      console.warn(`Erro ao carregar imagem Durante para novo card ${idNovoDoc}`);
    }

    if (caminhosDurante.length > 0) {
      urlsDurante = await Promise.all(caminhosDurante.map(async caminho => {
        try {
          return await esperarDownloadURL(caminho);
        } catch (e) {
          console.warn(`Erro ao carregar imagem Durante para novo card ${idNovoDoc}`);
          return '/img/fallback-error.png'; // ou outro fallback
        }
      }));
    }

    const novoCard = {
      id: docSnap.id,
      imgAntes: urlAntes,
      imgDepois: urlDepois,
      imgDurante: urlsDurante || [],
      microdepoimento: data.microdepoimento || ' -- ',
      classificacao: data.classificacao || 'Não informado',
      descricao: data.relatoProcessado || data.descricao || 'Não informado',
      regioesAfetadas: data.regioesAfetadas || [],
      genero: data.genero || 'Não informado',
      tags: data.tags_extraidas || [],
      solucao: data.solucao || '',
      tituloRelato: data.tituloRelato || data.classificacao +' com dermatite em ' + data.regioesAfetadas[0], // Adiciona o título da jornada
    };
    if (galeria.value.some(card => card.id === docSnap.id)) {
      console.warn(`Card duplicado detectado (${docSnap.id}). Ignorando.`);
      return;
    }
    galeria.value.unshift(novoCard);
   
    watchLLM(docSnap.id); // Inicia o watcher para o novo card
    console.log('Watcher iniciado para o novo card:', docSnap.id);

  } catch (error) {
    console.error('Erro ao carregar novo card:', error);
  }
}


function watchLLM(id) {
  const refDoc = doc(db, "jornadas", id);

  const interval = setInterval(async () => {
    const snap = await getDoc(refDoc);
    const dados = snap.data();
    if (!dados) return;

    const index = galeria.value.findIndex(j => j.id === id);
    if (index === -1) return;

    galeria.value[index].tags = dados.tags_extraidas || [];
    galeria.value[index].microdepoimento = dados.microdepoimento || "";
    galeria.value[index].statusLLM = dados.statusLLM;

    if (["concluido", "erro"].includes(dados.statusLLM)) {
      clearInterval(interval);
    }

    console.log("🔄 Card atualizado via LLM:", dados.statusLLM);
  }, 2000);
}




const galeriaFiltrada = computed(() => {
  return galeria.value.filter(card => {
    console.log('Filtrando card:', card);
    console.log('Filtros atuais:', filtrosAtuais.value.faixaEtaria, filtrosAtuais.value.genero, filtrosAtuais.value.regiao, filtrosAtuais.value.tagsSelecionadas);
    // Faixa etária (agora múltiplos)
    if (filtrosAtuais.value.faixaEtaria.length > 0 &&
        !filtrosAtuais.value.faixaEtaria.includes(card.classificacao?.toLowerCase())) {
      return false;
    }

    // Gênero
    if (filtrosAtuais.value.genero.length > 0 &&
        !filtrosAtuais.value.genero.includes(card.genero?.toLowerCase())) {
      return false;
    }

    // Região — OR entre arrays
    if (filtrosAtuais.value.regiao.length > 0) {
      const regioesDoCard = (card.regioesAfetadas || []).map(r => r.toLowerCase());
      const algumaCoincide = filtrosAtuais.value.regiao.some(reg =>
        regioesDoCard.includes(reg.toLowerCase())
      );
      if (!algumaCoincide) return false;
    }

    // Tags OR — se ao menos 1 tag estiver presente
    if (filtrosAtuais.value.tagsSelecionadas.length > 0) {
      const cardTags = (card.tags || []).map(tag => tag.toLowerCase());
      const algumaCoincide = filtrosAtuais.value.tagsSelecionadas.some(tag =>
        cardTags.includes(tag.toLowerCase())
      );
      if (!algumaCoincide) return false;
    }

    return true;
  });
});
// Lista de exibição limitada ao que está visível
const galeriaVisivel = computed(() => {
  return galeriaFiltrada.value.slice(0, limiteVisual.value);
});

// Aumentar o limite quando o sentinel entrar na viewport
function configurarObserver() {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      limiteVisual.value += incremento;
    }
  }, { threshold: 1.0 });

  if (sentinela.value) observer.observe(sentinela.value);
}


function limparFormulario() {
  console.log('Usuário cancelou envio');
}


function ajustarLimiteSeCurto() {
  // Só age se os dados já foram carregados com sucesso
  if (estado.value !== 'SUCCESS') return;

  const total = galeriaFiltrada.value.length;
  const visiveis = galeriaVisivel.value.length;
  const alturaTotal = document.documentElement.scrollHeight;
  const alturaViewport = window.innerHeight;

  // Se tudo já está visível, e não há barra de rolagem
  if (total > 0 && visiveis < total && alturaTotal <= alturaViewport) {
    limiteVisual.value = total;
  }
}
function aplicarFiltros(filtros) {
  console.log('[DEBUG] Filtros recebidos:', filtros);
  // Aqui você pode atualizar a lista de cards filtrados com base nesses filtros
  // Exemplo: galeria.value = filtrarGaleria(filtros);
  // Para fins de exemplo, vamos apenas logar os filtros
  console.log('Filtros aplicados:', filtros);
}

onMounted(() => {
  carregarGaleria();
  // galeria.value = await carregarDoFirestore();
  configurarObserver();
  ajustarLimiteSeCurto();
  watchEffect(() => {
  if (
    estado.value === 'SUCCESS' &&
    galeriaFiltrada.value.length <= limiteVisual.value &&
    document.documentElement.scrollHeight <= window.innerHeight
  ) {
    limiteVisual.value = galeriaFiltrada.value.length;
  }
}
  
);

watch(filtrosAtuais, () => {
  ajustarLimiteSeCurto();
});

});
</script>

<style scoped>

.container{
  background-color: #FFFFFF;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23FFFFFF' stroke-width='0.4' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cuse fill='%23fcfcfc' href='%23s' y='2'/%3E%3Cuse fill='%23fcfcfc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='2'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cg fill='%23f2f2f2'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23efefef'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(5) translate(-800 -600)'%3E%3Cg fill='%23FFFFFF'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}

.btn{
  letter-spacing: 0rem !important;
}
.btn-primary {
  background: #927257;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
  font-size: 17px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(76, 126, 243, 0.25);
}
.card-filtros{
 align-items: center;
 justify-content: center;
}

img {
  object-fit: cover;
}
.linha-filtro {
  display: block;
  margin-bottom: 0.5rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.overlay-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}



.fade-slide-enter-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}




</style>
