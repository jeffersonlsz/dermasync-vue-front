<template>
    <div class="h-full flex flex-col bg-white overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
            <h2 class="text-lg font-bold text-gray-800">Detalhes do Relato</h2>
            <span class="text-sm font-mono text-gray-400">#{{ relatoId.slice(0, 8) }}</span>
        </div>

        <div v-if="isLoading" class="flex-1 flex justify-center items-center">
            <svg class="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </div>

        <div v-else-if="error" class="flex-1 flex justify-center items-center text-red-500 p-8 text-center">
            <div>
                <svg class="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-lg font-medium">{{ error }}</p>
            </div>
        </div>

        <div v-else-if="relato" class="flex-1 overflow-y-auto p-8 space-y-8">

            <!-- Tags / Info -->
            <div class="flex flex-wrap gap-4 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                    <span
                        class="block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Classificação</span>
                    <span class="text-gray-900 font-semibold">{{ relato.classificacao || 'Não informada' }}</span>
                </div>
                <div class="w-px h-8 bg-gray-200 mx-2"></div>
                <div>
                    <span class="block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Gênero</span>
                    <span class="text-gray-900 font-semibold">{{ relato.genero || 'Não informado' }}</span>
                </div>
                <div class="w-px h-8 bg-gray-200 mx-2"></div>
                <div>
                    <span class="block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Regiões
                        Afetadas</span>
                    <span class="text-gray-900 font-semibold">{{ formatRegions(relato.regioesAfetadas) }}</span>
                </div>
                <div class="w-px h-8 bg-gray-200 mx-2"></div>
                <div>
                    <span class="block text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Data de
                        Envio</span>
                    <span class="text-gray-900 font-semibold">{{ formatDate(relato.created_at) }}</span>
                </div>
            </div>

            <!-- Descrição Completa -->
            <div>
                <h3 class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Relato do
                    Paciente/Responsável</h3>
                <div class="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 relative">
                    <svg class="absolute top-4 left-4 w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p class="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap pl-6 relative z-10">{{
                        relato.descricao }}</p>
                </div>
            </div>

            <!-- Imagens -->
            <div v-if="hasImages(relato.imagens)" class="space-y-3">
                <h3 class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Evidências Visuais</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-if="relato.imagens?.antes" class="space-y-2">
                        <div class="flex items-center gap-2 mb-2">
                            <span
                                class="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg uppercase tracking-wider">Antes</span>
                            <span class="text-sm text-gray-500">Início do tratamento</span>
                        </div>
                        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img :src="relato.imagens.antes" alt="Imagem Antes do Tratamento"
                                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>

                    <div v-if="relato.imagens?.depois" class="space-y-2">
                        <div class="flex items-center gap-2 mb-2">
                            <span
                                class="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg uppercase tracking-wider">Depois</span>
                            <span class="text-sm text-gray-500">Resultado alcançado</span>
                        </div>
                        <div
                            class="aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img :src="relato.imagens.depois" alt="Imagem Depois do Tratamento"
                                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { getRelatoById } from '../../services/moderationService';

const props = defineProps({
    relatoId: { type: String, required: true }
});

const relato = ref(null);
const isLoading = ref(false);
const error = ref('');

const fetchRelatoDetails = async () => {
    if (!props.relatoId) return;

    try {
        isLoading.value = true;
        error.value = '';
        const data = await getRelatoById(props.relatoId);
        relato.value = data;
    } catch (err) {
        console.error('Failed to fetch relato details:', err);
        error.value = 'Houve um erro ao carregar os dados completos do relato.';
    } finally {
        isLoading.value = false;
    }
};

watch(() => props.relatoId, () => {
    fetchRelatoDetails();
});

onMounted(() => {
    fetchRelatoDetails();
});

function formatRegions(regions) {
    if (!regions || !regions.length) return 'Não informadas';
    return regions.join(', ');
}

function formatDate(dateStr) {
    if (!dateStr) return 'Data não informada';
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(d);
}

function hasImages(imagens) {
    return imagens && (imagens.antes || imagens.depois);
}
</script>
