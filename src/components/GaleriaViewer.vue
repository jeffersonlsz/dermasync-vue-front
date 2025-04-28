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

    <div class="mb-4 text-center">
      <div class="linha-filtro mb-2">
        <strong>Faixa etária :</strong>
        <span class="badge bg-light text-dark mx-1">Criança</span>
        <span class="badge bg-light text-dark mx-1">Adolescente</span>
        <span class="badge bg-light text-dark mx-1">Adulto</span>
      </div>
      <div class="linha-filtro mb-2">
        <strong>Gênero :</strong>
        <span class="badge bg-light text-dark mx-1">Masculino</span>
        <span class="badge bg-light text-dark mx-1">Feminino</span>
        <span class="badge bg-light text-dark mx-1">Não informado</span>
      </div>
      <div class="linha-filtro">
        <strong>Região do corpo :</strong>
        <span class="badge bg-light text-dark mx-1">Rosto</span>
        <span class="badge bg-light text-dark mx-1">Pernas</span>
        <span class="badge bg-light text-dark mx-1">Braços</span>
      </div>
    </div>

    
    <div>
      <div v-if="carregando" class="text-center py-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>

      <div v-else class="row g-4">
        <div v-for="(card, index) in galeria.slice(0, limite)" :key="index" class="col-md-4">
          <div class="card border-0 shadow-sm">
            <div class="d-flex">
              <img :src="card.imgAntes" @error="(e) => e.target.src = '/img/fallback-error.png'" class="w-50 rounded-start" alt="Antes" style="object-fit: cover; height: 140px;" />
              <img :src="card.imgDurante" @error="(e) => e.target.src = '/img/fallback-error.png'"  class="w-50 rounded-end" alt="Durante" style="object-fit: cover; height: 140px;" />
            </div>

            <div class="p-3">
              <h6 class="fw-bold mb-1">{{ card.classificacao }}</h6>
              <div class="mb-2 d-flex flex-wrap gap-1">
                <span v-for="tag in card.tags" :key="tag" class="badge bg-light text-dark">{{ tag }}</span>
              </div>
              <p class="small text-muted mb-1">{{ card.solucao }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <a href="#" class="small text-primary text-decoration-none" @click.prevent="abrirOverlay(card)">Ver jornada</a>
                <button class="btn btn-outline-secondary btn-sm">Curtir ❤️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mostrandoFormulario" class="overlay" @click.self="mostrandoFormulario = false">
      <div class="overlay-content">
        <FormularioJornada @fechar="mostrandoFormulario = false" />
      </div>
    </div>
    <div class="text-center mt-4" v-if="limite < galeria.length">
      <button class="btn btn-outline-primary" @click="limite += 6">Carregar mais</button>
    </div>

    <!-- OVERLAY -->
    <div v-if="jornadaSelecionada" class="overlay">
      <div class="overlay-content">
        <button class="btn-close float-end" @click="jornadaSelecionada = null"></button>
        <div class="row g-4">
          <div class="col-md-6">
            <img :src="jornadaSelecionada.imgDurante" class="img-fluid rounded" alt="Imagem" />
            <div class="mt-3 d-flex gap-2">
              <img :src="jornadaSelecionada.imgAntes" width="70" height="70" class="rounded border" />
              <img :src="jornadaSelecionada.imgDurante" width="70" height="70" class="rounded border" />
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
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import FormularioJornada from '../components/FormularioJornada.vue';

const limite = ref(6);
const galeria = ref([]);
const carregando = ref(true);
const jornadaSelecionada = ref(null);
const mostrandoFormulario = ref(false);


// Função para carregar os dados
async function carregarGaleria() {
  try {
    const querySnapshot = await getDocs(collection(db, 'jornadas'));
    
      const dados = await Promise.all(querySnapshot.docs.map(async doc => {
        const data = doc.data();
        // Pega os caminhos das imagens
        const caminhoAntes = data.imagens.antes; // exemplo: "jornadas/fotoAntes.jpg"
        const caminhoDepois = data.imagens.depois; // exemplo: "jornadas/fotoDurante.jpg"

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
          console.warn(`Erro ao carregar imagem Durante do documento ${doc.id}: usando fallback.`);
        }
        let urlAntes = '';
        let urlDepois = '';
      

        // Gera as URLs públicas
        
        if (caminhoAntes) {
          urlAntes = await getDownloadURL(storageRef(storage, caminhoAntes));
        }

        if (caminhoDepois) {
          urlDepois = await getDownloadURL(storageRef(storage, caminhoDepois));
        }

        return {
          id: doc.id,
          imgAntes: urlAntes,
          imgDurante: urlDepois,
          classificacao: data.classificacao || 'Não informado',
          tags: data.tags || [],
          solucao: data.solucao || '',
          // outros campos se precisar
        };
    }));

    galeria.value = dados;

  } catch (error) {
    console.error('Erro ao carregar galeria:', error);
  } finally {
    carregando.value = false;
  }
}

onMounted(() => {
  carregarGaleria();
});



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

</style>
