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
    <div v-else class="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm mb-6">
        <i class="bi bi-search text-3xl text-gray-300"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Nenhum relato encontrado</h3>
      <p class="text-gray-500 max-w-md mx-auto">Tente ajustar seus filtros para ver mais resultados ou seja o primeiro a
        postar nesta categoria!</p>
    </div>

    <!-- Modal Formulario Jornada -->
    <Teleport to="body">
      <div v-if="mostrarFormulario" class="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          @click="mostrarFormulario = false"></div>

        <!-- Modal Content Container -->
        <div class="relative w-full max-w-4xl z-10 animate-fade-in-up">
          <FormularioJornada @fechar="mostrarFormulario = false" @uploadFinalizado="onUploadFinalizado" />
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

// --- DADOS MOCKADOS (fallback local para desenvolvimento) ---
const cardsMock = [
  {
    id: 1,
    tituloRelato: 'Jornada de Clarissa',
    classificacao: 'Dermatite Atópica',
    imgAntes: 'https://placehold.co/400x400/e2e8f0/64748b?text=Antes',
    imgDepois: 'https://placehold.co/400x400/f0fdf4/15803d?text=Depois',
    solucao: 'Uso consistente de hidratantes e redução de banhos quentes.',
    microdepoimento: 'Mudou minha vida completamente, finalmente posso dormir sem coceira.',
    tags: ['dermatite', 'hidratação', 'cuidados-diários'],
    likes: 34,
    curtido: false,
    regioesAfetadas: ['Braços', 'Pescoço'],
    genero: 'Feminino',
    faixaEtaria: '20-30',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 2,
    tituloRelato: 'Tratamento do João',
    classificacao: 'Psoríase',
    imgAntes: 'https://placehold.co/400x400/e2e8f0/64748b?text=Antes',
    imgDepois: 'https://placehold.co/400x400/f0fdf4/15803d?text=Depois',
    solucao: 'Fototerapia e mudança na alimentação.',
    microdepoimento: 'A fototerapia foi essencial para o controle das manchas.',
    tags: ['psoríase', 'fototerapia', 'alimentação'],
    likes: 12,
    curtido: true,
    regioesAfetadas: ['Cotovelos', 'Joelhos'],
    genero: 'Masculino',
    faixaEtaria: '30-40',
    descricao: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 3,
    tituloRelato: 'Rotina da Ana',
    classificacao: 'Acne Adulta',
    imgAntes: 'https://placehold.co/400x400/e2e8f0/64748b?text=Antes',
    imgDepois: 'https://placehold.co/400x400/f0fdf4/15803d?text=Depois',
    solucao: 'Ácido retinóico e protetor solar rigoroso.',
    microdepoimento: 'Paciência é a chave. Os resultados demoraram mas chegaram.',
    tags: ['acne', 'skincare', 'rosto'],
    likes: 56,
    curtido: false,
    regioesAfetadas: ['Rosto'],
    genero: 'Feminino',
    faixaEtaria: '25-35',
    descricao: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    id: 4,
    tituloRelato: 'Recuperação do Marcos',
    classificacao: 'Eczema',
    imgAntes: 'https://placehold.co/400x400/e2e8f0/64748b?text=Antes',
    imgDepois: 'https://placehold.co/400x400/f0fdf4/15803d?text=Depois',
    solucao: 'Identificação de alergênicos e pomadas específicas.',
    microdepoimento: 'Descobrir que era alergia a níquel facilitou tudo.',
    tags: ['eczema', 'alergia', 'contato'],
    likes: 8,
    curtido: false,
    regioesAfetadas: ['Mãos'],
    genero: 'Masculino',
    faixaEtaria: '40-50',
    descricao: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
  },
  {
    id: 5,
    tituloRelato: 'Jornada de Sofia',
    classificacao: 'Rosácea',
    imgAntes: 'https://placehold.co/400x400/e2e8f0/64748b?text=Antes',
    imgDepois: 'https://placehold.co/400x400/f0fdf4/15803d?text=Depois',
    solucao: 'Laser e evitar gatilhos como calor e pimenta.',
    microdepoimento: 'O laser ajudou muito na vermelhidão.',
    tags: ['rosácea', 'laser', 'pele-sensível'],
    likes: 90,
    curtido: true,
    regioesAfetadas: ['Bochechas', 'Nariz'],
    genero: 'Feminino',
    faixaEtaria: '30-40',
    descricao: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
  }
];

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

// Quando upload finalizado do formulário (callback)
function onUploadFinalizado(id) {
  // Opcional: recarregar lista ou avisar usuario
  console.log("Upload finalizado com ID:", id)
  // Fechar modal ou recarregar galeria:
  // mostrarFormulario.value = false
  // fetchRelatosPublicos() // se desejar reconsultar automaticamente
}

