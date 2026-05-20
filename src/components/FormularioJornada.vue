<template>
    <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden flex flex-col max-h-[85vh] transition-all">

        <!-- Cabeçalho (Fixo) -->
        <div class="px-8 py-6 border-b border-gray-100 bg-white z-20 flex justify-between items-center">
            <div>
                <h5 class="text-xl font-bold text-gray-800">Nova Jornada</h5>
                <div class="text-sm text-gray-400 mt-0.5 flex items-center gap-2">
                    <span v-if="!isTerminalState">Etapa {{ step }} de 4</span>
                    <span v-else>Concluído</span>
                    <div v-if="!isTerminalState" class="h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full bg-primary transition-all duration-300"
                            :style="{ width: `${(step / 4) * 100}%` }"></div>
                    </div>
                </div>
            </div>
            <button @click="$emit('fechar')"
                class="text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-all">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Conteúdo Scrollável -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden p-8 bg-white relative">

            <!-- TRANSIÇÕES DE STEPS -->
            <transition name="fade-slide" mode="out-in">

                <!-- TERMINAL STATES (Sucesso/Erro) -->
                <div v-if="isTerminalState" key="terminal"
                    class="h-full flex flex-col items-center justify-center text-center">

                    <div v-if="state.progress?.is_complete" class="animate-in fade-in zoom-in duration-300">
                        <div
                            class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="bi bi-check-lg text-4xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">Jornada Enviada!</h3>
                        <p class="text-gray-500 mb-8 max-w-sm mx-auto">
                            Sua jornada foi enviada com sucesso! Aguarde para ver o resultado da sua análise. Obrigado
                            pela
                            visita!
                        </p>
                        <button @click="$emit('fechar')"
                            class="px-8 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary-600 transition-all font-bold text-sm">
                            Fechar
                        </button>
                    </div>

                    <div v-else-if="state.progress?.has_error" class="animate-in fade-in zoom-in duration-300">
                        <div
                            class="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="bi bi-x-lg text-4xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-red-700 mb-2">Ops, algo falhou</h3>
                        <p class="text-gray-600 mb-8 max-w-sm mx-auto">
                            Não conseguimos processar seu envio. Tente novamente mais tarde.
                        </p>
                    </div>

                    <!-- LOADING STATE (Se ainda estiver processando visualmente antes de fechar) -->
                    <div v-else class="animate-pulse">
                        <div
                            class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="animate-spin text-2xl"><i class="bi bi-arrow-repeat"></i></span>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Processando...</h3>
                    </div>
                </div>

                <!-- STEP 1: IMAGENS -->
                <div v-else-if="step === 1" key="step1" class="space-y-6">
                    <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Vamos começar pelas fotos</h2>
                        <p class="text-gray-500">Mostre a transformação. Você precisa de pelo menos uma foto de "Antes"
                            e uma de "Depois".</p>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <Dropzone label="Antes (Obrigatório)" :max="1" :multiple="false"
                                @files-changed="(f: any) => onFilesChanged('antes', f)" />
                            <div class="text-xs text-right mt-1 font-medium"
                                :class="files.antes.length ? 'text-green-600' : 'text-gray-400'">
                                {{ files.antes.length }} foto(s) selecionada(s)
                            </div>
                        </div>

                        <div>
                            <Dropzone label="Depois (Obrigatório)" :max="1" :multiple="false"
                                @files-changed="(f: any) => onFilesChanged('depois', f)" />
                            <div class="text-xs text-right mt-1 font-medium"
                                :class="files.depois.length ? 'text-green-600' : 'text-gray-400'">
                                {{ files.depois.length }} foto(s) selecionada(s)
                            </div>
                        </div>

                        <div class="pt-2">
                            <div class="flex items-center gap-4 relative">
                                <div class="flex-1 h-px bg-gray-100"></div>
                                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Opcional</span>
                                <div class="flex-1 h-px bg-gray-100"></div>
                            </div>
                        </div>

                        <Dropzone label="Durante o tratamento (Opcional)" :max="3" :multiple="true"
                            @files-changed="(f: any) => onFilesChanged('durante', f)" />
                    </div>
                </div>

                <!-- STEP 2: SOBRE VOCÊ -->
                <div v-else-if="step === 2" key="step2" class="space-y-8">
                    <div class="text-center">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Sobre você</h2>
                        <p class="text-gray-500">Dados demográficos ajudam pessoas parecidas com você a se
                            identificarem.</p>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                        <!-- Idade -->
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Sua Idade</label>
                            <input type="number"
                                class="w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 py-3 px-4 bg-white"
                                v-model="form.idade" placeholder="Ex: 25">
                        </div>

                        <!-- Sexo -->
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Gênero</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label v-for="opt in ['Feminino', 'Masculino', 'Outro', 'Prefiro não dizer']" :key="opt"
                                    class="cursor-pointer relative">
                                    <input type="radio" v-model="form.sexo" :value="opt" class="peer sr-only">
                                    <div
                                        class="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 text-center text-sm font-medium hover:bg-gray-50 transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary peer-checked:font-bold">
                                        {{ opt }}
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Regiões -->
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Regiões Afetadas</label>
                            <div class="flex gap-2 mb-3">
                                <select v-model="regiaoAtual"
                                    class="flex-1 rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 py-2.5 px-3 bg-white">
                                    <option disabled value="">Adicionar região...</option>
                                    <option v-for="op in opcoesRegioes" :key="op" :value="op">{{ op }}</option>
                                </select>
                                <button
                                    class="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors shadow-md shadow-primary/20 disabled:opacity-50"
                                    type="button" @click="adicionarRegiao" :disabled="!regiaoAtual">
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="(regiao, index) in form.metadados.regioesAfetadas" :key="regiao"
                                    class="inline-flex items-center gap-1 pl-3 pr-2 py-1 bg-white border border-gray-200 shadow-sm text-gray-700 rounded-lg text-sm font-medium">
                                    {{ regiao }}
                                    <button class="p-0.5 hover:text-red-500 rounded-md transition-colors"
                                        @click="removerRegiao(index)">
                                        <i class="bi bi-x"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- STEP 3: RELATO -->
                <div v-else-if="step === 3" key="step3" class="space-y-6">
                    <div class="text-center">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Conte sua história</h2>
                        <p class="text-gray-500">O que funcionou para você? Que produtos usou?</p>
                    </div>

                    <div class="relative">
                        <textarea
                            class="w-full rounded-2xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-5 min-h-[300px] text-gray-700 leading-relaxed resize-none text-base"
                            v-model="form.descricao"
                            placeholder="Escreva aqui seu relato... Detalhes fazem a diferença."></textarea>
                        <div class="absolute bottom-4 right-4 text-xs font-medium"
                            :class="form.descricao.length >= 10 ? 'text-primary' : 'text-red-400'">
                            {{ form.descricao.length }} caracteres (mín. 10)
                        </div>
                    </div>
                </div>

                <!-- STEP 4: CONSENTIMENTO E ENVIO -->
                <div v-else-if="step === 4" key="step4"
                    class="h-full flex flex-col items-center justify-center text-center space-y-8">

                    <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-2">
                        <i class="bi bi-shield-check text-3xl"></i>
                    </div>

                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Quase lá!</h2>
                        <p class="text-gray-500 max-w-md mx-auto">Para publicar, precisamos que você confirme que as
                            imagens são seguras.</p>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 max-w-md mx-auto text-left cursor-pointer hover:bg-gray-100 transition-colors"
                        @click="form.consentimento = !form.consentimento">
                        <label class="flex items-start gap-4 cursor-pointer pointer-events-none">
                            <input class="w-6 h-6 rounded-lg border-gray-300 text-primary focus:ring-primary/50 mt-0.5"
                                type="checkbox" v-model="form.consentimento" />
                            <span class="text-sm text-gray-700 leading-relaxed font-medium">
                                Declaro que as imagens <strong class="text-gray-900">não expõem meu rosto</strong>
                                ou dados sensíveis (documentos, endereços) e aceito a publicação no portal Dermasync.
                            </span>
                        </label>
                    </div>

                    <!-- Erros de Upload -->
                    <div v-if="state.error"
                        class="max-w-md mx-auto w-full p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm flex items-center gap-3">
                        <i class="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
                        {{ state.error }}
                    </div>
                </div>

            </transition>
        </div>

        <!-- Rodapé: Navegação (Fixo) -->
        <div v-if="!isTerminalState"
            class="px-8 py-5 border-t border-gray-100 bg-gray-50 z-20 flex justify-between items-center">

            <!-- Botão Voltar -->
            <button v-if="step > 1" @click="step--"
                class="px-6 py-2.5 rounded-xl text-gray-500 font-bold hover:bg-gray-200 transition-colors text-sm">
                Voltar
            </button>
            <div v-else class="w-2"></div> <!-- Spacer -->

            <!-- Botão Avançar / Enviar -->
            <button
                class="px-8 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary-600 active:scale-95 transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none min-w-[140px] flex justify-center items-center gap-2"
                @click="handleNextAction" :disabled="!canProceed || isUploading">

                <span v-if="isUploading">
                    <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </span>
                <span v-else>
                    {{ step === 4 ? 'Confirmar Envio' : 'Continuar' }}
                </span>
                <i v-if="!isUploading && step < 4" class="bi bi-arrow-right"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue'
