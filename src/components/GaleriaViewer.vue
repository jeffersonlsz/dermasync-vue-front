<template>
  
  <div class="container py-5">
    <h2 class="fw-bold text-center mb-1">Galeria Colaborativa</h2>
    <p class="text-center text-muted mb-4">Neste espaço, você poderá ver a contribuição de outras pessoas que passaram pela mesma condição e obtiveram sucesso.</p>
    <p class="text-center text-muted mb-4">Não se preocupe, os dados são 100% anônimos</p>
    <div class="text-center mb-4">
      <button class="btn btn-primary btn-lg px-5" @click.stop.prevent="mostrandoFormulario = true">
        Compartilhe sua jornada - outros podem aprender com você !
        </button>
    </div>

    <FiltroGaleria
      :contadores="contadores"
      @filtrosAlterados="filtrosAtuais = $event"
    />

    
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

      <TransitionGroup
          v-else-if="estado === 'SUCCESS'"
          name="fade-slide"
          tag="div"
          class="row g-4"
        >
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
        <div
          v-if="estado === 'SUCCESS' && galeriaFiltrada.length > 0 && galeriaVisivel.length >= galeriaFiltrada.length"
          class="text-center text-muted my-4"
        >
          <small>Todos os cards foram exibidos.</small>
        </div>

        </div>

    <div v-if="mostrandoFormulario" class="overlay" @click.self="mostrandoFormulario = false">
      <div class="overlay-content">
        <FormularioJornada 
          @uploadFinalizado="carregarNovoCard" 
          @uploadFalhou="lidarComFalha"
          @uploadCancelado="limparFormulario"
          @fechar="mostrandoFormulario = false"
        />
      </div>
    </div>
    


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
       
        if(urlsDurante.length > 0) {
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
          classificacao: data.classificacao || 'Não informado',
          tags: data.tags || [],
          regioesAfetadas: data.regioesAfetadas || [],
          genero: data.genero || 'Não informado',
          solucao: data.solucao || '',
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
      classificacao: data.classificacao || 'Não informado',
      regioesAfetadas: data.regioesAfetadas || [],
      genero: data.genero || 'Não informado',
      tags: data.tags || [],
      solucao: data.solucao || '',
    };
    if (galeria.value.some(card => card.id === docSnap.id)) {
      console.warn(`Card duplicado detectado (${docSnap.id}). Ignorando.`);
      return;
    }
    galeria.value.unshift(novoCard);

  } catch (error) {
    console.error('Erro ao carregar novo card:', error);
  }
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
