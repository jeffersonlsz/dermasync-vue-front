<template>
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-auto overflow-hidden flex flex-col max-h-[90vh]">

        <!-- Cabeçalho com título e progresso -->
        <div class="px-6 py-5 border-b border-gray-100 bg-white z-10">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-primary/10 rounded-lg text-primary">
                        <i class="bi bi-journal-plus text-xl"></i>
                    </div>
                    <h5 class="text-lg font-bold text-gray-800">Envie sua jornada</h5>
                </div>
                <button @click="$emit('fechar')"
                    class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Progress Bar -->
            <div class="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out rounded-full"
                    :class="{ 'animate-pulse': state.status === 'uploading' }"
                    :style="{ width: isUploading ? state.progress + '%' : percentual + '%' }"></div>
            </div>
            <div class="flex justify-between mt-2 text-xs font-medium text-gray-400">
                <span>Etapa {{ etapa }} de 4</span>
                <span v-if="state.status === 'uploading'">Enviando... {{ state.progress }}%</span>
                <span v-else-if="state.status === 'processing'">Processando...</span>
            </div>
        </div>

        <!-- Conteúdo Scrollável -->
        <div class="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">

            <!-- Etapa 1: Imagens -->
            <transition name="fade" mode="out-in">
                <div v-if="etapa === 1" key="etapa1">
                    <div class="text-center mb-8">
                        <h6 class="text-xl font-bold text-gray-800 mb-2">Envio das Imagens</h6>
                        <p class="text-gray-500 max-w-lg mx-auto">Compartilhe fotos que mostrem a evolução do seu
                            tratamento. É
                            fundamental enviar o "Antes" e o "Depois".</p>
                    </div>

                    <div v-if="state.error"
                        class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
                        <i class="bi bi-exclamation-circle-fill"></i> {{ state.error }}
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Dropzone label="Antes (Obrigatório)" :max="1" :multiple="false"
                            @files-changed="(f) => onFilesChanged('antes', f)" />
                        <Dropzone label="Durante (Opcional)" :max="3" :multiple="true"
                            @files-changed="(f) => onFilesChanged('durante', f)" />
                        <Dropzone label="Depois (Obrigatório)" :max="1" :multiple="false"
                            @files-changed="(f) => onFilesChanged('depois', f)" />
                    </div>
                </div>

                <!-- Etapa 2: Informações -->
                <div v-else-if="etapa === 2" key="etapa2" class="max-w-xl mx-auto">
                    <div class="text-center mb-8">
                        <h6 class="text-xl font-bold text-gray-800 mb-2">Sobre você</h6>
                        <p class="text-gray-500">Ajude outras pessoas a se identificarem com o seu caso.</p>
                    </div>

                    <div v-if="state.error"
                        class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
                        <i class="bi bi-exclamation-circle-fill"></i> {{ state.error }}
                    </div>

                    <div class="space-y-6">
                        <!-- Idade -->
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Idade</label>
                            <input type="number"
                                class="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 py-2.5"
                                v-model="form.idade" placeholder="Ex: 25">
                        </div>

                        <!-- Classificação -->
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Faixa Etária</label>
                            <div class="flex gap-2">
                                <label class="flex-1 cursor-pointer">
                                    <input type="radio" class="peer sr-only" name="classificacao" value="Criança"
                                        v-model="form.classificacao">
                                    <div
                                        class="py-2.5 px-4 text-center rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-focus:ring-2 peer-focus:ring-primary/30">
                                        Criança</div>
                                </label>
                                <label class="flex-1 cursor-pointer">
                                    <input type="radio" class="peer sr-only" name="classificacao" value="Adolescente"
                                        v-model="form.classificacao">
                                    <div
                                        class="py-2.5 px-4 text-center rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-focus:ring-2 peer-focus:ring-primary/30">
                                        Adolescente</div>
                                </label>
                                <label class="flex-1 cursor-pointer">
                                    <input type="radio" class="peer sr-only" name="classificacao" value="Adulto"
                                        v-model="form.classificacao">
                                    <div
                                        class="py-2.5 px-4 text-center rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-focus:ring-2 peer-focus:ring-primary/30">
                                        Adulto</div>
                                </label>
                            </div>
                        </div>

                        <!-- Gênero (form.sexo) -->
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Gênero</label>
                            <select
                                class="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 py-2.5"
                                v-model="form.sexo">
                                <option disabled value="">Selecione...</option>
                                <option>Masculino</option>
                                <option>Feminino</option>
                                <option>Outro</option>
                                <option>Prefiro não dizer</option>
                            </select>
                        </div>

                        <!-- Regiões -->
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Regiões afetadas</label>
                            <div class="flex gap-2 mb-3">
                                <select v-model="regiaoAtual"
                                    class="flex-1 rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 py-2.5">
                                    <option disabled value="">Selecionar região...</option>
                                    <option v-for="op in opcoesRegioes" :key="op" :value="op">{{ op }}</option>
                                </select>
                                <button
                                    class="px-4 py-2 bg-gray-100 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors border border-primary/20"
                                    type="button" @click="adicionarRegiao">
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                            </div>

                            <div
                                class="flex flex-wrap gap-2 min-h-[40px] p-2 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <span
                                    v-if="!form.metadados.regioesAfetadas || form.metadados.regioesAfetadas.length === 0"
                                    class="text-sm text-gray-400 p-1">Nenhuma região adicionada...</span>
                                <span
                                    class="inline-flex items-center gap-1 pl-3 pr-2 py-1 bg-white border border-gray-200 shadow-sm text-gray-700 rounded-full text-sm font-medium"
                                    v-for="(regiao, index) in form.metadados.regioesAfetadas" :key="regiao">
                                    {{ regiao }}
                                    <button
                                        class="p-0.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                                        @click="removerRegiao(index)">
                                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Etapa 3: Relato -->
                <div v-else-if="etapa === 3" key="etapa3" class="max-w-xl mx-auto">
                    <div class="text-center mb-8">
                        <h6 class="text-xl font-bold text-gray-800 mb-2">Seu Relato</h6>
                        <p class="text-gray-500">Compartilhe sua dica ou tratamento. Detalhes ajudam muito!</p>
                    </div>

                    <div v-if="state.error"
                        class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
                        <i class="bi bi-exclamation-circle-fill"></i> {{ state.error }}
                    </div>

                    <div class="relative">
                        <textarea
                            class="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-4 min-h-[200px] text-gray-700 leading-relaxed resize-none"
                            v-model="form.descricao"
                            placeholder="Conte como foi sua experiência, o que funcionou, o que não funcionou. Cite nomes de pomadas, remédios ou mudanças de hábito..."></textarea>
                        <div class="absolute bottom-4 right-4 text-xs text-gray-400">
                            {{ form.descricao.length }} caracteres
                        </div>
                    </div>
                </div>

                <!-- Etapa 4: Finalização -->
                <div v-else-if="etapa === 4" key="etapa4" class="max-w-xl mx-auto">
                    <template
                        v-if="state.status !== 'done' && state.status !== 'processing' && state.status !== 'upload_received'">
                        <div class="text-center mb-8">
                            <h6 class="text-xl font-bold text-gray-800 mb-2">Consentimento</h6>
                            <p class="text-gray-500">Último passo antes de transformar vidas.</p>
                        </div>

                        <div v-if="state.error"
                            class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
                            <i class="bi bi-exclamation-circle-fill"></i> {{ state.error }}
                        </div>

                        <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
                            <label class="flex items-start gap-3 cursor-pointer group">
                                <input
                                    class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/50 mt-0.5 transition-colors"
                                    type="checkbox" v-model="form.consentimento" />
                                <span class="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900">
                                    Declaro que as imagens <strong class="text-gray-900">não expõem meu rosto</strong>
                                    ou dados sensíveis
                                    (documentos, endereços) e aceito a publicação.
                                </span>
                            </label>
                        </div>
                    </template>

                    <template v-else>
                        <div class="text-center py-12 flex flex-col items-center justify-center animate-fadeIn">
                            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <i class="bi bi-check-lg text-4xl text-green-600"></i>
                            </div>
                            <h5 class="text-2xl font-bold text-gray-900 mb-2">
                                {{ state.status === 'done' ? 'Sucesso!' : 'Processando...' }}
                            </h5>
                            <p class="text-gray-500">
                                {{ state.status === 'done' ? 'Sua jornada foi enviada e processada.' :
                                    'Estamos processando seu relato Aguarde um momento.' }}
                            </p>
                            <div v-if="state.relatoId" class="mt-4 text-sm text-gray-400">
                                ID do Relato: {{ state.relatoId }}
                            </div>
                        </div>
                    </template>
                </div>
            </transition>
        </div>

        <!-- Rodapé: Navegação -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button
                class="px-5 py-2.5 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-white border border-transparent hover:border-gray-200 transition-all font-medium text-sm"
                @click="voltarEtapa" :disabled="etapa === 1 || isUploading || isDone"
                :class="{ 'opacity-0 pointer-events-none': etapa === 1 || isDone }">
                Voltar
            </button>

            <div class="flex gap-3">
                <button v-if="!isDone"
                    class="px-6 py-2.5 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary-600 active:scale-95 transition-all font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    @click="etapa < 4 ? avancarEtapa() : onSubmit()" :disabled="isUploading">
                    <span v-if="isUploading" class="flex items-center gap-2">
                        <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Enviando...
                    </span>
                    <span v-else>
                        {{ etapa < 4 ? 'Próximo Passo' : 'Enviar Jornada' }} </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import Dropzone from '../components/Dropzone.vue';
