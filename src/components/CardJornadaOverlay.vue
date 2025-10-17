<template>
  <!-- OVERLAY CONTAINER -->
  <transition name="fade-overlay">
    <div v-if="jornadaSelecionada" class="overlay-wrapper">
      <div class="overlay-content bg-white p-4 rounded shadow position-relative">
        <div class="overlay-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <h5 class="mb-0">
             {{ jornadaSelecionada?.tituloRelato || 'Detalhes da Jornada' }}
          </h5>
          <button class="btn-fechar-overlay btn-close position-absolute top-0 end-0 m-3"
            @click="$emit('update:jornadaSelecionada', null)">X</button>
        </div>

        <!-- Nav Pills bonitos -->
        <div class="nav nav-pills nav-fills my-3 hidden remove_mobile">
          <div class="d-flex gap-3 bg-[#f8f9fa] p-1 rounded-pill shadow-inner w-full max-w-md mx-auto">
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
              'nav-item border flex-1 text-center py-2 rounded-pill text-sm font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-white text-primary shadow-md'
                : 'text-gray-600 hover:text-primary'
            ]">
              {{ tab }}
            </button>
          </div>
        </div>

        <!-- Conteúdo das Abas -->
        <div class="bg-white rounded-xl shadow-inner h-[500px]">
          <div v-if="activeTab === 'Informações da jornada'">

            <!--CONTEUDO DA PRIMEIRA ABA -->
            <div class="row g-4 mt-3">
              <!-- LADO ESQUERDO -->
              <div class="col-md-6">

                <div class="text-center">
                   <!-- Badges descritivos -->
                <div class="mt-1 text-center" >
                  <div class="btn genero-tag">{{ jornadaSelecionada.classificacao }}</div>
                  <div class="btn genero-tag">{{ jornadaSelecionada.genero }}</div>
                  
                </div>
                  <div id="carouselFotos" class="carousel slide mb-3" data-bs-ride="carousel">
                    <div class="carousel-inner mb-4">
                      <div
                        v-for="(foto, index) in imagens"
                        :key="index"
                        :class="['carousel-item', { active: index === 0 }]"
                        @click="abrirImagemAmpliada"
                      >
                        <div style="width: 100%; height: 400px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa;">
                              <img :src="imagens[fotoAtual]" class="rounded" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
                        </div>
                      </div>
                    </div>

                    <!-- Botões de navegação -->

                     <!-- Seta esquerda -->
                    <button
                      class="carousel-control-prev"
                      type="button"
                      @click="fotoAnterior"
                      style="width: 5%;"
                    >
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Anterior</span>
                    </button>

                    <!-- Seta direita -->
                    <button
                      class="carousel-control-next"
                      type="button"
                      @click="proximaFoto"
                      style="width: 5%;"
                    >
                      <span class="carousel-control-next-icon"></span>
                    </button>

                     <div class="d-flex justify-content-center gap-2 flex-wrap mb-3">
                    <img
                      v-for="(foto, index) in imagens"
                      :key="index"
                      :src="foto"
                      class="miniatura-foto"
                      :class="{ ativa: fotoAtual === index }"
                      @click="selecionarFoto(index)"
                    />
                  </div>
                  </div>

                </div>


              </div>

              <!-- LADO DIREITO -->
              <div class="col-md-6">

               

                
                <p class="text-center"><strong>Áreas afetadas:</strong></p>
                <div>
                  <span v-for="(regiao, index) in jornadaSelecionada.regioesAfetadas" :key="index"
                    class="badge bg-gradient-faded-info me-1">{{ regiao }}</span>
                </div>
                
                 <div class="">
                  <p class="mt-3 text-center"><strong>Relato:</strong></p>
                
                  <p class="text-muted">{{ textoJornada }}</p>
                </div>
                <button class="botao-ver-mais" @click.prevent="expandirTexto" >Ver Mais</button>
                <div class="mt-4">
                  <span v-for="tag in jornadaSelecionada.tags.slice(1,4)" :key="tag" class="badge bg-primary me-2 mb-1">{{ tag
                    }}</span>
                </div>

                <hr />

              </div>
            </div>

            <!-- FIM CONTEUDO DA PRIMEIRA ABA -->

          </div>

          <div v-if="activeTab === 'Casos semelhantes'">
            
            <div class="px-3 py-2">
              <p v-if="loadingCasos" class="text-muted">🔄 Buscando casos semelhantes...</p>
                <p v-else class="mb-3 text-muted">Encontramos {{ casos.length }} casos com alta similaridade:</p>


              <div v-for="(caso, index) in casos" :key="index"
                class=" align-items-start mb-3 p-3 border rounded shadow-sm bg-white">
                <img :src="caso.imgAntes" alt="Foto do caso semelhante" class="me-3 rounded"
                  style="width: 64px; height: 64px; object-fit: cover;" />
                <img :src="caso.imgDepois" alt="Foto do caso semelhante" class="me-3 rounded"
                  style="width: 64px; height: 64px; object-fit: cover;" />

                <div class="flex-grow-1">
                  <p class="mb-1">
                    <i class="bi bi-person-fill"></i>
                    <strong>{{ caso.genero }}</strong> · <strong>{{ caso.faixaEtaria }}</strong>
                    |<strong>
                      <span v-for="(area, index) in caso.areasAfetadas" :key="index">
                      {{ area }}{{ index < caso.areasAfetadas.length - 1 ? ', ' : '' }}
                      </span>
                    </strong>
                  </p>
                  <p class="text-muted mb-1" style="font-size: 0.9rem;">{{ caso.descricao }}</p>
                  <a href="#" class="text-primary" style="font-size: 0.9rem;">
                    🔍 Ver jornada completa
                  </a>
                </div>
              </div>
            </div>

            <div class="text-center mt-3">
             <button class="btn btn-outline-primary" @click="buscarCasosSemelhantes">
              Ver mais casos semelhantes
            </button>

            </div>


          </div>

      <div v-if="activeTab === 'Dicas de tratamentos'" class="tratamentos-wrapper">
        <div v-for="(categoria, index) in categoriasTratamento" :key="index" class="categoria-box" :style="{ backgroundColor: categoria.corFundo }">
          <h5 class="categoria-titulo">
            <span class="me-2">{{ categoria.icone }}</span>{{ categoria.nome }}
          </h5>

          <ul class="list-unstyled">
            <li v-for="(item, i) in categoria.itens" :key="i" class="dica-item">
              <span class="item-icone">{{ item.icone }}</span>
              <span>{{ item.texto }}</span>
            </li>
          </ul>

          <div v-if="categoria.produto" class="produto-sugerido mt-3">
            <img :src="categoria.produto.imagem" :alt="categoria.produto.nome" class="produto-img" />

            <div class="produto-detalhes mt-2">
              <p class="produto-label">⭐ Produto usado por outros usuários:</p>
              <p class="produto-nome">{{ categoria.produto.nome }}</p>
              <p class="produto-preco">{{ categoria.produto.preco }}</p>
              
              <a :href="categoria.produto.link" target="_blank" class="produto-btn">
                Ver na Amazon
              </a>
            </div>
          </div>
        </div>

        <p class="aviso-medico mt-3">⚠️ Essas dicas não substituem avaliação médica.</p>
      </div>
        </div>
      </div>



    </div>

  </transition>
  <!-- OVERLAY IMAGEM AMPLIADA-->
  <div v-if="showImagemAmpliada"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
    style="z-index: 9999;" @click.self="fecharImagemAmpliada">
    <img :src="imagens[fotoAtual]" alt="Imagem ampliada"
      style="max-height: 90vh; max-width: 90vw; object-fit: contain;" class="rounded shadow" />
    <button @click="fecharImagemAmpliada" class="btn-fechar-overlay btn-light position-absolute top-0 end-0 m-3">
      &times;
    </button>
  </div>
  <!-- Nav flutuante visível apenas no mobile -->
  <div v-if="jornadaSelecionada" class="tab-overlay-mobile d-md-none">
    <button v-for="(aba, index) in abas" :key="index" @click="activeTab = tabs[aba.id]"
      :class="['btn-tab', { ativo: activeTab === tabs[aba.id] }]">
      {{ aba.label }}
    </button>
  </div>


