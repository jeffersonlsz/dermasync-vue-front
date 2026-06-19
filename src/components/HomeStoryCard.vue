<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
    <!-- Image Header -->
    <div class="aspect-[4/3] overflow-hidden relative">
      <img :src="image" :alt="category" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider text-gray-700 rounded-full uppercase">
          {{ category }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow space-y-4">
      <p class="text-gray-700 italic leading-relaxed flex-grow">
        "{{ excerpt }}"
      </p>

      <!-- Footer -->
      <div class="pt-4 border-t border-gray-50 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary overflow-hidden">
             <img v-if="avatar" :src="avatar" class="w-full h-full object-cover" />
             <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="text-xs">
            <p class="font-bold text-gray-900">{{ author }}</p>
            <p class="text-gray-500">{{ age }} anos</p>
          </div>
        </div>
        
        <RouterLink :to="`/relato/${id}`" class="text-xs font-bold text-gray-900 hover:text-primary transition-colors flex items-center gap-1 group">
          Ler relato 
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: [String, Number],
  image: String,
  category: String,
  excerpt: String,
  author: String,
  age: [String, Number],
  avatar: String
});
</script>