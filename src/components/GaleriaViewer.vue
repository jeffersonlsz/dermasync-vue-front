<template>
  <div class="galeria-viewer max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 mt-24">

    <!-- Cabeçalho: CTA Centralizado e Filtros -->
    <div class="flex flex-col items-center gap-12 mb-16">

      <!-- CTA Button Centralizado -->
      <button @click="mostrarFormulario = true"
        class="group inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-medium tracking-wide text-white transition-all duration-400 bg-gray-900 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:bg-gray-800 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
        <span class="flex items-center gap-3">
          <svg class="w-4 h-4 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
            </path>
          </svg>
          Compartilhe sua jornada
        </span>
      </button>

      <!-- Linha de Filtros (Alinhado à esquerda do Grid) -->
      <div class="w-full flex justify-start border-b border-gray-200/60 pb-6">
        <FiltrosGaleria :contadores="contadores" @filtrosAlterados="aplicarFiltros" />
      </div>

    </div>

    <!-- Estado de Carregamento -->
    <div v-if="loading" class="space-y-12">
      <!-- Mensagem de Carregamento Moderna -->
      <div class="flex flex-col items-center justify-center py-8">
        <div class="relative w-16 h-16 mb-4 flex items-center justify-center">
          <!-- Efeito de anel giratório moderno -->
          <div class="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div
            class="absolute inset-0 rounded-full border-4 border-t-gray-900 border-r-transparent border-b-transparent border-l-transparent animate-spin">
          </div>
        </div>
        <p
          class="text-[16px] font-medium text-gray-600 tracking-wide text-center transition-all duration-300 animate-pulse">
          {{ mensagemAtual }}
        </p>
      </div>

      <!-- Grid de Skeletons (Esqueleto dos Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        <div v-for="i in 6" :key="i"
          class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 space-y-5">
          <!-- Cabeçalho do Card -->
          <div class="space-y-2">
            <div class="h-5 bg-gray-100 rounded-md w-2/3 shimmer"></div>
            <div class="flex gap-2">
              <div class="h-3 bg-gray-100 rounded-md w-12 shimmer"></div>
              <div class="h-3 bg-gray-100 rounded-md w-16 shimmer"></div>
            </div>
          </div>

          <!-- Imagens Antes/Depois -->
          <div class="flex gap-2 h-[160px]">
            <div class="w-1/2 bg-gray-100 rounded-2xl shimmer"></div>
            <div class="w-1/2 bg-gray-100 rounded-2xl shimmer"></div>
          </div>

          <!-- Texto de Depoimento -->
          <div class="space-y-2">
            <div class="h-4 bg-gray-100 rounded-md w-full shimmer"></div>
            <div class="h-4 bg-gray-100 rounded-md w-5/6 shimmer"></div>
            <div class="h-4 bg-gray-100 rounded-md w-4/6 shimmer"></div>
          </div>

          <!-- Tags -->
          <div class="flex gap-1.5 pt-2">
            <div class="h-6 bg-gray-100 rounded-lg w-16 shimmer"></div>
            <div class="h-6 bg-gray-100 rounded-lg w-20 shimmer"></div>
          </div>

          <!-- Rodapé do Card -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-50">
            <div class="h-4 bg-gray-100 rounded-md w-24 shimmer"></div>
            <div class="h-8 bg-gray-100 rounded-full w-12 shimmer"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Cards -->
    <div v-else-if="cardsFiltrados.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      <CardJornada v-for="card in cardsFiltrados" :key="card.id" :card="card" :tags_extraidas="card.tags"
        :microdepoimento="card.microdepoimento" />
    </div>

    <!-- Estado vazio -->
    <div v-else class="flex flex-col items-center justify-center min-h-[40vh] w-full text-center">
      <div class="w-16 h-16 mb-6 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-center">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
          </path>
        </svg>
      </div>
      <h3 class="text-[17px] font-medium text-gray-900 mb-2 tracking-tight">Nenhuma experiência registrada</h3>
      <p class="text-[15px] text-gray-500 max-w-sm font-light leading-relaxed">Ainda não há relatos compartilhados com
        estes filtros. Tente ajustar sua busca ou seja o primeiro a adicionar uma jornada.</p>
    </div>

    <!-- Modal Formulario Jornada -->
    <Teleport to="body">
      <div v-if="mostrarFormulario" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          @click="mostrarFormulario = false"></div>

        <!-- Modal Content Container -->
        <div class="relative w-full max-w-4xl z-10 animate-fade-in-up">
          <FormularioJornada @fechar="mostrarFormulario = false" @sucesso="onSucesso"
            @uploadFinalizado="onUploadFinalizado" />
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import api from '@/lib/api'               // helper axios com baseURL do backend
import placeholder from '@/assets/placeholder.png'
import CardJornada from './CardJornada.vue'
import FiltrosGaleria from './FiltrosGaleria.vue'
import FormularioJornada from './FormularioJornada.vue'

const API_URL = import.meta.env.VITE_API_URL

const buildImageUrl = (path) => {
  if (!path) return placeholder
  if (/^(https?:)?\/\//.test(path)) return path
  return `${API_URL.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`
}

async function fetchRelatoImagens(relatoId) {
  try {
    const resp = await api.get(`/relatos/${relatoId}/imagens`)
    const data = resp.data || {}
    return {
      antes: data.antes?.thumb_url || null,
      depois: data.depois?.thumb_url || null
    }
  } catch (err) {
    console.warn(`Falha ao buscar imagens do relato ${relatoId}:`, err)
    return { antes: null, depois: null }
  }
}

// Mock data removed — production/empty state will show message instead

const loading = ref(true)
const cards = ref([])

const mensagensCarregamento = [
  'Carregando os relatos...',
  'Buscando histórias reais de superação...',
  'Preparando depoimentos inspiradores...',
  'Conectando experiências de cuidado...',
  'Sincronizando as jornadas de pele...',
  'Quase pronto para exibir...'
]
const mensagemAtual = ref(mensagensCarregamento[0])
const filtrosAtivos = ref({})
const mostrarFormulario = ref(false)

// Contadores para o filtro (mockado simples)
const contadores = computed(() => {
  return {
    faixaEtaria: {}, // Implementar se necessário contagem real
    genero: {},
    regiao: {},
    tags: {}
  }
})

// Botão Filtrar
function aplicarFiltros(novosFiltros) {
  filtrosAtivos.value = novosFiltros
}

// Lógica de filtragem
const cardsFiltrados = computed(() => {
  let resultado = cards.value

  // Filtrar por Faixa Etária (implementação leve — ajustar conforme regras reais)
  if (filtrosAtivos.value.faixaEtaria?.length) {
    // Exemplo: se filtro for '20-30' bate direto, caso contrário, manter tudo por ora.
    resultado = resultado.filter(c => {
      if (!c.faixaEtaria) return false
      // Se qualquer faixa selecionada coincidir com card.faixaEtaria, mantemos
      const filtros = filtrosAtivos.value.faixaEtaria.map(f => String(f).toLowerCase())
      return filtros.some(f => String(c.faixaEtaria || '').toLowerCase().includes(f))
    })
  }

  // Filtrar por Região
  if (filtrosAtivos.value.regiao?.length) {
    resultado = resultado.filter(c => {
      if (!c.regioesAfetadas) return false
      const regioesCard = c.regioesAfetadas.map(r => r.toLowerCase())
      const regioesFiltro = filtrosAtivos.value.regiao.map(r => r.toLowerCase())
      return regioesCard.some(r => regioesFiltro.includes(r))
    })
  }

  // Filtrar por Tags (se houver no componente de filtro)
  if (filtrosAtivos.value.tags?.length) {
    resultado = resultado.filter(c => {
      const tagsCard = (c.tags || []).map(t => t.toLowerCase())
      const tagsFiltro = filtrosAtivos.value.tags.map(t => t.toLowerCase())
      return tagsFiltro.every(tf => tagsCard.includes(tf))
    })
  }

  return resultado
})

// Quando upload finalizado (callback)
function onUploadFinalizado(id) {
  console.log("Upload finalizado com ID:", id)
}

async function onSucesso(payload) {
  // Payload pode ser objeto { id, message } ou string (legado)
  const id = (typeof payload === 'object' && payload.id) ? payload.id : null

  if (id) {
    // Buscar imagens do relato recém-criado
    let imagens = { antes: null, depois: null }
    try {
      imagens = await fetchRelatoImagens(id)
    } catch (err) {
      console.warn('Falha ao obter imagens do relato após sucesso:', err)
    }

    // Adicionar novo card com as imagens retornadas (thumb_url)
    const novoCard = {
      id: id,
      tituloRelato: 'Seu relato aqui em breve. Aguarde um instante.', // ID como título por enquanto
      classificacao: 'Em análise',
      imgAntes: imagens.antes || placeholder,
      imgDepois: imagens.depois || placeholder,
      solucao: 'Relato em processamento...',
      microdepoimento: 'Seu relato foi enviado e está sendo analisado.',
      tags: [],
      likes: 0,
      curtido: false,
      regioesAfetadas: [],
      genero: '...',
      faixaEtaria: '...'
    }

    cards.value.unshift(novoCard)

    // Rolar para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function mapRelatoParaCard(relato, imagens = {}) {
  const tags = Array.isArray(relato.tags) ? relato.tags : []
  const excerpt = relato.excerpt || "Relato anônimo"
  const imgAntes = imagens.antes || buildImageUrl(relato.image_previews?.antes?.[0]) || placeholder
  const imgDepois = imagens.depois || buildImageUrl(relato.image_previews?.depois?.[0]) || imgAntes || placeholder

  return {
    id: relato.id,
    tituloRelato: relato.titulo_resumido || "Relato",
    classificacao: tags[0] || "Relato",
    imgAntes,
    imgDepois,
    thumbnail: {
      antes: imgAntes,
      depois: imgDepois
    },
    excerpt,
    imagensArray: [imgAntes, imgDepois].filter(Boolean),
    solucao: relato.solucao || "",
    microdepoimento: relato.microdepoimento || excerpt,
    resumoPublico: relato.resumo_publico || 'Sem resumo',
    conteudo_anonimizado: relato.conteudo_anonimizado || null,
    conteudo_original: relato.conteudo_original || null,
    tags: relato.tags || [],
    likes: 0,
    curtido: false,
    regioesAfetadas: relato.regioes_afetadas || [],
    genero: relato.genero || null,
    faixaEtaria: relato.age_range || relato.faixaEtaria || relato.metadados.idade || null,
    descricao: relato.microdepoimento || excerpt,
    ux_effects: relato.ux_effects || [],
    raw: relato
  }
}

async function buildCardFromRelato(relato) {
  const imagens = await fetchRelatoImagens(relato.id)
  return mapRelatoParaCard(relato, imagens)
}

/**
 * Busca relatos públicos no endpoint leve criado para a galeria.
 */
async function fetchRelatosPublicos(limit = 14) {
  //await new Promise(resolve => setTimeout(resolve, 4 * 60 * 1000))
  try {
    const resp = await api.get('/feed', {
      params: { page: 1, limit }
    })

    const relatos = resp.data?.dados || []

    return await Promise.all(relatos.map(buildCardFromRelato))
  } catch (err) {
    console.error('Erro ao buscar relatos públicos:', err)
    return []
  }
}

let mensagemInterval = null

// Monta a galeria ao montar o componente
onMounted(async () => {
  let msgIndex = 0
  mensagemInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % mensagensCarregamento.length
    mensagemAtual.value = mensagensCarregamento[msgIndex]
  }, 2000)

  try {
    const resultado = await fetchRelatosPublicos(14)
    cards.value = (resultado && resultado.length > 0) ? resultado : []
  } catch (err) {
    console.error('Erro ao buscar relatos públicos:', err)
  } finally {
    loading.value = false
    if (mensagemInterval) {
      clearInterval(mensagemInterval)
    }
  }
})

onUnmounted(() => {
  if (mensagemInterval) {
    clearInterval(mensagemInterval)
  }
})
</script>

<style scoped>
/* Animação para o Modal */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Efeito Shimmer para Skeletons */
.shimmer {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