</template>

<script setup>

import { ref, computed, onMounted, onUpdated, watch } from 'vue'
import { buscarCasosSemelhantesAPI } from '../services/casosService'

// Organiza as imagens da jornada
const props = defineProps({
  jornadaSelecionada: Object
})


const casos = ref([])
const loadingCasos = ref(false)

const textoJornada = ref("");

watch(() => props.jornadaSelecionada, (novaJornada) => {
  if (novaJornada) {
    textoJornada.value = novaJornada.descricao.slice(0,140) + '...'; // Resumo inicial do texto
  }
});
const expandirTexto = () => {
  console.log('Expandindo texto da jornada');
  textoJornada.value = props.jornadaSelecionada.descricao; // Exibe o texto completo
  const botao = document.querySelector('.botao-ver-mais');
  if (botao) {
    botao.style.display = 'none'; // Esconde o botão "Ver Mais"
  }
}

const buscarCasosSemelhantes = async () => {
  console.log('Buscando casos semelhantes para:', props.jornadaSelecionada);
  let info = {
    id:props.jornadaSelecionada.id,
    genero: props.jornadaSelecionada.genero,
    classificacao: props.jornadaSelecionada.classificacao,
    regioesAfetadas: props.jornadaSelecionada.regioesAfetadas,
    tags: props.jornadaSelecionada.tags,
    descricao: props.jornadaSelecionada.descricao

  };
  loadingCasos.value = true;
  console.log('Informações da jornada:', info);
  // chamada à API para buscar casos semelhantes
  try {
    const response = await buscarCasosSemelhantesAPI(info);
    console.log('Casos semelhantes encontrados:', response.data);
    casos.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar casos semelhantes:', error);
    casos.value = [];
  } finally {
    loadingCasos.value = false;
    jaBuscou.value = true; // Marca que já buscou
  }
}


