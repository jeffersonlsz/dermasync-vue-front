<template>
    <article
        class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 flex flex-col h-full cursor-pointer">
        <!-- Image Container -->
        <!-- Image Container -->
        <div class="relative h-48 overflow-hidden bg-gray-100">
            <!-- Antes Image -->
            <img v-if="relato.thumbnail.antes" :src="relato.thumbnail.antes" alt="Antes"
                class="absolute left-0 bottom-0 w-[70%] h-[85%] object-cover rounded-tr-xl shadow-sm z-0 transition-transform duration-500 group-hover:scale-105 origin-bottom-left" />

            <div v-else
                class="absolute left-0 bottom-0 w-[70%] h-[85%] rounded-tr-xl shadow-sm z-0 transition-transform duration-500 group-hover:scale-105 origin-bottom-left bg-gradient-to-br from-[#f0f9f6] to-[#e6f2ef] flex items-center justify-center border-r border-t border-white/50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-800/20" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                        d="M12 2.25c.135 4.314 3.436 7.615 7.75 7.75-4.314.135-7.615 3.436-7.75 7.75-.135-4.314-3.436-7.615-7.75-7.75 4.314-.135 7.615-3.436 7.75-7.75z" />
                </svg>
            </div>

            <!-- Depois Image (Overlapping) -->
            <img v-if="relato.thumbnail.depois" :src="relato.thumbnail.depois" alt="Depois"
                class="absolute right-0 top-0 w-[70%] h-[85%] object-cover rounded-bl-xl shadow-lg z-10 border-4 border-white transition-transform duration-500 group-hover:scale-105 origin-top-right" />

            <div v-else
                class="absolute right-0 top-0 w-[70%] h-[85%] rounded-bl-xl shadow-lg z-10 border-4 border-white transition-transform duration-500 group-hover:scale-105 origin-top-right bg-gradient-to-bl from-[#f0f9f6] to-[#e6f2ef] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-emerald-800/20" viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
            </div>

            <!-- Overlay gradient (simplified) -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            </div>
        </div>

        <!-- Content -->
        <div class="p-5 flex flex-col flex-grow">
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-3 h-[52px] content-start overflow-hidden">
                <span v-for="tag in visibleTags" :key="tag"
                    class="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/5 rounded-full">
                    {{ tag }}
                </span>
            </div>

            <!-- Excerpt -->
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow font-sans">
                {{ relato.excerpt }}
            </p>

            <!-- Read More Indicator -->
            <div class="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <span class="text-xs font-semibold text-gray-400 group-hover:text-primary transition-colors">Ler relato
                    completo</span>
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </article>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    relato: { type: Object, required: true }
})

const visibleTags = computed(() => {
    const tags = props.relato.tags || []
    if (tags.length <= 5) return tags

    // Return a random 5 tags
    // Cloning to avoid mutating prop if we were sorting in place, though toSorted/sort returns new potentially
    // Simple shuffle
    const shuffled = [...tags].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 5)
})
</script>