import { getAuthToken } from '../services/auth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const emit = defineEmits(['fechar', 'uploadFinalizado', 'uploadFalhou']);

const state = reactive({
    status: 'idle', // idle | uploading | upload_received | processing | done | error
    progress: 0,
    error: null,
    relatoId: null,
});

const isUploading = computed(() => state.status === 'uploading' || state.status === 'procesing');
const isDone = computed(() => state.status === 'done');

// Formular data model
const form = reactive({
    descricao: '',
    idade: '',
    sexo: '',
    classificacao: '',
    consentimento: false,
    metadados: {
        regioesAfetadas: []
    }
});

// arquivos vindos do Dropzone
const files = reactive({
    antes: [],
    durante: [],
    depois: []
});

const etapa = ref(1);
const percentual = computed(() => (etapa.value - 1) * 33.33 + 25);
const opcoesRegioes = ['Rosto', 'Couro cabeludo', 'Pescoço', 'Axilas',
    'Tronco', 'Barriga', 'Costas', 'Braços',
    'Mãos', 'Pernas', 'Pés', 'Corpo inteiro'];
const regiaoAtual = ref('');

function onFilesChanged(kind, fileList) {
    // kind: 'antes' | 'durante' | 'depois'
    files[kind] = Array.from(fileList);
}