const dicas = [
  { icone: "🧴", texto: "Hidratantes espessos aplicados 2x/dia" },
  { icone: "💊", texto: "Corticoides tópicos leves em crise aguda" },
  { icone: "🧊", texto: "Compressas frias antes de dormir" },
  { icone: "🥦", texto: "Redução de laticínios e alimentos ultraprocessados" },
  { icone: "🧼", texto: "Evitar sabonetes com perfume" },
  { icone: "🥥", texto: "Uso de óleo de coco em áreas ressecadas" },
];
const abas = [
  { id: 'info', label: 'Informações' },
  { id: 'casos', label: 'Semelhantes' },
  { id: 'dicas', label: 'Tratamentos' },
];

const categoriasTratamento = [
  {
    nome: 'Hábitos Diários',
    icone: '🌿',
    corFundo: '#e7f6ec',
    itens: [
      { icone: '🧊', texto: 'Compressas frias antes de dormir' },
      { icone: '🚿', texto: 'Evitar sabonetes com perfume' },
      { icone: '🥛', texto: 'Redução de laticínios e ultraprocessados' }
    ]
  },
  {
    nome: 'Hidratantes e Óleos',
    icone: '💧',
    corFundo: '#e3f2fd',
    itens: [
      { icone: '🧴', texto: 'Hidratantes espessos aplicados 2x/dia' },
      { icone: '🥥', texto: 'Uso de óleo de coco em áreas ressecadas' }
    ],
    produto: {
      nome: 'Hidratante CeraVe Pele Seca – 473ml',
      preco: 'R$ 79,90',
      imagem: 'https://m.media-amazon.com/images/I/61vyW3Dl-7L._AC_UL320_.jpg',
      link: 'www.amazon.com.br/Loção-Hidratante-Corporal-Textura-Fluida-Cerave/dp/B07RK4HST7/ref=sr_1_1_sspa'
    }
    //www.amazon.com.br/Loção-Hidratante-Corporal-Textura-Fluida-Cerave/dp/B07RK4HST7/ref=sr_1_1_sspa?__mk_pt_BR=ÅMÅŽÕÑ&crid=2NTKY1Y12UIR1&dib=eyJ2IjoiMSJ9.w6wZ1FsAj2iZvPC9gNawK9Tg8oo1EYaH37mk3BWNEQ0h8SW3Byi7CnkxPgWKvQxIrXCcezuM6nTvUZU06EWYzLCwybokeq1X1nPN_UFfXGmIBWu3tIslh1BzPbCiFY36hZwNlExCI-OQr3divDl-MD3Cx2-PhqqxoDPl_u56kCL7KvZplb817iwB4eGjS0tCvt1qDFaAgVEDDnZvrm_Y09_a6ofZmAhgq9gxQDmRFCRHNlvk_wU5w3nRcsnTbEgUhIMQnDkYq-YhZ1lqTm0gxCgttxRwq3SlkhvgkvKOBAk.OthJVYQJ_yDvWEuzmbg5UMaJ1Xh12Nze5mdxWYenUXE&dib_tag=se&keywords=hidratante+cerave&qid=1750169680&sprefix=hidratante+cerav%2Caps%2C292&sr=8-1-spons&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1
  },
  {
    nome: 'Pomadas e Cremes Dermatológicos',
    icone: '🧴',
    corFundo: '#fff8e1',
    itens: [
      { icone: '🌿', texto: 'Pomada Zudaifu' },
      { icone: '💊', texto: 'Corticoides tópicos leves em crise aguda' }
    ]
  },
  {
    nome: 'Medicamentos Orais ou Injetáveis',
    icone: '💊',
    corFundo: '#fce4ec',
    itens: [],
    produto: null
  }
]

const tabs = { 'info': 'Informações da jornada', 'casos': 'Casos semelhantes', 'dicas': 'Dicas de tratamentos' }
const activeTab = ref(tabs['info'])
const jaBuscou = ref(false)

watch( ()=> activeTab.value, async (novoValor) => { 
  console.log('Aba ativa alterada para:', novoValor);
  if (novoValor === tabs.casos && !jaBuscou.value) {
    // Se a aba de casos semelhantes for ativada e ainda não buscou, faz a busca  
    console.log('Buscando casos semelhantes...');
    await buscarCasosSemelhantes();
  }
}  );

