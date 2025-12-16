<template>
  <BaseLayout>
    <div class="container mx-auto px-4 py-8">

      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
          Galeria de Resultados
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Exemplos reais e anônimos de jornadas compartilhadas.
          Para ver os relatos completos, é necessário fazer login.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12 text-gray-500">
        Carregando relatos...
      </div>

      <!-- Empty -->
      <div v-else-if="relatos.length === 0" class="text-center py-12 text-gray-500">
        Ainda não há relatos públicos disponíveis.
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <CardRelatoPublico v-for="relato in relatos" :key="relato.id" :relato="relato"
          @click="handleClick(relato.id)" />
      </div>

      <!-- CTA -->
      <div class="text-center">
        <div class="inline-block p-8 bg-sky-50 rounded-2xl border border-sky-100 max-w-xl">
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Quer ver relatos completos?
          </h3>
          <p class="text-gray-600 mb-6">
            Faça login para acessar detalhes completos e encontrar casos parecidos com o seu.
          </p>
          <button @click="authStore.openLoginModal()"
            class="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-600 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Entrar e ver mais
          </button>
        </div>
      </div>

    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import BaseLayout from '../layouts/BaseLayout.vue'
import CardRelatoPublico from '../components/CardRelatoPublico.vue'
import api from '../lib/api'

const authStore = useAuthStore()

const relatos = ref([])
const loading = ref(true)

// Helper para normalizar dados da API (suporte a legado e novos formatos)
function normalizeRelato(item) {
  const previews = item.image_previews || {}

  // Mapeamento de fallback para estrutura antiga 'imagens'
  if (!previews.before && item.imagens) {
    if (typeof item.imagens === 'string') {
      previews.before = item.imagens
    } else if (typeof item.imagens === 'object') {
      previews.before = item.imagens.antes || item.imagens.before
      previews.after = item.imagens.depois || item.imagens.after
    }
  }

  // Fallbacks de texto
  const excerpt = item.excerpt || item.microdepoimento || (item.descricao ? item.descricao.slice(0, 100) + '...' : '')

  return {
    ...item,
    id: item.id || item._id,
    image_previews: {
      before: previews.before || null,
      after: previews.after || null
    },
    excerpt,
    age_range: item.age_range || item.faixaEtaria,
    duration: item.duration,
    tags: Array.isArray(item.tags) ? item.tags : []
  }
}

async function fetchRelatos() {
  try {
    const res = await api.get('/relatos/galeria/public', {
      params: { limit: 12, page: 1 }
    })
    const rawData = res.data.dados ?? []
    relatos.value = rawData.map(normalizeRelato)
  } catch (err) {
    console.error('Erro ao carregar galeria pública', err)
    relatos.value = []
  } finally {
    loading.value = false
  }
}

function handleClick(id) {
  authStore.openLoginModal({ next: `/galeria/${id}` })
}

onMounted(fetchRelatos)
</script>
