<script setup>
import { ref, onMounted } from "vue"
import CardRelatoPublico from "@/components/CardRelatoPublico.vue"
import BaseLayout from "../layouts/BaseLayout.vue"

const API_URL = import.meta.env.VITE_API_URL

const relatos = ref([])
const loading = ref(true)
const error = ref(null)

// ------------------------------
// Fetch galeria pública v3
// ------------------------------
async function carregarGaleria() {
  try {
    const res = await fetch(
      `${API_URL}/relatos/galeria/public/v3?limit=12&page=1`
    )
    if (!res.ok) throw new Error("Erro ao carregar galeria pública")

    const data = await res.json()
    const items = data.dados || []

    // Transform items to ensure thumbnails
    relatos.value = items.map(item => {
      const thumb = item.thumbnail || {}
      return {
        ...item,
        thumbnail: {
          antes: thumb.antes || null,
          depois: thumb.depois || null
        }
      }
    })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarGaleria()
})
</script>

<template>
  <BaseLayout>
    <section class="container mx-auto px-4 pt-16 pb-12 text-center max-w-3xl">
      <h2 class="font-heading text-3xl md:text-4xl text-emerald-900 mb-4 tracking-tight">
        Relatos reais de pessoas convivendo com dermatite atópica.
      </h2>
      <p class="text-lg text-gray-600 leading-relaxed font-light">
        Aqui você encontra histórias de superação, desafios e aprendizados.
        Um espaço seguro para entender que você não está sozinho nessa jornada.
      </p>
    </section>

    <section class="container mx-auto px-4 pb-16">
      <div v-if="loading" class="text-center py-12 text-gray-500">Carregando relatos...</div>
      <div v-else-if="error" class="text-center py-12 text-red-500">Erro: {{ error }}</div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        <CardRelatoPublico v-for="(relato, index) in relatos" :key="relato.id" :relato="relato" :index="index" />
      </div>
    </section>

    <section class="container mx-auto px-4 py-16 text-center max-w-xl border-t border-gray-50">
      <h3 class="text-2xl font-heading text-emerald-900 mb-4">Sua história também importa</h3>
      <p class="text-gray-600 mb-8 leading-relaxed">
        Compartilhar sua experiência pode ajudar outras pessoas a se sentirem mais acolhidas.
        Você tem total controle sobre o que deseja dividir.
      </p>
      <a href="#"
        class="inline-flex items-center text-emerald-700 font-medium hover:text-emerald-900 hover:underline transition-colors">
        <span>Gostaria de compartilhar meu relato</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </a>
    </section>
  </BaseLayout>
</template>