function adicionarRegiao() {
    if (regiaoAtual.value && !form.metadados.regioesAfetadas.includes(regiaoAtual.value)) {
        form.metadados.regioesAfetadas.push(regiaoAtual.value);
        regiaoAtual.value = '';
    }
}

function removerRegiao(index) {
    form.metadados.regioesAfetadas.splice(index, 1);
}

function validarEtapa1() {
    if (files.antes.length === 0 || files.depois.length === 0) {
        state.error = "Você precisa enviar pelo menos as imagens: antes e depois.";
        return false;
    }
    state.error = null;
    return true;
}

function avancarEtapa() {
    if (etapa.value === 1 && !validarEtapa1()) return;

    if (etapa.value < 4) {
        etapa.value++;
        state.error = null;
    }
}

function voltarEtapa() {
    if (etapa.value > 1) {
        etapa.value--;
        state.error = null;
    }
}

async function enviarRelato() {
    state.error = null;

    if (!form.consentimento) {
        state.error = 'Consentimento obrigatório.';
        return;
    }

    // Build payload JSON
    const payload = {
        descricao: form.descricao,
        idade: form.idade,
        sexo: form.sexo,
        classificacao: form.classificacao,
        consentimento: !!form.consentimento,
        metadados: form.metadados
    };

    const formData = new FormData();
    formData.append('payload', JSON.stringify(payload));
    files.antes.forEach(f => formData.append('imagens_antes[]', f));
    files.durante.forEach(f => formData.append('imagens_durante[]', f));
    files.depois.forEach(f => formData.append('imagens_depois[]', f));

    const token = getAuthToken();
    const url = `${API_BASE}/relatos/enviar-relato-completo`;

    state.status = 'uploading';
    state.progress = 0;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) {
                state.progress = Math.round((ev.loaded / ev.total) * 100);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 201 || xhr.status === 200 || xhr.status === 202) {
                try {
                    const resp = JSON.parse(xhr.responseText);
                    state.relatoId = resp.relato_id || resp.id || null;
                    state.status = 'upload_received';
                    resolve(resp);
                } catch (e) {
                    state.status = 'error';
                    state.error = 'Resposta inválida do servidor';
                    reject(e);
                }
            } else {
                state.status = 'error';
                state.error = `Erro ao enviar: ${xhr.status} ${xhr.statusText} ${xhr.responseText}`;
                reject({ status: xhr.status, body: xhr.responseText });
            }
        };

        xhr.onerror = () => {
            state.status = 'error';
            state.error = 'Erro de rede durante upload';
            reject({ status: xhr.status });
        };

        xhr.send(formData);
    });
}

let pollInterval = null;

function startPollingStatus(relatoId, intervalMs = 3000) {
    if (!relatoId) return;
    state.status = 'processing';
    pollInterval = setInterval(async () => {
        try {
            const token = getAuthToken();
            const res = await fetch(`${API_BASE}/relatos/${relatoId}/status`, {
                headers: { Authorization: token ? `Bearer ${token}` : '' }
            });
            if (res.ok) {
                const json = await res.json();
                if (json.status === 'processed' || json.status === 'done') {
                    clearInterval(pollInterval);
                    state.status = 'done';
                    state.progress = 100;

                    emit('uploadFinalizado', relatoId);
                    setTimeout(() => {
                        // Opcional: fechar automaticamente ou deixar usuário ver sucesso
                        // emit('fechar');
                    }, 3000);

                } else if (json.status === 'error') {
                    clearInterval(pollInterval);
                    state.status = 'error';
                    state.error = json.last_error || 'Erro no processamento';
                    emit('uploadFalhou', state.error);
                } else {
                    if (typeof json.progress === 'number' && json.progress > 0) state.progress = json.progress;
                }
            } else {
                console.warn('Status polling retornou', res.status);
            }
        } catch (e) {
            console.error('Polling error', e);
        }
    }, intervalMs);
}

async function onSubmit() {
    try {
        const resp = await enviarRelato();
        startPollingStatus(resp.relato_id || resp.id);
    } catch (err) {
        console.error('Enviar relato erro', err);
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
