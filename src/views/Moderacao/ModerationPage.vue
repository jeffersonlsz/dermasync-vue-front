<template>
    <div class="min-h-screen bg-gray-50 pt-16">
        <div class="h-[calc(100vh-64px)] overflow-hidden flex max-w-[1920px] mx-auto bg-white shadow-xl">

            <!-- Fila de Relatos -->
            <ModerationQueue :relatos="pendingRelatos" :selectedId="selectedRelatoId" :isLoading="isLoadingQueue"
                @select="handleSelectRelato" class="w-1/3 min-w-[320px] max-w-[420px] border-r border-gray-200" />

            <!-- Area Principal: Preview + Ações ou Empty State -->
            <div v-if="selectedRelatoId" class="flex-1 flex overflow-hidden">
                <ModerationPreview :relatoId="selectedRelatoId" class="flex-1" />

                <ModerationActions :relatoId="selectedRelatoId" @moderated="handleModerated"
                    class="w-80 min-w-[320px] shrink-0 border-l border-gray-200 bg-gray-50" />
            </div>

            <!-- Empty State: Nenhuma seleção -->
            <div v-else class="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 bg-gray-50">
                <div class="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-700 mb-2">Nenhum relato selecionado</h2>
                <p class="text-gray-500 max-w-md text-center">Selecione um relato na fila ao lado para ver os detalhes
                    completos e executar as ações de moderação.</p>
            </div>
        </div>

        <!-- Toast de Notificação -->
        <div v-if="toast.show"
            class="fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 transform transition-all duration-300 z-50 pointer-events-none"
            :class="[
                toast.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            ]">
            <svg v-if="toast.type === 'success'" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <svg v-else class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="font-medium font-sans">{{ toast.message }}</span>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../../components/Navbar.vue';
import ModerationQueue from '../../components/Moderacao/ModerationQueue.vue';
import ModerationPreview from '../../components/Moderacao/ModerationPreview.vue';
import ModerationActions from '../../components/Moderacao/ModerationActions.vue';
import { getPendingRelatos } from '../../services/moderationService';

const pendingRelatos = ref([]);
const selectedRelatoId = ref(null);
const isLoadingQueue = ref(true);

const toast = ref({
    show: false,
    message: '',
    type: 'success'
});

const showToast = (message, type = 'success') => {
    toast.value = { show: true, message, type };
    setTimeout(() => {
        toast.value.show = false;
    }, 3000);
};

const fetchQueue = async () => {
    try {
        isLoadingQueue.value = true;
        const data = await getPendingRelatos();
        pendingRelatos.value = data || [];
    } catch (err) {
        console.error('Failed to load queue', err);
        showToast('Erro ao carregar a fila de moderação', 'error');
    } finally {
        isLoadingQueue.value = false;
    }
};

const handleSelectRelato = (relato) => {
    selectedRelatoId.value = relato.id;
};

const handleModerated = ({ id, action, message }) => {
    // Show success toast
    showToast(message || `Relato moderado com ação: ${action}`);

    // Remove from queue
    pendingRelatos.value = pendingRelatos.value.filter(r => r.id !== id);

    // Clear selection
    if (selectedRelatoId.value === id) {
        selectedRelatoId.value = null;
    }
};

onMounted(() => {
    fetchQueue();
});
</script>
