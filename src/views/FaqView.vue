<template>
    <BaseLayout>
        <div class="py-24 bg-cream">
            <div class="container mx-auto px-4 max-w-4xl">
                <div class="text-center mb-16">
                    <h1 class="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                        Perguntas Frequentes
                    </h1>
                    <p class="text-xl text-gray-600">
                        Tire suas dúvidas sobre o DermaSync e entenda como nossa comunidade funciona.
                    </p>
                </div>

                <div class="space-y-4">
                    <div v-for="(item, index) in faqItems" :key="index"
                        class="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                        :class="{ 'shadow-md ring-1 ring-primary/20': openIndex === index }">

                        <button @click="toggle(index)"
                            class="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                            <span class="text-lg font-bold text-gray-900 pr-8">{{ item.question }}</span>
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-cream flex items-center justify-center transition-transform duration-300"
                                :class="{ 'rotate-180 bg-primary/10 text-primary': openIndex === index }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500"
                                    :class="{ 'text-primary': openIndex === index }" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        <div v-show="openIndex === index" class="px-6 pb-6 pt-0">
                            <p class="text-gray-600 leading-relaxed text-base border-t border-gray-50 pt-4">
                                {{ item.answer }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mt-16 text-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Ainda tem dúvidas?</h3>
                    <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Não encontrou o que procurava? Entre em contato com nossa equipe de suporte.
                    </p>
                    <a href="#"
                        class="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-primary rounded-full hover:bg-primary-600 transition-colors">
                        Fale Conosco
                    </a>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<script setup>
import { ref } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';

const openIndex = ref(0);

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? -1 : index;
};

const faqItems = [
    {
        question: "O que é o DermaSync e para quem ele foi criado?",
        answer: "O DermaSync é uma plataforma colaborativa que organiza experiências reais de pessoas com dermatite atópica. Ele ajuda usuários a encontrarem relatos semelhantes ao seu caso e entenderem estratégias que funcionaram em situações parecidas. O foco é empoderamento, informação e comunidade — não substitui atendimento médico."
    },
    {
        question: "O DermaSync substitui diagnóstico ou consulta com dermatologista?",
        answer: "Não. O DermaSync não oferece diagnóstico, prescrição ou orientação médica. Ele apresenta padrões de experiência extraídos de relatos voluntários e anônimos. Todo cuidado pessoal deve ser discutido com um profissional de saúde."
    },
    {
        question: "Como funciona a personalização da galeria?",
        answer: "Após enviar um relato, o sistema cruza seus dados com centenas de casos anonimizados usando técnicas de IA e recuperação semântica (RAG). A partir disso, a galeria exibe cards de relatos semelhantes ao seu — por idade, sintomas, região afetada, medicamentos citados e outros padrões extraídos."
    },
    {
        question: "Meu relato fica público? Posso permanecer anônimo?",
        answer: "Sim, você permanece anônimo. O DermaSync aplica um processo automatizado de anonimização que remove informações sensíveis antes de qualquer exibição. Nada é publicado com seu nome, rosto ou dados pessoais de identificação."
    },
    {
        question: "O que acontece depois que eu envio uma imagem e um relato?",
        answer: "O envio gera imediatamente um card básico na galeria. Em segundo plano, nosso sistema processa o texto, extrai metadados, cria um microdepoimento e identifica tags relevantes. Assim que o processamento termina, o card é atualizado automaticamente."
    },
    {
        question: "O DermaSync é gratuito?",
        answer: "Sim. Toda a navegação pública e o envio de relatos são gratuitos. Recursos avançados podem ser adicionados futuramente, mas a versão inicial permanece 100% acessível."
    },
    {
        question: "Por que vocês oferecem um e-book como agradecimento pelos primeiros relatos?",
        answer: "O e-book é um gesto de reconhecimento pelo apoio inicial à plataforma. Ele não é isca digital — é um agradecimento concreto para quem contribui com informações que ajudam a construir a comunidade."
    },
    {
        question: "Como vocês garantem a segurança dos dados enviados?",
        answer: "Usamos criptografia, anonimização assistida por IA e armazenamento segmentado (metadados separados de imagens). Nada é compartilhado com terceiros e nenhum dado sensível é utilizado para treinar modelos externos."
    },
    {
        question: "Preciso criar conta para ver a galeria?",
        answer: "A versão pública mostra um snippet seguro com alguns cards anonimizados. Para visualizar a experiência completa, incluindo casos semelhantes ao seu, é necessário criar uma conta gratuita."
    },
    {
        question: "A plataforma usa IA para dar recomendações? Isso é confiável?",
        answer: "A IA não recomenda tratamentos. Ela apenas organiza e agrupa relatos reais, tornando mais fácil identificar estratégias que outras pessoas já tentaram. A decisão final é sempre do usuário, de preferência junto a um profissional de saúde."
    }
];
</script>
