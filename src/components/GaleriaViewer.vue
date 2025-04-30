<template>
  
  <div class="container py-5">
    <h2 class="fw-bold text-center mb-1">Galeria Colaborativa</h2>
    <p class="text-center text-muted mb-4">Neste espaço, você poderá ver a contribuição de outras pessoas que passaram pela mesma condição e obtiveram sucesso.</p>
    <p class="text-center text-muted mb-4">Não se preocupe, os dados são 100% anônimos</p>
    <div class="text-center mb-4">
      <button class="btn btn-primary btn-lg px-5" @click="mostrandoFormulario = true">
        Compartilhe sua jornada - outros podem aprender com você !
        </button>
    </div>

    <FiltrosGaleria/>

    
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
        <div
          v-for="(card, index) in galeria.slice(0, limite)"
          :key="card.id"
          class="col-md-4"
        >
          <CardJornada :card="card" @verJornada="abrirOverlay" />
        </div>
      </TransitionGroup>

      <!-- Botão de carregar mais -->
      <div v-if="limite < galeria.length" class="text-center my-4">
        <button 
          class="btn btn-outline-primary px-4 py-2"
          @click="carregarMais"
          :disabled="carregandoMais"
        >
          <span v-if="carregandoMais" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Carregar mais
        </button>
    </div>

    <!-- Mensagem final quando tudo foi carregado -->
    <div v-else-if="galeria.length > 0" class="text-center text-muted my-4">
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
    

    <!-- OVERLAY -->
    <div v-if="jornadaSelecionada" class="overlay">
      <div class="overlay-content">
        <button class="btn-close float-end" @click="jornadaSelecionada = null"></button>
        <div class="row g-4">
          <div class="col-md-6">
            <img :src="jornadaSelecionada.imgDepois" class="img-fluid rounded" alt="Imagem" />
            <div class="mt-3 d-flex gap-2">
              <img :src="jornadaSelecionada.imgAntes" width="70" height="70" class="rounded border" />
              <img :src="jornadaSelecionada.imgDepois" width="70" height="70" class="rounded border" />
            </div>
            <div class="mt-3">
              <span v-for="tag in jornadaSelecionada.tags" :key="tag" class="badge bg-primary me-2">{{ tag }}</span>
            </div>
          </div>
          <div class="col-md-6">
            <p><strong>Faixa etária:</strong> {{ jornadaSelecionada.classificacao }}</p>
            <p><strong>Gênero:</strong> feminino</p>
            <p><strong>Área afetada:</strong> braços</p>
            <p><strong>Descrição:</strong></p>
            <p class="text-muted">{{ jornadaSelecionada.solucao }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { db, storage } from '../firebase/config'; // ajuste o caminho conforme seu projeto
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import FormularioJornada from '../components/FormularioJornada.vue';
import FiltrosGaleria from '../components/FiltrosGaleria.vue';
import CardJornada from '../components/CardJornada.vue';


const limite = ref(9);
const incremento = 9;
const galeria = ref([]);
const carregando = ref(true);
const jornadaSelecionada = ref(null);
const mostrandoFormulario = ref(false);
const estado = ref('LOADING'); 

const carregandoMais = ref(false);

async function carregarMais() {
  carregandoMais.value = true;
  await new Promise(resolve => setTimeout(resolve, 400)); // simula delay
  limite.value += incremento;
  carregandoMais.value = false;
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
        let urlAntes = '';
        let urlDepois = '';
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
       

        return {
          id: doc.id,
          imgAntes: urlAntes,
          imgDepois: urlDepois,
          classificacao: data.classificacao || 'Não informado',
          tags: data.tags || [],
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
    const caminhoDepois = data.imagens.depois;

    let urlAntes = '/img/fallback-error.png';
    let urlDepois = '/img/fallback-error.png';

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

    const novoCard = {
      id: docSnap.id,
      imgAntes: urlAntes,
      imgDepois: urlDepois,
      classificacao: data.classificacao || 'Não informado',
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

onMounted(() => {
  carregarGaleria();
});



function limparFormulario() {
  console.log('Usuário cancelou envio');
}

function abrirOverlay(card) {
  jornadaSelecionada.value = card;
}

// Dados mockados por enquanto
/*const galeria = ref([
  {
    classificacao: 'Adulto',
    tags: ['Hidratante aveia', 'Corticóides'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Hidratação com aveia e uso de corticóides'
  },
  {
    classificacao: 'Adolescente',
    tags: ['Creme hidratante', 'Advantan'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Uso de creme hidratante e Advantan'
  },
  {
    classificacao: 'Adulto',
    tags: ['Óleo de girassol', 'Banhos mornos'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Injeção de vitamina D e uso de óleo de girassol'
  },
  {
    classificacao: 'Criança',
    tags: ['Hidratante infantil', 'Pomada natural'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Melhora com uso de hidratante infantil leve'
  },
  {
    classificacao: 'Adolescente',
    tags: ['Protetor solar', 'Vitamina D'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Exposição ao sol moderada com protetor e suplemento vitamínico'
  },
  {
    classificacao: 'Adulto',
    tags: ['Pomada manipulada', 'Hidratantes noturnos'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Melhora com uso diário de pomadas personalizadas'
  },
  {
    classificacao: 'Criança',
    tags: ['Banho de aveia', 'Creme calmante'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Uso de banho morno com aveia e cremes calmantes'
  },
  {
    classificacao: 'Adolescente',
    tags: ['Dieta sem lactose', 'Probióticos'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Controle da dermatite com ajuste na alimentação e probióticos'
  },
  {
    classificacao: 'Adulto',
    tags: ['Fototerapia', 'Hidratante intensivo'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Sessões semanais de fototerapia e hidratação intensa'
  },
  {
    classificacao: 'Criança',
    tags: ['Pomada de corticoide leve', 'Vestimenta de algodão'],
    imgAntes: 'https://placehold.co/200x140?text=Antes',
    imgDurante: 'https://placehold.co/200x140?text=Depois',
    solucao: 'Melhora significativa com uso de roupas leves e pomadas leves'
  }
]); */
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
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
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
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
