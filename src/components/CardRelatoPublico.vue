<template>
    <article :class="[
        'group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 flex flex-col h-full cursor-pointer',
        index % 4 === 0 ? 'ring-1 ring-emerald-500/20' : ''
    ]">

        <!-- Image Container (Optional & Subtler) -->
        <div class="relative aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-50">
            <!-- Antes Image -->
            <img v-if="relato.thumbnail.antes" :src="relato.thumbnail.antes" alt="Antes"
                class="absolute left-0 bottom-0 w-[60%] h-[90%] object-cover rounded-tr-3xl shadow-sm z-0 transition-transform duration-700 group-hover:scale-105 origin-bottom-left filter grayscale-[30%] group-hover:grayscale-0" />

            <div v-else
                class="absolute left-0 bottom-0 w-[60%] h-[90%] rounded-tr-3xl shadow-sm z-0  bg-gradient-to-br from-[#f0f9f6] to-[#e6f2ef] flex items-center justify-center border-r border-t border-white/50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-800/10" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                        d="M12 2.25c.135 4.314 3.436 7.615 7.75 7.75-4.314.135-7.615 3.436-7.75 7.75-.135-4.314-3.436-7.615-7.75-7.75 4.314-.135 7.615-3.436 7.75-7.75z" />
                </svg>
            </div>

            <!-- Depois Image (Overlapping) -->
            <img v-if="relato.thumbnail.depois" :src="relato.thumbnail.depois" alt="Depois"
                class="absolute right-0 top-0 w-[60%] h-[90%] object-cover rounded-bl-3xl shadow-md z-10 border-4 border-white transition-transform duration-700 group-hover:scale-105 origin-top-right filter grayscale-[30%] group-hover:grayscale-0" />

            <div v-else
                class="absolute right-0 top-0 w-[60%] h-[90%] rounded-bl-3xl shadow-md z-10 border-4 border-white  bg-gradient-to-bl from-[#f0f9f6] to-[#e6f2ef] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-800/10" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
            </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex flex-col flex-grow">
            <!-- Tags (Pills styles) -->
            <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in visibleTags" :key="tag"
                    class="px-3 py-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded-full transition-colors group-hover:bg-emerald-100">
                    {{ tag }}
                </span>
            </div>

            <!-- Two-Layer Title & Excerpt -->
            <div class="mb-4">
                <h3
                    class="font-heading text-lg text-gray-900 leading-snug mb-2 group-hover:text-emerald-800 transition-colors">
                    Relato de experiência
                </h3>
                <p class="text-gray-500 text-sm leading-relaxed italic line-clamp-3 font-serif">
                    "{{ relato.excerpt }}"
                </p>
            </div>

            <!-- CTA -->
            <div class="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <span
                    class="text-sm font-medium text-gray-500 group-hover:text-emerald-700 transition-colors group-hover:underline decoration-emerald-200 underline-offset-4">
                    Ver experiência completa
                </span>
            </div>
        </div>
    </article>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    relato: { type: Object, required: true },
    index: { type: Number, default: 0 }
})

const visibleTags = computed(() => {
    const tags = props.relato.tags || []
    if (tags.length <= 4) return tags
    const shuffled = [...tags].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4)
})
</script>