import Dropzone from './Dropzone.vue'
import api from '../lib/api'

// Tipos
type UXEffect = { channel: string; severity: string; message: string }
type RelatoProgressStep = { key: string; label: string; state: "pending" | "running" | "done" | "error" }
type RelatoProgressUI = {
    relato_id: string; status: string; steps: RelatoProgressStep[];
    has_error: boolean; is_complete: boolean; error_message?: string | null
}

// Config
const emit = defineEmits(['fechar', 'sucesso'])

// State UI
const step = ref(1)

// State Logic
const state = reactive({
    status: 'idle' as 'idle' | 'uploading' | 'error',
    progressPct: 0,
    error: null as string | null,
    relatoId: null as string | null,
    uxEffects: [] as UXEffect[],
    progress: null as RelatoProgressUI | null
})

const isUploading = computed(() => state.status === 'uploading')
const isTerminalState = computed(() => !!state.progress?.is_complete || !!state.progress?.has_error)
const isProcessing = computed(() => !!state.relatoId && state.status !== 'error')

// Form Data
const form = reactive({
    descricao: '',
    idade: '',
    sexo: '',
    classificacao: '',
    consentimento: false,
    metadados: { regioesAfetadas: [] as string[] }
})

const files = reactive({
    antes: [] as File[],
    durante: [] as File[],
    depois: [] as File[]
})

