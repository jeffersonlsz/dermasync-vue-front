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
    <section class="container mx-auto px-4 pt-24 pb-12">
      <div v-if="loading" class="text-center py-12 text-gray-500">Carregando relatos...</div>
      <div v-else-if="error" class="text-center py-12 text-red-500">Erro: {{ error }}</div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        <CardRelatoPublico v-for="relato in relatos" :key="relato.id" :relato="relato" />
      </div>
    </section>
  </BaseLayout>
</template>
