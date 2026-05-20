<template>
    <div class="h-full flex flex-col bg-white border-l border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 class="text-lg font-bold text-gray-800">Ações de Moderação</h2>
        </div>

        <div class="p-6 flex flex-col gap-4">
            <button @click="moderate('approve')" :disabled="isLoading"
                class="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-50 flex justify-center items-center gap-2">
                <svg v-if="loadingAction === 'approve'" class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Aprovar para Galeria
            </button>

            <button @click="moderate('reject')" :disabled="isLoading"
                class="w-full py-3 px-4 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                <svg v-if="loadingAction === 'reject'" class="animate-spin h-5 w-5 text-red-700"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
                Rejeitar Relato
            </button>

            <button @click="moderate('archive')" :disabled="isLoading"
                class="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 mt-4">
                <svg v-if="loadingAction === 'archive'" class="animate-spin h-5 w-5 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
                Arquivar
            </button>

            <div v-if="errorMsg" class="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {{ errorMsg }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { moderateRelato } from '../../services/moderationService';

const props = defineProps({
    relatoId: { type: String, required: true }
});

const emit = defineEmits(['moderated']);

const isLoading = ref(false);
const loadingAction = ref(null);
const errorMsg = ref('');

const moderate = async (action) => {
    try {
        isLoading.value = true;
        loadingAction.value = action;
        errorMsg.value = '';

        // Call the API service
        const response = await moderateRelato(props.relatoId, action);

        // Emit event up to the page component
        emit('moderated', {
            id: props.relatoId,
            action,
            message: response.message || 'Moderado com sucesso'
        });
    } catch (err) {
        console.error('Moderation error:', err);
        errorMsg.value = err.response?.data?.detail || 'Erro ao moderar o relato. Tente novamente.';
    } finally {
        isLoading.value = false;
        loadingAction.value = null;
    }
};
</script>
