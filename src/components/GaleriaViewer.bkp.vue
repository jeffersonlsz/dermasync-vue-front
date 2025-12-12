<template>
  <div class="galeria-viewer">
    <div v-if="loading" class="loading">Carregando relatos...</div>
    <div v-else-if="error" class="error">Erro: {{ errorMessage }}</div>
    <div v-else>
      <div v-if="cards.length === 0" class="empty">Nenhum relato público encontrado.</div>

      <div class="grid">
        <article v-for="card in cards" :key="card.id" class="card">
          <div class="thumb">
            <img :src="card.signed_url || placeholder" :alt="card.titulo || 'relato'" />
          </div>
          <div class="meta">
            <h4>{{ card.titulo || card.id }}</h4>
            <p class="snippet">{{ card.snippet || card.descricao_curta || '' }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import api from '@/lib/api'
import placeholder from '@/assets/placeholder.png'

/**
 * Ajuste a baseURL conforme seu ambiente (Vite define import.meta.env).
 * Se estiver usando proxy no dev server, deixe em branco ou use '/api'.
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '') // sem barra final
const LISTAR_PUBLICAS = `${API_BASE}/imagens/listar-publicas?include_signed_url=true`
const GET_IMAGEM_BY_ID = id => `${API_BASE}/imagens/id/${id}`

const cards = ref([])
const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

// Controle de cancelamento
const controller = new AbortController()

/**
 * Pool de concorrência simples: recebe array de funções async e executa até `limit` em paralelo.
 * Mantém ordem dos resultados (associa index -> resultado).
 */
async function runWithConcurrency(tasks, limit = 6) {
  const results = new Array(tasks.length)
  let i = 0
  const runners = new Array(Math.min(limit, tasks.length)).fill(null).map(async () => {
    while (i < tasks.length) {
      const idx = i++
      try {
        results[idx] = await tasks[idx]()
      } catch (err) {
        results[idx] = { error: err }
      }
    }
  })
  await Promise.all(runners)
  return results
}

async function fetchImagensPublicas() {
  loading.value = true
  error.value = false
  errorMessage.value = ''
  try {
    // Usa api instance para enviar header Authorization automaticamente (se logado)
    const resp = await api.get(LISTAR_PUBLICAS, {
      timeout: 8000,
      signal: controller.signal
    })

    // Backend retorna {quantidade, dados} — compatível com o que criamos. Ajuste se diferente.
    const dados = resp.data?.dados ?? resp.data ?? []
    if (!Array.isArray(dados)) {
      // Caso backend retorne array diretamente em resp.data
      throw new Error('Formato inesperado da resposta (esperado array em dados ou array simples).')
    }

    // Se já veio signed_url em cada item, só setamos
    const needSigned = dados.map(d => (!d.signed_url ? d : null))

    // Cria tasks apenas para os que precisam de signed_url:
    const tasks = []
    const indices = []
    for (let idx = 0; idx < dados.length; idx++) {
      if (!dados[idx].signed_url) {
        indices.push(idx)
        tasks.push(async () => {
          try {
            // Usa api para garantir o envio do token
            const r = await api.get(GET_IMAGEM_BY_ID(dados[idx].id), {
              timeout: 8000
              // Não passamos signal aqui para não cancelar requests individuais se um falhar, 
              // mas se o componente desmontar, o controller principal cancelará tudo se implementado,
              // porém axios não propaga signal automaticamente para sub-chamadas, teríamos que passar.
              // Vamos passar para garantir cleanup:
              , signal: controller.signal
            })
            // backend deve retornar um objeto contendo signed_url (ajuste se seu campo for diferente)
            return r.data?.signed_url ?? r.data?.signedUrl ?? null
          } catch (err) {
            if (axios.isCancel(err)) throw err // propagar cancelamento
            // log local e retorna null para usar placeholder
            console.error('Falha ao obter signed_url para', dados[idx].id, err)
            return null
          }
        })
      }
    }

    if (tasks.length > 0) {
      const signedResults = await runWithConcurrency(tasks, 6) // limitação: 6 requisições paralelas
      // associe resultados aos dados originais
      for (let j = 0; j < indices.length; j++) {
        const index = indices[j]
        const signed = signedResults[j]
        if (typeof signed === 'string' && signed) dados[index].signed_url = signed
      }
    }

    const normalized = dados.map(d => {
      const su = d.signed_url || (Array.isArray(d.signed_urls) && d.signed_urls.length ? d.signed_urls[0] : null)
      return {
        id: d.id || d._id || d.uid,
        titulo: d.titulo || d.title || '',
        snippet: d.snippet || d.descricao_curta || '',
        signed_url: su,
        signed_urls: d.signed_urls ?? null,
        storage_path: d.storage_path ?? (Array.isArray(d.paths) ? d.paths[0] : null),
        raw: d
      }
    })



    cards.value = normalized
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request cancelado pelo usuário (desmontagem).')
      return
    }
    console.error('Erro ao buscar imagens públicas:', err)
    error.value = true
    errorMessage.value = err.message ?? String(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchImagensPublicas()
})

onUnmounted(() => {
  controller.abort() // Cancela requisições pendentes ao sair
})
</script>

<style scoped>
.galeria-viewer {
  padding: 1rem;
}

.loading,
.error,
.empty {
  text-align: center;
  margin: 1rem 0;
  color: #444;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.card {
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: #fff;
}

.thumb img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}

.meta {
  padding: 0.5rem;
}

.meta h4 {
  margin: 0 0 0.4rem 0;
  font-size: 0.95rem;
}

.snippet {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
}
</style>
