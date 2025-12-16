<template>
    <div
        class="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
        <!-- Thumbnails -->
        <div v-if="hasImages" class="grid grid-cols-2 gap-0">
            <div class="relative">
                <img :src="relato.image_previews.before" alt="Antes" class="w-full h-40 object-cover" />
                <span class="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                    Antes
                </span>
            </div>

            <div class="relative">
                <img :src="relato.image_previews.after" alt="Depois" class="w-full h-40 object-cover" />
                <span class="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                    Depois
                </span>
            </div>
        </div>

        <!-- Conteúdo -->
        <div class="p-5 space-y-3">
            <!-- Meta -->
            <div class="flex flex-wrap gap-2 text-xs text-gray-500">
                <span v-if="relato.age_range" class="bg-gray-100 px-2 py-1 rounded-full">
                    {{ relato.age_range }}
                </span>
                <span v-if="relato.duration" class="bg-gray-100 px-2 py-1 rounded-full">
                    {{ relato.duration }}
                </span>
            </div>

            <!-- Excerpt -->
            <p class="text-gray-800 text-sm leading-relaxed">
                {{ relato.excerpt }}
            </p>

            <!-- Tags -->
            <div v-if="relato.tags?.length" class="flex flex-wrap gap-2 pt-2">
                <span v-for="tag in relato.tags" :key="tag"
                    class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {{ tag }}
                </span>
            </div>
        </div>

        <!-- Hover CTA -->
        <div class="px-5 pb-4 text-sm text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Ver relato completo →
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    relato: {
        type: Object,
        required: true
    }
})

const hasImages = computed(() => {
    return (
        props.relato.image_previews &&
        (props.relato.image_previews.before || props.relato.image_previews.after)
    )
})
</script>
