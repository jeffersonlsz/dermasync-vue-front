<template>
    <div class="h-full flex flex-col bg-white">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 class="text-lg font-bold text-gray-800">Fila de Moderação</h2>
            <span class="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                {{ normalizedRelatos.length }} pendentes
            </span>
        </div>

        <div v-if="isLoading" class="p-8 flex justify-center text-gray-400">
            <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>

        <div v-else-if="normalizedRelatos.length === 0" class="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h3 class="text-gray-900 font-medium text-lg">Fila Vazia</h3>
            <p class="text-gray-500 mt-1 text-sm">Não há relatos pendentes de moderação.</p>
        </div>

        <div v-else class="flex-1 overflow-y-auto p-4 space-y-3">
            <button v-for="relato in normalizedRelatos" :key="relato.id" @click="$emit('select', relato.__raw)" :class="[
                'w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-3',
                selectedId === relato.id
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            ]">
                <div class="flex justify-between items-start gap-2">
                    <span class="text-xs font-mono text-gray-500">#{{ relato.id }}</span>
                    <span class="text-xs text-gray-400">{{ formatDate(relato.created_at) }}</span>
                </div>

                <div class="flex items-center gap-2 flex-wrap">
                    <span class="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                        {{ relato.classificacao || 'N/A' }}
                    </span>
                    <span class="text-gray-300">•</span>
                    <span class="text-xs text-gray-600 font-medium">{{ relato.genero || 'N/A' }}</span>
                </div>

                <div class="flex gap-3 mt-1">
                    <div v-if="relato.imagens?.antes"
                        class="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img :src="relato.imagens.antes" alt="Antes" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium mb-1 truncate">
                            {{ formatRegions(relato.regioesAfetadas) }}
                        </p>
                        <p class="text-sm text-gray-800 line-clamp-2 leading-relaxed">
                            "{{ relato.descricao }}"
                        </p>
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import api from '@/lib/api'

const props = defineProps({
    relatos: { type: Array, required: true },
    selectedId: { type: String, default: null },
    isLoading: { type: Boolean, default: false }
});

const emit = defineEmits(['select']);

const relatos = computed(() => props.relatos || []);
const selectedId = computed(() => props.selectedId);
const isLoading = computed(() => props.isLoading);

const imagensCache = ref({})

const normalizedRelatos = computed(() => relatos.value.map(normalizeRelato));

function normalizeRelato(raw) {
    const cached = imagensCache.value[raw.id]

    const imagens = cached || {
        antes: raw.imagens?.antes || raw.image_refs?.antes?.[0] || null,
        durante: raw.imagens?.durante || raw.image_refs?.durante?.[0] || null,
        depois: raw.imagens?.depois || raw.image_refs?.depois?.[0] || null,
    };

    // Se não houver cache, buscar em background e popular o cache
    if (!cached && raw.id) {
        fetchRelatoImagens(raw.id).then(result => {
            imagensCache.value = { ...imagensCache.value, [raw.id]: result }
        }).catch(err => {
            console.warn('Falha ao buscar imagens do relato (moderação):', raw.id, err)
        })
    }

    return {
        __raw: raw,
        id: raw.id,
        descricao: raw.descricao || raw.conteudo_original || '',
        created_at: raw.created_at || raw.updated_at || raw.createdAt || null,
        imagens,
        classificacao: raw.classificacao || raw.classificacao_manual || null,
        genero: raw.genero || null,
        regioesAfetadas: raw.regioesAfetadas || raw.regios || raw.regiao || []
    };
}

async function fetchRelatoImagens(relatoId) {
    try {
        const resp = await api.get(`/relatos/${relatoId}/imagens`)
        const data = resp.data || {}
        return {
            antes: data.antes?.thumb_url || null,
            durante: Array.isArray(data.durante) ? (data.durante[0]?.thumb_url || null) : null,
            depois: data.depois?.thumb_url || null
        }
    } catch (err) {
        console.warn('Erro ao buscar imagens do relato:', relatoId, err)
        return { antes: null, durante: null, depois: null }
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    }).format(d);
}

function formatRegions(regions) {
    if (!regions || !regions.length) return 'Regiões não informadas';
    return regions.join(', ');
}
</script>