const regiaoAtual = ref('')
const opcoesRegioes = ['Rosto', 'Couro cabeludo', 'Pescoço', 'Axilas', 'Tronco', 'Barriga', 'Costas', 'Braços', 'Mãos', 'Pernas', 'Pés', 'Corpo inteiro']

// Funções de Auxílio UI
function onFilesChanged(kind: 'antes' | 'durante' | 'depois', fileList: FileList | File[]) {
    // Garantir reatividade criando um novo array
    const newFiles = Array.isArray(fileList) ? fileList : Array.from(fileList as FileList)
    files[kind] = [...newFiles]
}

function adicionarRegiao() {
    if (regiaoAtual.value && !form.metadados.regioesAfetadas.includes(regiaoAtual.value)) {
        form.metadados.regioesAfetadas.push(regiaoAtual.value)
        regiaoAtual.value = ''
    }
}

function removerRegiao(index: number) {
    form.metadados.regioesAfetadas.splice(index, 1)
}

// Stepper Logic
const canProceed = computed(() => {
    if (step.value === 1) return files.antes.length > 0 && files.depois.length > 0
    if (step.value === 2) return true // Sem validação estrita para Step 2 (opcional)
    if (step.value === 3) return form.descricao.length >= 10
    if (step.value === 4) return form.consentimento
    return false
})

function handleNextAction() {
    if (!canProceed.value) return

    if (step.value < 4) {
        step.value++
    } else {
        onSubmit()
    }
}

// Lógica de Submit (Mantida do Refactor Anterior)
async function triggerSubmit() {
    if (!state.relatoId) return

    try {
        const { data } = await api.post(`/relatos/${state.relatoId}/submit`)
        if (data.ux_effects && Array.isArray(data.ux_effects)) {
            state.uxEffects = [...state.uxEffects, ...data.ux_effects]
        }

        // Atualizar estado para sucesso visual
        state.progress = {
            relato_id: state.relatoId,
            status: 'done',
            steps: [],
            has_error: false,
            is_complete: true,
            error_message: null
        }

        // Emitir sucesso com ID para a Galeria adicionar o card
        emit('sucesso', { id: state.relatoId, message: 'Seu relato foi recebido.' })
        // Não fechamos mais automaticamente. O usuário fecha no botão da modal.
    } catch (err: any) {
        console.error("Erro no submit automático:", err)
        state.error = "Erro ao iniciar processamento. Tente novamente."
    }
}

async function onSubmit() {
    if (state.relatoId) return

    state.error = null
    state.status = 'uploading'
    state.progressPct = 0
    state.uxEffects = []

    const payload = {
        descricao: form.descricao,
        idade: form.idade ? String(form.idade) : undefined,
        sexo: form.sexo || undefined,
        classificacao: form.classificacao || undefined,
        consentimento: form.consentimento,
        metadados: { regioesAfetadas: form.metadados.regioesAfetadas ?? [] }
    }

    const formData = new FormData()
    formData.append('payload', JSON.stringify(payload))
    files.antes.forEach(f => formData.append('imagens_antes', f))
    files.durante.forEach(f => formData.append('imagens_durante', f))
    files.depois.forEach(f => formData.append('imagens_depois', f))

    try {
        const response = await api.post('/relatos/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    state.progressPct = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            },
        });
        
        const resp = response.data;

        state.status = 'idle'
        state.relatoId = resp.data?.relato_id || null
        if (resp.ux_effects && Array.isArray(resp.ux_effects)) state.uxEffects = resp.ux_effects

        if (state.relatoId) {
            await triggerSubmit()
        }

    } catch (error: any) {
        state.status = 'error'
        state.error = typeof error === 'string' ? error : 'Ocorreu um erro ao enviar.'
    }
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
