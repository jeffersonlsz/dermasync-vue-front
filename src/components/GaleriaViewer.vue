<template>
  <div class="galeria-viewer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">

    <!-- Cabeçalho: CTA Centralizado e Filtros -->
    <div class="flex flex-col items-center gap-10 mb-12">

      <!-- CTA Button Centralizado e Maior -->
      <button @click="mostrarFormulario = true"
        class="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white transition-all duration-300 bg-primary font-heading rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-600 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/20">
        <span
          class="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></span>
        <i class="bi bi-pencil-square mr-3 text-2xl group-hover:rotate-12 transition-transform"></i>
        Envie seu relato e aprenda
      </button>

      <!-- Linha de Filtros (Alinhado à esquerda do Grid) -->
      <div class="w-full flex justify-start border-b border-gray-100 pb-4">
        <FiltrosGaleria :contadores="contadores" @filtrosAlterados="aplicarFiltros" />
      </div>

    </div>

    <!-- Grid de Cards -->
    <div v-if="cardsFiltrados.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <CardJornada v-for="card in cardsFiltrados" :key="card.id" :card="card" :tags_extraidas="card.tags"
        :microdepoimento="card.microdepoimento" />
    </div>

    <!-- Estado vazio -->
    <div v-else class="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <h3 class="text-2xl font-semibold text-gray-900">não há relatos na galeria</h3>
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
import { ref, onMounted, computed } from 'vue'
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

const cards = ref([])
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
      tituloRelato: id, // ID como título por enquanto
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
  const excerpt = relato.excerpt || relato.microdepoimento || relato.solucao || "Relato anônimo"
  const imgAntes = imagens.antes || buildImageUrl(relato.image_previews?.antes?.[0]) || placeholder
  const imgDepois = imagens.depois || buildImageUrl(relato.image_previews?.depois?.[0]) || imgAntes || placeholder

  return {
    id: relato.id,
    tituloRelato: relato.tituloRelato || "Relato",
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
    tags,
    likes: 0,
    curtido: false,
    regioesAfetadas: relato.regioesAfetadas || [],
    genero: relato.genero || null,
    faixaEtaria: relato.age_range || relato.faixaEtaria || null,
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

// Monta a galeria ao montar o componente
onMounted(async () => {
  const resultado = await fetchRelatosPublicos(14)
  cards.value = (resultado && resultado.length > 0) ? resultado : []
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
</style>