/**
 * Normaliza um relato vindo do backend público para o formato esperado pelos Cards.
 * Lida com documentos legados que possuem campo 'imagens' com URLs (antes/durante/depois),
 * e também com relatos sem imagens ou com formatos inesperados.
 */
function mapRelatoParaCard(relato) {
  // relato.imagens pode ser:
  //  - objeto { antes: url, durante: [url,...], depois: url }
  //  - null/undefined
  //  - string (URL única)
  const imgsRaw = relato.imagens || null
  let imagensNormalizadas = {}

  if (!imgsRaw) {
    imagensNormalizadas = {}
  } else if (typeof imgsRaw === 'string') {
    imagensNormalizadas = { antes: imgsRaw }
  } else if (Array.isArray(imgsRaw)) {
    // raridade: array único — mapear para 'durante'
    imagensNormalizadas = { durante: imgsRaw }
  } else if (typeof imgsRaw === 'object') {
    imagensNormalizadas = { ...imgsRaw }
  } else {
    imagensNormalizadas = {}
  }

  // Garantir arrays e strings coerentes
  if (imagensNormalizadas.durante && !Array.isArray(imagensNormalizadas.durante)) {
    imagensNormalizadas.durante = [imagensNormalizadas.durante]
  }

  // Definir prioridades de imagens
  const imgDepois = imagensNormalizadas.depois || (Array.isArray(imagensNormalizadas.durante) && imagensNormalizadas.durante.slice(-1)[0]) || null
  const imgDurantePrimeira = Array.isArray(imagensNormalizadas.durante) && imagensNormalizadas.durante.length > 0 ? imagensNormalizadas.durante[0] : null
  const imgAntes = imagensNormalizadas.antes || imgDurantePrimeira || null

  // Construir array ordenado de imagens (antes, ...durante..., depois)
  const imagensArray = []
  if (imagensNormalizadas.antes) imagensArray.push(imagensNormalizadas.antes)
  if (Array.isArray(imagensNormalizadas.durante)) imagensArray.push(...imagensNormalizadas.durante)
  if (imagensNormalizadas.depois) imagensArray.push(imagensNormalizadas.depois)

  // Slice/shorten microdepoimento se necessário
  const micro = relato.microdepoimento || (relato.descricao ? (relato.descricao.length > 220 ? relato.descricao.slice(0, 220) + '...' : relato.descricao) : '')

  return {
    id: relato.id || relato._id || null,
    tituloRelato: relato.classificacao || 'Relato',
    classificacao: relato.classificacao || relato.tituloRelato || null,
    imgAntes: imgAntes || placeholder,
    imgDepois: imgDepois || (imagensArray.length > 0 ? imagensArray[imagensArray.length - 1] : placeholder),
    imagensArray: imagensArray.filter(Boolean),
    solucao: relato.solucao_encontrada || relato.microdepoimento || relato.solucao || (relato.descricao ? relato.descricao.split('\n')[0] : ''),
    microdepoimento: micro,
    tags: relato.tags || relato.tags_extraidas || [],
    likes: relato.likes || 0,
    curtido: false,
    regioesAfetadas: relato.regioesAfetadas || relato.regioesAfetadas || relato.regioes || [],
    genero: relato.genero || null,
    faixaEtaria: relato.classificacao || null,
    descricao: relato.descricao || '',
    raw: relato // manter raw para debug/overlay
  }
}

/**
 * Busca relatos públicos no endpoint leve criado para a galeria.
 * Endpoint esperado: GET /relatos/public/listar?limit=50
 * Retorno esperado: { quantidade: X, dados: [ { ...relatoPublico } ] }
 *
 * Observação: ajuste o path se o seu backend tiver prefixo (/api, /v1, etc).
 */
async function fetchRelatosPublicos(limit = 12) {
  try {
    const resp = await api.get('/relatos/admin/galeria/preview', { params: { limit } })
    if (!resp || !resp.data) {
      console.warn('Resposta inesperada ao buscar relatos públicos:', resp)
      return []
    }
    const relatos = resp.data.dados || []
    // Mapear e normalizar cada relato
    return relatos.map(mapRelatoParaCard)
  } catch (err) {
    console.error('Erro ao buscar relatos públicos:', err)
    // fallback sensato: retornar mocks em dev para não quebrar UI
    // Em produção, podemos querer retornar [] e exibir "Nenhum relato"
    return cardsMock.slice(0, 6) // mantendo alguns cards para dev/testes
  }
}

// Monta a galeria ao montar o componente
onMounted(async () => {
  const resultado = await fetchRelatosPublicos(12)
  if (resultado && resultado.length > 0) {
    cards.value = resultado
  } else {
    // Se não trouxe nada, mantemos fallback (cardsMock) ou deixamos vazio
    // Para UX de desenvolvimento manteremos alguns mocks como fallback:
    cards.value = cardsMock.slice(0, 6)
    console.info('Nenhum relato público retornado — usando fallback mock.')
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
</style>