const fotoAtual = ref(0);
const selecionarFoto = (index) => {
  console.log('Selecionando foto:', index);
  if (index < 0 || index >= imagens.value.length) {
    console.error('Índice inválido para a foto:', index);
    return;
  }
  fotoAtual.value = index;
};
const proximaFoto = () => {
  if (fotoAtual.value < imagens.value.length - 1) {
    fotoAtual.value++;
  }else {
    fotoAtual.value = 0; // Volta para a primeira imagem
  }
};

const fotoAnterior = () => {
  if (fotoAtual.value > 0) {
    fotoAtual.value--;
  }else {
    fotoAtual.value = imagens.value.length - 1; // Volta para a última imagem
  }
};

const emit = defineEmits(['update:jornadaSelecionada'])
const showImagemAmpliada = ref(false)
onMounted(() => {
  console.log('Card recebido:', props.jornadaSelecionada ? props.jornadaSelecionada : 'null');


})

onUpdated(() => {
  console.log('Card atualizado:', props.jornadaSelecionada ? props.jornadaSelecionada : 'null');

})


const abrirImagemAmpliada = () => {
  showImagemAmpliada.value = true
}
const fecharImagemAmpliada = () => {
  showImagemAmpliada.value = false
}

const imagens = computed(() => {
  const lista = []
  if (props.jornadaSelecionada.imgAntes) lista.push(props.jornadaSelecionada.imgAntes)
  if (props.jornadaSelecionada.imgDepois) lista.push(props.jornadaSelecionada.imgDepois)
  if (props.jornadaSelecionada.imgDurante && Array.isArray(props.jornadaSelecionada.imgDurante)) {
    lista.push(...props.jornadaSelecionada.imgDurante)
  }
  return lista
})

const currentIndex = ref(0)

</script>

<style lang="css" scoped>
.thumb-jornada {
  border-radius: 15px;
  transition: transform 0.3s ease;
  cursor: pointer;

}

.miniatura {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
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

.overlay-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: auto;
}

.overlay-content {
  height: 100vh;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 960px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.overlay-content .overlay-header h5{
   font-size:18px;
}

.tab-overlay-mobile {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 8px 12px;
  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  /* aumente isso! */
  display: flex;
  gap: 10px;
}
.miniatura-foto {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.miniatura-foto.ativa {
  border-color: #6c63ff;
  box-shadow: 0 0 0 2px #6c63ff33;
}


.btn-tab {
  border: none;
  padding: 8px 14px;
  background-color: #f1f1f1;
  
  
  color: #333;
  transition: all 0.2s ease;
}

.btn-tab.ativo {
  background-color: #6c63ff;
  color: white;
  font-weight: bold;
}

.rounded-pill {
  border-radius: 5% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}

.fade-overlay-enter-to,
.fade-overlay-leave-from {
  opacity: 1;
}

.texto-resumo {
  max-height: 100px; /* Altura máxima do resumo */
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.texto-completo {
  padding-top: 0px;
}

.botao-ver-mais {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.botao-ver-mais:hover {
  background-color: #45a049;
}


@media (max-width: 768px) {
  .remove_mobile {
    display: none;
  }

  .overlay-wrapper {
    position: fixed;
    inset: 0;
    /* equivale a top:0, right:0, bottom:0, left:0 */
    z-index: 9990;
    background-color: white;
    overflow-y: auto;
    padding: 1.5rem 1rem 5rem;
    /* espaço inferior para as tabs flutuantes */
    border-radius: 0 !important;
    /* remove bordas arredondadas */
  }

.btn-fechar-overlay {
  position: fixed !important;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  background: white;
  color: #333;
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.genero-tag{

}

.tratamentos-wrapper {
  padding: 1rem;
  font-family: 'Nunito', sans-serif;
}

.categoria-box {
  border-radius: 14px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.categoria-titulo {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4b3b36;
  margin-bottom: 0.5rem;
}

.dica-item {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  margin-bottom: 6px;
}

.item-icone {
  width: 28px;
  display: inline-block;
  font-size: 1.1rem;
  margin-right: 8px;
}

.produto-sugerido {
  background: #ffffff;
  border-radius: 10px;
  padding: 0.8rem;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.produto-img {
  width: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.produto-detalhes {
  flex: 1;
  min-width: 180px;
}

.produto-label {
  font-size: 0.88rem;
  color: #555;
  margin-bottom: 0.25rem;
}

.produto-nome {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
}

.produto-preco {
  color: #4b3b36;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.produto-btn {
  display: inline-block;
  background: linear-gradient(to right, #56d9bd, #a79cd5);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.produto-btn:hover {
  transform: scale(1.03);
}

.aviso-medico {
  font-size: 0.8rem;
  color: #777;
  text-align: center;
}

}
</style>