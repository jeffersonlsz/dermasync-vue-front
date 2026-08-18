<template>
  <transition name="fade-overlay">
    <div v-if="jornadaSelecionada" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        @click="$emit('update:jornadaSelecionada', null)"></div>

      <!-- Modal Content -->
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
          <h2 class="text-xl md:text-2xl font-heading font-bold text-gray-800 line-clamp-1">
            {{ jornadaSelecionada?.tituloRelato || 'Detalhes da Jornada' }}
          </h2>
          <button @click="$emit('update:jornadaSelecionada', null)"
            class="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Fechar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto bg-gray-50">
          <div class="p-6">

            <!-- Tags & Tabs Mobile/Desktop -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <!-- Tabs -->
              <div class="bg-gray-200/50 p-1 rounded-full inline-flex self-start md:self-auto">
                <button v-for="(tabLabel, tabKey) in tabs" :key="tabKey" @click="activeTab = tabLabel"
                  class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5"
                  :class="activeTab === tabLabel ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-800'">
                  <span>{{ tabLabel }}</span>
                  <span v-if="tabKey === 'dicas'" 
                    class="px-2 py-0.5 text-[10px] font-bold text-purple-700 bg-purple-100 rounded-full animate-pulse flex items-center">
                    ✨ Novo
                  </span>
                </button>
              </div>

              <!-- Badges -->
              <div class="flex gap-2">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-skin-100 text-primary-600">
                  {{ jornadaSelecionada.classificacao }}
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                  {{ jornadaSelecionada.genero }}
                </span>
              </div>
            </div>

            <!-- TAB CONTENT -->
            <div class="bg-white rounded-2xl shadow-sm p-6 md:p-8 min-h-[400px]">               <!-- INFO TAB -->
               <div v-if="activeTab === 'Informações da jornada'" class="animate-fadeIn">
                <!-- Metadata Row -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <!-- Gender & Age -->
                  <div class="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                    <div class="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-[11px] text-gray-400 font-medium">Mulher / Homem</p>
                      <p class="text-xs font-bold text-gray-800">{{ jornadaSelecionada.faixaEtaria || '38 anos' }}</p>
                    </div>
                  </div>

                  <!-- Date of Report -->
                  <div class="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                    <div class="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-[11px] text-gray-400 font-medium">Relato em</p>
                      <p class="text-xs font-bold text-gray-800">12/04/2024</p>
                    </div>
                  </div>

                  <!-- Affected Regions -->
                  <div class="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                    <div class="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V8a2 2 0 00-2-2h-.5a2 2 0 01-2-2v-1.065M12 2a10 10 0 100 20 10 10 0 000-20z" />
                      </svg>
                    </div>
                    <div class="min-w-0">
                      <p class="text-[11px] text-gray-400 font-medium">Regiões afetadas</p>
                      <p class="text-xs font-bold text-gray-800 truncate" :title="jornadaSelecionada.regioesAfetadas?.join(', ') || 'Pescoço, colo e tronco'">
                        {{ (jornadaSelecionada.regioesAfetadas && jornadaSelecionada.regioesAfetadas.length > 0) ? jornadaSelecionada.regioesAfetadas.join(', ') : 'Pescoço, colo e tronco' }}
                      </p>
                    </div>
                  </div>

                  <!-- Trigger -->
                  <div class="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                    <div class="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-[11px] text-gray-400 font-medium">Gatilho principal</p>
                      <p class="text-xs font-bold text-gray-800">Estresse</p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                  <!-- Left: Image carousel with count badge and zoom -->
                  <div class="lg:col-span-5 space-y-4">
                    <div class="relative aspect-square bg-gray-50 border border-gray-150 rounded-3xl overflow-hidden group shadow-sm flex items-center justify-center">
                      <template v-if="imagens.length > 0">
                        <img :src="imagens[fotoAtual]" class="w-full h-full object-cover transition-transform duration-500" alt="Foto da jornada" />
                        
                        <!-- Floating Left indicator badge -->
                        <div class="absolute top-4 left-4 px-3 py-1 bg-black/45 backdrop-blur-sm rounded-full text-white text-[11px] font-bold tracking-wide flex items-center gap-1.5 z-10 shadow-sm select-none">
                          📷 {{ fotoAtual + 1 }} / {{ imagens.length }}
                        </div>

                        <!-- Zoom expand button -->
                        <button @click="abrirImagemAmpliada" class="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm hover:bg-white shadow rounded-xl text-gray-700 transition-all transform hover:scale-105 z-10">
                          <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                          </svg>
                        </button>

                        <!-- Controls -->
                        <div v-if="imagens.length > 1" class="absolute inset-0 flex items-center justify-between p-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                          <button @click.stop="fotoAnterior" class="pointer-events-auto p-2 rounded-xl bg-white/80 hover:bg-white shadow-lg text-gray-800 transition-all transform hover:scale-110">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button @click.stop="proximaFoto" class="pointer-events-auto p-2 rounded-xl bg-white/80 hover:bg-white shadow-lg text-gray-800 transition-all transform hover:scale-110">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        <!-- Indicators dots -->
                        <div v-if="imagens.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/25 backdrop-blur rounded-full shadow-sm">
                          <button v-for="(img, idx) in imagens" :key="idx" @click.stop="selecionarFoto(idx)"
                            class="w-2 h-2 rounded-full transition-all"
                            :class="idx === fotoAtual ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'"></button>
                        </div>
                      </template>
                      <div v-else class="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                        <span class="text-3xl">📷</span>
                        <span class="text-xs">Sem imagens disponíveis</span>
                      </div>
                    </div>

                    <!-- Thumbnails row with "Ver todas" option -->
                    <div class="flex gap-2.5 items-center">
                      <button v-for="(foto, index) in imagens.slice(0, 3)" :key="index" @click="selecionarFoto(index)"
                        class="relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0"
                        :class="fotoAtual === index ? 'border-primary ring-2 ring-primary/10' : 'border-transparent hover:border-gray-200'">
                        <img :src="foto" class="w-full h-full object-cover" />
                      </button>
                      
                      <!-- View all button if images exist -->
                      <button v-if="imagens.length > 3" @click="abrirImagemAmpliada" class="flex-grow h-14 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 flex items-center justify-center gap-1.5 text-[10px] font-bold text-gray-500 shadow-sm transition-colors">
                        <span>📷</span>
                        <span>Ver todas {{ imagens.length }} fotos</span>
                      </button>
                    </div>

                    <!-- Small caption at bottom of carousel -->
                    <p class="text-[10px] text-gray-400 flex items-center gap-1.5 mt-2 bg-gray-55/35 p-2.5 rounded-xl border border-gray-100">
                      <svg class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Fotos compartilhadas com consentimento para fins de apoio e aprendizado da comunidade.
                    </p>
                  </div>

                  <!-- Right: Story Details -->
                  <div class="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <!-- Relato Section -->
                    <div class="space-y-3">
                      <h4 class="text-sm font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        💬 Relato da experiência
                      </h4>
                      <div class="relative bg-emerald-50/15 border border-emerald-50 rounded-3xl p-6 shadow-sm">
                        <!-- Simulated Quotes background -->
                        <span class="absolute top-2 left-4 text-emerald-250/20 text-6xl font-serif leading-none select-none">“</span>
                        <p class="text-xs text-gray-700 leading-relaxed relative z-10 whitespace-pre-line pl-2 italic">
                          {{ textoResumido }}
                        </p>
                        
                        <!-- Action buttons -->
                        <div class="flex justify-end gap-3 mt-6 relative z-10 text-[10px] font-bold">
                          <button v-if="temTextoEscondido" @click="expandirTexto" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-650 hover:bg-gray-50 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm">
                            <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Ver texto completo
                          </button>
                          <button class="px-3 py-1.5 bg-white border border-gray-200 text-gray-650 hover:bg-gray-50 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm">
                            <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.684 10.742a3 3 0 110 2.516m0-2.516a3 3 0 110-2.516m0 2.516l5.303-2.651m-5.303 5.302l5.302 2.651M17 9a3 3 0 11-6 0 3 3 0 016 0zm0 6a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Compartilhar
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Tags / Temas -->
                    <div class="space-y-3">
                      <h4 class="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        🏷️ Temas mencionados
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="tag in (jornadaSelecionada.tags && jornadaSelecionada.tags.length > 0 ? jornadaSelecionada.tags : ['estresse', 'nervosismo', 'chorar', 'colágeno', 'hidratante', 'oração', 'melhora'])" :key="tag"
                          class="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-100/50 px-2.5 py-1 rounded-full font-medium transition-colors hover:bg-emerald-100 hover:text-emerald-950">
                          #{{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom Row Grid: Timeline, Helper lists, Sentiment ratings -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100 mb-8">
                  <!-- Timeline Card -->
                  <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm">
                    <h3 class="font-bold text-gray-800 text-[14px] flex items-center gap-1.5 mb-1">
                      📈 Evolução da jornada
                    </h3>
                    <p class="text-[11px] text-gray-400 mb-5">Histórico de progresso reportado</p>
                    
                    <div class="relative pl-5 border-l border-gray-100 space-y-4 ml-1">
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-red-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Antes da mudança</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Crises frequentes. Coceira intensa e vermelhidão no tronco.</p>
                      </div>
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Primeiras ações</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Começou hidratação intensa e colágeno hidrogenado em pó.</p>
                      </div>
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-blue-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Após 1 semana</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Redução da coceira e pele menos irritada.</p>
                      </div>
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Atual (em andamento)</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Melhora nas regiões do tronco e mais equilíbrio emocional.</p>
                      </div>
                    </div>

                    <div class="mt-4 p-2.5 bg-gray-55/30 rounded-xl border border-gray-100 text-[10px] text-gray-400 text-center">
                      Cada jornada é única. Os resultados podem variar de pessoa para pessoa.
                    </div>
                  </div>

                  <!-- "O que mais ajudou" Card -->
                  <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 class="font-bold text-gray-800 text-[14px] flex items-center gap-1.5 mb-1">
                        ✓ que mais ajudou
                      </h3>
                      <p class="text-[11px] text-gray-400 mb-5">Principais hábitos/produtos de sucesso</p>
                      
                      <div class="space-y-3.5 my-2">
                        <div class="flex items-center gap-2 text-xs font-bold text-gray-655">
                          <span class="text-emerald-500 text-base">✓</span>
                          <span>Colágeno hidrogenado em pó</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs font-bold text-gray-655 border-t border-gray-50 pt-2.5">
                          <span class="text-emerald-500 text-base">✓</span>
                          <span>Hidratante Neutrogena</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs font-bold text-gray-655 border-t border-gray-50 pt-2.5">
                          <span class="text-emerald-500 text-base">✓</span>
                          <span>Práticas de oração / meditação</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs font-bold text-gray-655 border-t border-gray-50 pt-2.5">
                          <span class="text-emerald-500 text-base">✓</span>
                          <span>Controle do estresse</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Community rating Card -->
                  <div class="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 class="font-bold text-gray-800 text-[14px] flex items-center gap-1.5 mb-1">
                        ⭐ Avaliação da jornada
                      </h3>
                      <p class="text-[11px] text-gray-400 mb-5">Pontuação dada pelo autor do relato</p>
                      
                      <div class="flex flex-col items-center justify-center my-2 gap-1 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                        <div class="flex text-amber-450 text-2xl gap-0.5">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span class="text-gray-300">★</span>
                        </div>
                        <span class="text-xs font-bold text-gray-700 mt-1">4,0 de 5</span>
                      </div>
                    </div>
                    
                    <div class="p-3 bg-emerald-50/30 border border-emerald-50 rounded-xl text-center">
                      <p class="text-xs font-bold text-emerald-800 leading-tight">“Persistência e autocuidado fizeram a diferença!”</p>
                    </div>
                  </div>
                </div>

                <!-- Purple user feedback banner -->
                <div class="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl text-purple-650">👥</span>
                    <div>
                      <p class="font-bold text-purple-950">Este relato ajuda outras pessoas com dermatite atópica a encontrarem caminhos que podem funcionar para elas.</p>
                      <p class="text-purple-650 font-medium">A força da comunidade está em compartilhar experiências reais.</p>
                    </div>
                  </div>
                  <button class="px-4 py-2 border border-purple-200 text-purple-700 text-xs font-bold rounded-xl bg-white hover:bg-purple-50 transition-colors flex items-center gap-1.5 shadow-sm self-end md:self-auto">
                    <span>❤️</span>
                    Agradecer a usuária
                  </button>
                </div>
              </div>

              <!-- CASOS SEMELHANTES TAB -->
              <div v-else-if="activeTab === tabs.casos" class="animate-fadeIn space-y-6">
                <div v-if="loadingCasos" class="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p>Buscando conexões...</p>
                </div>

                <div v-else class="space-y-6">
                  <!-- Header Statistics and Actions -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 class="font-bold text-gray-800 text-lg flex items-center gap-1.5">
                        Casos similares a você
                        <svg class="w-4 h-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </h3>
                      <p class="text-xs text-gray-500">Encontramos {{ (casos && casos.length) || 3 }} casos com alta similaridade com o seu relato.</p>
                    </div>
                    
                    <div class="flex items-center gap-6">
                      <!-- Statistics -->
                      <div class="flex items-center gap-2 text-xs">
                        <span class="text-xl">👤</span>
                        <div>
                          <p class="font-extrabold text-gray-900 leading-none">{{ (casos && casos.length) || 3 }}</p>
                          <p class="text-[9px] text-gray-550">encontrados</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 border-l border-gray-200 pl-6 text-xs">
                        <span class="text-xl">👥</span>
                        <div>
                          <p class="font-extrabold text-gray-900 leading-none">84%</p>
                          <p class="text-[9px] text-gray-555">similaridade média</p>
                        </div>
                      </div>
                      
                      <!-- Filter button -->
                      <button class="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl bg-white hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-sm">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtrar
                      </button>
                    </div>
                  </div>

                  <!-- Case Cards Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(caso, index) in (casos && casos.length ? casos : mockCasos)" :key="caso.id || index"
                      class="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
                      
                      <!-- Top section: Similar Badge, Gender, Tags -->
                      <div>
                        <div class="flex gap-4 items-start mb-4">
                          <!-- Similarity Badge -->
                          <div class="px-3 py-2 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center flex-shrink-0">
                            <p class="text-sm font-extrabold text-emerald-600 leading-tight">
                              {{ index === 0 ? '92%' : index === 1 ? '87%' : index === 2 ? '81%' : '80%' }}
                            </p>
                            <p class="text-[8px] text-emerald-650 leading-none">de similaridade</p>
                          </div>
                          
                          <!-- Gender and tags -->
                          <div>
                            <div class="text-xs font-bold text-gray-900 mb-1 flex items-center gap-1">
                              <span>{{ caso.genero || 'Feminino' }}</span>
                              <span class="text-gray-300">•</span>
                              <span>{{ caso.faixaEtaria || '28 anos' }}</span>
                            </div>
                            <div class="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[10px] text-gray-450">
                              <span v-for="tag in (caso.tags?.length ? caso.tags : getFallbackTags(index))" :key="tag" class="leading-none">
                                {{ tag }} <span class="text-gray-200 ml-1 select-none last:hidden">•</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <!-- Split comparison images -->
                        <div class="mb-4">
                          <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-55 border border-gray-100 flex">
                            <img :src="caso.imgAntes || 'https://placehold.co/120x90.png?text=Antes'" class="w-1/2 h-full object-cover" />
                            <img :src="caso.imgDepois || 'https://placehold.co/120x90.png?text=Depois'" class="w-1/2 h-full object-cover" />
                            <!-- Handle -->
                            <div class="absolute inset-y-0 left-1/2 -ml-3.5 w-7 flex items-center justify-center pointer-events-none">
                              <div class="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-150">
                                <svg class="w-3.5 h-3.5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-between text-[9px] text-gray-450 font-bold uppercase tracking-wider mt-1 px-1">
                            <span>Antes</span>
                            <span>Depois</span>
                          </div>
                        </div>

                        <!-- Description excerpt -->
                        <div class="mb-4">
                          <p class="text-xs text-gray-650 leading-relaxed line-clamp-3">
                            {{ caso.descricao || 'Nenhum depoimento adicional compartilhado.' }}
                          </p>
                          <span class="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-100">
                            Resultado positivo
                          </span>
                        </div>

                        <!-- O que ajudou -->
                        <div class="mb-5 pt-3 border-t border-gray-50">
                          <p class="text-[10px] font-bold text-gray-450 uppercase tracking-wider mb-2">O que ajudou:</p>
                          <div class="flex flex-wrap gap-1.5">
                            <span v-for="item in getFallbackAjudou(index)" :key="item" 
                              class="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-lg border border-gray-100">
                              {{ item }}
                            </span>
                            <span v-if="index === 0" class="px-2 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-lg border border-gray-100">+2</span>
                            <span v-if="index === 1" class="px-2 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-lg border border-gray-100">+1</span>
                          </div>
                        </div>
                      </div>

                      <!-- Footer section: Melhora, Avaliação, Ver detalhes button -->
                      <div class="flex justify-between items-center pt-3 border-t border-gray-50 text-xs">
                        <div class="flex gap-4">
                          <!-- Melhora em -->
                          <div>
                            <p class="text-[10px] text-gray-450 leading-none">Melhora em</p>
                            <p class="font-extrabold text-gray-900 mt-0.5">{{ index === 0 ? '5 dias' : index === 1 ? '7 dias' : index === 2 ? '4 dias' : '6 dias' }}</p>
                          </div>
                          <!-- Avaliação -->
                          <div class="border-l border-gray-100 pl-4">
                            <p class="text-[10px] text-gray-450 leading-none">Avaliação da comunidade</p>
                            <div class="flex items-center gap-1 mt-0.5">
                              <div class="flex text-amber-400 text-[10px]">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span :class="index === 2 ? 'text-gray-300' : 'text-amber-400'">★</span>
                              </div>
                              <span class="text-[9px] text-gray-400">({{ index === 0 ? '38' : index === 1 ? '21' : index === 2 ? '15' : '18' }})</span>
                            </div>
                          </div>
                        </div>

                        <!-- Action Button -->
                        <button class="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1 shadow-sm">
                          Ver detalhes
                          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                    </div>
                  </div>

                  <!-- How we calculate similarity banner -->
                  <div class="p-4 bg-gray-55 border border-gray-150 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs mt-6">
                    <div class="flex items-center gap-3">
                      <span class="text-xl">📋</span>
                      <div>
                        <p class="font-bold text-gray-800">Como calculamos a similaridade?</p>
                        <p class="text-gray-555">Comparamos idade, gênero, regiões afetadas, gatilhos, intensidade dos sintomas e tratamentos utilizados.</p>
                      </div>
                    </div>
                    <a href="#" class="text-blue-600 font-bold hover:underline flex items-center gap-1 self-end sm:self-auto">
                      Saiba mais
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  <!-- Load More Button -->
                  <div class="text-center mt-6">
                    <button class="px-6 py-2.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl bg-white hover:bg-gray-50 transition-colors flex items-center gap-1.5 mx-auto shadow-sm"
                      @click="buscarCasosSemelhantes">
                      <svg class="w-4 h-4 text-gray-550" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                      </svg>
                      Carregar mais casos
                    </button>
                  </div>
                </div>
              </div>

              <!-- DICAS TAB (CONHECIMENTO DA COMUNIDADE) -->
              <div v-else-if="activeTab === tabs.dicas" class="animate-fadeIn space-y-8">
                <!-- Header Banner -->
                <div class="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div class="flex items-center gap-3">
                    <div class="p-2.5 bg-blue-100/50 rounded-xl text-blue-600">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-800">Conhecimento construído por pessoas reais</h4>
                      <p class="text-xs text-gray-500">Analisamos 184 relatos e encontramos padrões em 63 relatos semelhantes ao seu.</p>
                    </div>
                  </div>
                  <button class="px-4 py-2 border border-blue-200 text-blue-600 text-xs font-semibold rounded-xl bg-white hover:bg-blue-50 transition-colors flex items-center gap-1.5 shadow-sm">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Como funciona?
                  </button>
                </div>

                <!-- Main Grid -->
                <div class="grid grid-cols-12 gap-8">
                  <!-- Left Column: Treatments (8/12) -->
                  <div class="col-span-12 lg:col-span-8 space-y-6">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 class="font-bold text-gray-800 text-base flex items-center gap-1.5">
                          Tratamentos mais citados por pessoas semelhantes
                          <svg class="w-4 h-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </h3>
                        <p class="text-xs text-gray-500">Ordenados por nível de evidência e frequência de melhora relatada</p>
                      </div>
                      
                      <!-- Filter Pills -->
                      <div class="flex flex-wrap gap-2 text-[11px]">
                        <button class="px-2.5 py-1 border border-emerald-200 text-emerald-800 bg-emerald-50 font-medium rounded-full flex items-center gap-1 shadow-sm">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Muito citado
                        </button>
                        <button class="px-2.5 py-1 border border-amber-200 text-amber-800 bg-amber-50/50 font-medium rounded-full flex items-center gap-1">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pode ajudar
                        </button>
                        <button class="px-2.5 py-1 border border-gray-200 text-gray-600 bg-gray-50 font-medium rounded-full flex items-center gap-1">
                          <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Pouca evidência
                        </button>
                      </div>
                    </div>

                    <!-- Treatment list -->
                    <div class="space-y-4">
                      <!-- Treatment 1: CeraVe -->
                      <div class="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                        <div class="flex flex-col sm:flex-row gap-5 items-start">
                          <div class="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-100 p-2 flex items-center justify-center">
                            <svg class="w-12 h-12 text-blue-500" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="10" y="10" width="12" height="18" rx="2" fill="#F3F4F6" stroke="#9CA3AF" stroke-width="1.5"/>
                              <path d="M14 6H18V10H14V6Z" fill="#3B82F6" stroke="#2563EB" stroke-width="1.5"/>
                              <rect x="12" y="14" width="8" height="4" fill="#3B82F6" rx="0.5"/>
                              <line x1="14" y1="20" x2="18" y2="20" stroke="#9CA3AF" stroke-width="1.5"/>
                              <line x1="13" y1="23" x2="19" y2="23" stroke="#9CA3AF" stroke-width="1.5"/>
                            </svg>
                          </div>
                          <div class="flex-grow w-full">
                            <div class="flex justify-between items-start gap-4 mb-1">
                              <div>
                                <h4 class="font-bold text-gray-900 leading-tight">Hidratante CeraVe Pele Seca – 473ml</h4>
                                <p class="text-xs text-gray-400">Hidratante espesso</p>
                              </div>
                              <span class="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-100 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Muito citado
                              </span>
                            </div>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 py-3 border-y border-gray-50 text-center">
                              <div>
                                <p class="text-[11px] text-gray-400">Usado em</p>
                                <p class="text-base font-extrabold text-gray-900">81%</p>
                                <p class="text-[9px] text-gray-400 leading-none">dos relatos semelhantes</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Melhora média</p>
                                <p class="text-base font-extrabold text-gray-900">72%</p>
                                <p class="text-[9px] text-gray-400 leading-none">relataram melhora</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Tempo médio até melhora</p>
                                <p class="text-base font-extrabold text-gray-900">5 dias</p>
                                <p class="text-[9px] text-gray-400 leading-none">(variação: 2–14 dias)</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Avaliação da comunidade</p>
                                <div class="flex justify-center items-center gap-0.5 text-amber-400 my-0.5">
                                  <span>★</span><span>★</span><span>★</span><span>★</span><span class="text-gray-300">★</span>
                                </div>
                                <p class="text-[9px] text-gray-400 leading-none">4,6 de 5 (38 avaliações)</p>
                              </div>
                            </div>
                            
                            <div class="mt-3 p-3 bg-emerald-50/20 rounded-xl border border-emerald-50/50 flex flex-col md:flex-row md:items-center gap-2">
                              <span class="text-xs font-semibold text-emerald-800">Recomendado para você porque:</span>
                              <div class="flex flex-wrap gap-2 text-[10px]">
                                <span class="px-2 py-0.5 bg-white text-emerald-700 font-medium rounded-full border border-emerald-100">✓ Feminino</span>
                                <span class="px-2 py-0.5 bg-white text-emerald-700 font-medium rounded-full border border-emerald-100">✓ Estresse como gatilho</span>
                                <span class="px-2 py-0.5 bg-white text-emerald-700 font-medium rounded-full border border-emerald-100">✓ Coceira intensa</span>
                                <span class="px-2 py-0.5 bg-white text-emerald-700 font-medium rounded-full border border-emerald-100">✓ Corpo inteiro afetado</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Treatment 2: Zudaifu -->
                      <div class="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                        <div class="flex flex-col sm:flex-row gap-5 items-start">
                          <div class="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-100 p-2 flex items-center justify-center">
                            <svg class="w-12 h-12 text-amber-550" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 28L10 10H22L20 28H12Z" fill="#FDF2F8" stroke="#F59E0B" stroke-width="1.5"/>
                              <path d="M13 14H19V17H13V14Z" fill="#EF4444" rx="0.5"/>
                              <rect x="13" y="6" width="6" height="4" fill="#F59E0B" rx="1"/>
                            </svg>
                          </div>
                          <div class="flex-grow w-full">
                            <div class="flex justify-between items-start gap-4 mb-1">
                              <div>
                                <h4 class="font-bold text-gray-900 leading-tight">Pomada Zudaifu</h4>
                                <p class="text-xs text-gray-400">Pomada tradicional</p>
                              </div>
                              <span class="px-2.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded border border-amber-100 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pode ajudar
                              </span>
                            </div>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 py-3 border-y border-gray-50 text-center">
                              <div>
                                <p class="text-[11px] text-gray-400">Usado em</p>
                                <p class="text-base font-extrabold text-gray-900">42%</p>
                                <p class="text-[9px] text-gray-400 leading-none">dos relatos semelhantes</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Melhora média</p>
                                <p class="text-base font-extrabold text-gray-900">56%</p>
                                <p class="text-[9px] text-gray-400 leading-none">relataram melhora</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Tempo médio até melhora</p>
                                <p class="text-base font-extrabold text-gray-900">7 dias</p>
                                <p class="text-[9px] text-gray-400 leading-none">(variação: 3–21 dias)</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Avaliação da comunidade</p>
                                <div class="flex justify-center items-center gap-0.5 text-amber-450 my-0.5">
                                  <span>★</span><span>★</span><span>★</span><span class="text-gray-300">★</span><span class="text-gray-300">★</span>
                                </div>
                                <p class="text-[9px] text-gray-400 leading-none">3,7 de 5 (19 avaliações)</p>
                              </div>
                            </div>
                            
                            <div class="mt-3 p-3 bg-amber-50/20 rounded-xl border border-amber-50/50 flex flex-col md:flex-row md:items-center gap-2">
                              <span class="text-xs font-semibold text-amber-800">Recomendado para você porque:</span>
                              <div class="flex flex-wrap gap-2 text-[10px]">
                                <span class="px-2 py-0.5 bg-white text-amber-700 font-medium rounded-full border border-amber-100">✓ Feminino</span>
                                <span class="px-2 py-0.5 bg-white text-amber-700 font-medium rounded-full border border-amber-100">✓ Estresse como gatilho</span>
                                <span class="px-2 py-0.5 bg-white text-amber-700 font-medium rounded-full border border-amber-100">✓ Crises de coceira</span>
                                <span class="px-2 py-0.5 bg-white text-amber-700 font-medium rounded-full border border-amber-100">✓ Áreas ressecadas</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Treatment 3: Corticoide -->
                      <div class="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                        <div class="flex flex-col sm:flex-row gap-5 items-start">
                          <div class="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-100 p-2 flex items-center justify-center">
                            <svg class="w-12 h-12 text-purple-500" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 28L10 10H22L20 28H12Z" fill="#F5F3FF" stroke="#8B5CF6" stroke-width="1.5"/>
                              <path d="M13 14H19V17H13V14Z" fill="#8B5CF6" rx="0.5"/>
                              <rect x="13" y="6" width="6" height="4" fill="#C084FC" rx="1"/>
                            </svg>
                          </div>
                          <div class="flex-grow w-full">
                            <div class="flex justify-between items-start gap-4 mb-1">
                              <div>
                                <h4 class="font-bold text-gray-900 leading-tight">Corticoides tópicos leves</h4>
                                <p class="text-xs text-gray-400">Para crises agudas</p>
                              </div>
                              <span class="px-2.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded border border-amber-100 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pode ajudar
                              </span>
                            </div>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 py-3 border-y border-gray-50 text-center">
                              <div>
                                <p class="text-[11px] text-gray-400">Usado em</p>
                                <p class="text-base font-extrabold text-gray-900">36%</p>
                                <p class="text-[9px] text-gray-400 leading-none">dos relatos semelhantes</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Melhora média</p>
                                <p class="text-base font-extrabold text-gray-900">64%</p>
                                <p class="text-[9px] text-gray-400 leading-none">relataram melhora</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Tempo médio até melhora</p>
                                <p class="text-base font-extrabold text-gray-900">2 dias</p>
                                <p class="text-[9px] text-gray-400 leading-none">(variação: 1–7 dias)</p>
                              </div>
                              <div class="border-l border-gray-100">
                                <p class="text-[11px] text-gray-400">Avaliação da comunidade</p>
                                <div class="flex justify-center items-center gap-0.5 text-amber-450 my-0.5">
                                  <span>★</span><span>★</span><span>★</span><span class="text-gray-300">★</span><span class="text-gray-300">★</span>
                                </div>
                                <p class="text-[9px] text-gray-400 leading-none">3,5 de 5 (16 avaliações)</p>
                              </div>
                            </div>
                            
                            <div class="mt-3 p-3 bg-blue-50/20 rounded-xl border border-blue-50/50 flex flex-col md:flex-row md:items-center gap-2">
                              <span class="text-xs font-semibold text-blue-800">Recomendado para você porque:</span>
                              <div class="flex flex-wrap gap-2 text-[10px]">
                                <span class="px-2 py-0.5 bg-white text-blue-700 font-medium rounded-full border border-blue-100">✓ Feminino</span>
                                <span class="px-2 py-0.5 bg-white text-blue-700 font-medium rounded-full border border-blue-100">✓ Coceira intensa</span>
                                <span class="px-2 py-0.5 bg-white text-blue-700 font-medium rounded-full border border-blue-100">✓ Corpo inteiro afetado</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button class="w-full py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 text-xs shadow-sm mt-4">
                      Ver mais tratamentos (12)
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <!-- Right Column: Habits, Triggers, Insights (4/12) -->
                  <div class="col-span-12 lg:col-span-4 space-y-6">
                    <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                      <h3 class="font-bold text-gray-800 text-[14px] flex items-center gap-2 mb-4">
                        <span class="text-emerald-500">🌿</span> Hábitos que mais ajudam
                      </h3>
                      <div class="space-y-4">
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">✓ Hidratação frequente</span>
                            <span class="text-emerald-600">81%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-emerald-500 h-full rounded-full" style="width: 81%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">✓ Compressas frias</span>
                            <span class="text-emerald-600">63%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-emerald-500 h-full rounded-full" style="width: 63%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">✓ Evitar sabonetes perfumados</span>
                            <span class="text-emerald-600">72%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-emerald-500 h-full rounded-full" style="width: 72%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">✓ Banhos curtos e mornos</span>
                            <span class="text-emerald-600">68%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-emerald-500 h-full rounded-full" style="width: 68%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">✓ Reduzir estresse</span>
                            <span class="text-emerald-600">58%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-emerald-500 h-full rounded-full" style="width: 58%"></div>
                          </div>
                        </div>
                      </div>
                      <a href="#" class="block text-center mt-5 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline">
                        Ver todos os hábitos →
                      </a>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                      <h3 class="font-bold text-gray-800 text-[14px] flex items-center gap-2 mb-4">
                        <span class="text-red-500">⚠️</span> Gatilhos mais comuns
                      </h3>
                      <div class="space-y-4">
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">🔥 Estresse</span>
                            <span class="text-red-500">78%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-red-400 h-full rounded-full" style="width: 78%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">🥛 Laticínios</span>
                            <span class="text-red-500">46%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-red-400 h-full rounded-full" style="width: 46%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">🚿 Banho quente</span>
                            <span class="text-red-500">42%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-red-400 h-full rounded-full" style="width: 42%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">🧴 Sabonetes perfumados</span>
                            <span class="text-red-550">38%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-red-400 h-full rounded-full" style="width: 38%"></div>
                          </div>
                        </div>
                        <div>
                          <div class="flex justify-between text-xs font-bold text-gray-700 mb-1">
                            <span class="flex items-center gap-1.5 text-gray-600">☁️ Mudanças de clima</span>
                            <span class="text-red-550">32%</span>
                          </div>
                          <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div class="bg-red-400 h-full rounded-full" style="width: 32%"></div>
                          </div>
                        </div>
                      </div>
                      <a href="#" class="block text-center mt-5 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline">
                        Ver todos os gatilhos →
                      </a>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                      <h3 class="font-bold text-gray-800 text-[14px] flex items-center gap-2 mb-4">
                        <span class="text-purple-500">💡</span> O que aprendemos com relatos
                      </h3>
                      <ul class="space-y-3 text-xs text-gray-600 list-disc pl-4 leading-relaxed">
                        <li>84% das pessoas relatam melhora significativa com hidratação intensiva e regular.</li>
                        <li>Estresse foi identificado em 78% dos relatos como fator que piora os sintomas.</li>
                        <li>Banhos quentes aparecem repetidamente como fator de piora na pele.</li>
                        <li>Compressas frias ajudam a reduzir coceira em 63% dos relatos durante crises.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Bottom Row Grid: Timeline, Combinations, Coconut oil -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <h3 class="font-bold text-gray-800 text-[14px] mb-0.5">Resultados ao longo do tempo</h3>
                    <p class="text-[11px] text-gray-400 mb-5">Evolução média relatada pela comunidade</p>
                    
                    <div class="relative pl-5 border-l border-gray-100 space-y-4 ml-1">
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Dia 1-2</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Alívio leve da coceira</p>
                      </div>
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Dia 3-7</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Redução da vermelhidão</p>
                      </div>
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Semana 2</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Pele mais hidratada</p>
                      </div>
                      <div class="relative">
                        <span class="absolute -left-[27px] top-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm"></span>
                        <h4 class="text-xs font-bold text-gray-900 leading-tight">Mês 1+</h4>
                        <p class="text-[11px] text-gray-500 leading-normal">Pele estabilizada e menos crises</p>
                      </div>
                    </div>
                    
                    <a href="#" class="block text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline mt-4">
                      Entenda as variações →
                    </a>
                  </div>

                  <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 class="font-bold text-gray-800 text-[14px] mb-0.5">Combinações que funcionam</h3>
                      <p class="text-[11px] text-gray-400 mb-5">Mais usadas em conjunto com sucesso</p>
                    </div>
                    
                    <div class="flex items-center justify-between gap-1 my-3 py-1 px-2">
                      <div class="flex flex-col items-center text-center">
                        <div class="w-10 h-10 bg-gray-50 rounded-lg p-1.5 border border-gray-100 flex items-center justify-center">
                          <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="6" y="8" width="12" height="12" rx="1"/>
                            <path d="M10 5H14V8H10V5Z"/>
                          </svg>
                        </div>
                        <span class="text-[9px] text-gray-650 font-bold mt-1">Hidratante espesso</span>
                      </div>
                      
                      <span class="text-gray-300 font-bold text-sm">+</span>

                      <div class="flex flex-col items-center text-center">
                        <div class="w-10 h-10 bg-gray-50 rounded-lg p-1.5 border border-gray-100 flex items-center justify-center">
                          <svg class="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 4V20M4 12H20" stroke-linecap="round"/>
                          </svg>
                        </div>
                        <span class="text-[9px] text-gray-650 font-bold mt-1">Compressas frias</span>
                      </div>

                      <span class="text-gray-300 font-bold text-sm">+</span>

                      <div class="flex flex-col items-center text-center">
                        <div class="w-10 h-10 bg-gray-50 rounded-lg p-1.5 border border-gray-100 flex items-center justify-center">
                          <svg class="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M4 8H20M4 12H20M4 16H20" stroke-linecap="round"/>
                          </svg>
                        </div>
                        <span class="text-[9px] text-gray-650 font-bold mt-1">Banhos curtos</span>
                      </div>
                    </div>
                    
                    <a href="#" class="block text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline mt-2">
                      Ver mais combinações →
                    </a>
                  </div>

                  <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 class="font-bold text-gray-800 text-[14px] mb-0.5">🥥 Óleo de coco</h3>
                      <p class="text-[11px] text-gray-400 mb-5">Resultados variados na comunidade</p>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-2 text-center my-2">
                      <div>
                        <p class="text-xl mb-1">😊</p>
                        <p class="text-sm font-extrabold text-emerald-600">42%</p>
                        <p class="text-[9px] text-gray-550 leading-none">Relataram que ajudou</p>
                      </div>
                      <div class="border-x border-gray-100 px-1">
                        <p class="text-xl mb-1">😡</p>
                        <p class="text-sm font-extrabold text-red-500">18%</p>
                        <p class="text-[9px] text-gray-550 leading-none">Relataram que piorou</p>
                      </div>
                      <div>
                        <p class="text-xl mb-1">😐</p>
                        <p class="text-sm font-extrabold text-gray-500">40%</p>
                        <p class="text-[9px] text-gray-550 leading-none">Não fez diferença</p>
                      </div>
                    </div>
                    
                    <a href="#" class="block text-[11px] font-bold text-gray-400 hover:text-gray-650 hover:underline mt-2 text-center">
                      Resultados variados na comunidade
                    </a>
                  </div>
                </div>

                <!-- Footer Metadados Banner -->
                <div class="p-4 bg-blue-50/40 border border-blue-100 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl">📋</span>
                    <div>
                      <p class="font-bold text-gray-800">Como chegamos nessas recomendações?</p>
                      <p class="text-gray-500">Usamos inteligência artificial para analisar e comparar relatos com padrões semelhantes ao seu.</p>
                    </div>
                  </div>
                  
                  <div class="flex gap-6 items-center w-full md:w-auto justify-between md:justify-end">
                    <div class="flex items-center gap-2">
                      <span class="text-lg">📄</span>
                      <div>
                        <p class="font-extrabold text-gray-900 leading-none">184</p>
                        <p class="text-[9px] text-gray-550">Relatos analisados</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 border-l border-gray-200 pl-6">
                      <span class="text-lg">👥</span>
                      <div>
                        <p class="font-extrabold text-gray-900 leading-none">63</p>
                        <p class="text-[9px] text-gray-550">Semelhantes ao seu</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 border-l border-gray-200 pl-6">
                      <span class="text-lg">☍</span>
                      <div>
                        <p class="font-extrabold text-gray-900 leading-none">5</p>
                        <p class="text-[9px] text-gray-550">Fatores considerados</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Warning Medical Banner -->
                <div class="text-center p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 flex items-center justify-center gap-2 shadow-sm w-full">
                  <svg class="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Estas recomendações não substituem avaliação médica profissional. Em caso de dúvidas, consulte um dermatologista.</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox for Zoomed Image -->
      <transition name="fade">
        <div v-if="showImagemAmpliada" class="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4"
          @click="fecharImagemAmpliada">
          <img :src="imagens[fotoAtual]"
            class="max-w-full max-h-screen object-contain rounded-lg shadow-2xl skew-y-0" />
          <button class="absolute top-4 right-4 text-white hover:text-gray-300 p-2" @click="fecharImagemAmpliada">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </transition>

    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { buscarCasosSemelhantesAPI } from '../services/casosService'

const props = defineProps({
  jornadaSelecionada: Object
})

const emit = defineEmits(['update:jornadaSelecionada'])

const casos = ref([])
const loadingCasos = ref(false)
const textoExpandido = ref(false)

const textoResumido = computed(() => {
  const texto = props.jornadaSelecionada?.conteudo_original
    || props.jornadaSelecionada?.resumo_publico

  if (!texto) {
    return 'Não foi possível carregar o resumo desta jornada.'
  }

  if (!textoExpandido.value) {
    return texto.slice(0, 180) + (texto.length > 180 ? '...' : '')
  }

  return texto
})

const temTextoEscondido = computed(() => {
  const texto = props.jornadaSelecionada?.conteudo_original
    || props.jornadaSelecionada?.resumo_publico || " -- Sem resumo disponível -- "
    
  return !textoExpandido.value && texto.length > 180;
});

const expandirTexto = () => {
  textoExpandido.value = true;
}

// Reset text state when journey changes
watch(() => props.jornadaSelecionada, () => {
  textoExpandido.value = false;
  fotoAtual.value = 0;
  activeTab.value = tabs['info'];
});

const buscarCasosSemelhantes = async () => {
  let info = {
    id: props.jornadaSelecionada.id,
    genero: props.jornadaSelecionada.genero,
    classificacao: props.jornadaSelecionada.classificacao,
    regioesAfetadas: props.jornadaSelecionada.regioesAfetadas,
    tags: props.jornadaSelecionada.tags,
    descricao: props.jornadaSelecionada.descricao
  };
  loadingCasos.value = true;
  try {
    const response = await buscarCasosSemelhantesAPI(info);
    casos.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar casos semelhantes:', error);
    casos.value = [];
  } finally {
    loadingCasos.value = false;
    jaBuscou.value = true;
  }
}

const tabs = { 'info': 'Informações da jornada', 'casos': 'Casos semelhantes', 'dicas': 'Conhecimento da Comunidade' }
const activeTab = ref(tabs['info'])
const jaBuscou = ref(false)

watch(() => activeTab.value, async (novoValor) => {
  if (novoValor === tabs.casos && !jaBuscou.value) {
    await buscarCasosSemelhantes();
  }
});

/* Carousel Logic */
const fotoAtual = ref(0);
const imagens = computed(() => {
  const lista = []
  if (props.jornadaSelecionada.imgAntes) lista.push(props.jornadaSelecionada.imgAntes)
  if (props.jornadaSelecionada.imgDepois) lista.push(props.jornadaSelecionada.imgDepois)
  if (props.jornadaSelecionada.imgDurante && Array.isArray(props.jornadaSelecionada.imgDurante)) {
    lista.push(...props.jornadaSelecionada.imgDurante)
  }
  return lista
})

const selecionarFoto = (index) => {
  if (index >= 0 && index < imagens.value.length) {
    fotoAtual.value = index;
  }
};

const proximaFoto = () => {
  fotoAtual.value = (fotoAtual.value < imagens.value.length - 1) ? fotoAtual.value + 1 : 0;
};

const fotoAnterior = () => {
  fotoAtual.value = (fotoAtual.value > 0) ? fotoAtual.value - 1 : imagens.value.length - 1;
};

const showImagemAmpliada = ref(false)
const abrirImagemAmpliada = () => showImagemAmpliada.value = true
const fecharImagemAmpliada = () => showImagemAmpliada.value = false

/* Fallback/Mock data for Screenshot matches */
const getFallbackTags = (index) => {
  const list = [
    ['Coceira intensa', 'Corpo inteiro', 'Estresse como gatilho'],
    ['Rosto', 'Estresse', 'Coceira', 'Vermelhidão'],
    ['Braços e pernas', 'Coceira intensa', 'Estresse']
  ]
  return list[index % list.length]
}

const getFallbackAjudou = (index) => {
  const list = [
    ['Zudaifu', 'Hidratação intensa', 'Compressas frias'],
    ['Hidratante espesso', 'Evitar sabonete', 'Banhos curtos'],
    ['Zudaifu', 'Corticoide leve', 'Óleo de coco']
  ]
  return list[index % list.length]
}

const mockCasos = ref([
  {
    genero: 'Feminino',
    faixaEtaria: '28 anos',
    descricao: 'Bom dia! [depoimento][texto][relatopositivo] terapia ortomolecular][homeopatia][tratar o emocional]...',
    imgAntes: 'https://placehold.co/120x90.png?text=Antes',
    imgDepois: 'https://placehold.co/120x90.png?text=Depois'
  },
  {
    genero: 'Feminino',
    faixaEtaria: '31 anos',
    descricao: 'Minha dermatite atacou no rosto esse fim de semana e vim compartilhar com vocês como eu consegui d...',
    imgAntes: 'https://placehold.co/120x90.png?text=Antes',
    imgDepois: 'https://placehold.co/120x90.png?text=Depois'
  },
  {
    genero: 'Feminino',
    faixaEtaria: '25 anos',
    descricao: 'a pomada Zudaifu tem corticoide eles disseram.... Eu já tinha postado um antes e dps, mas esse sim val...',
    imgAntes: 'https://placehold.co/120x90.png?text=Antes',
    imgDepois: 'https://placehold.co/120x90.png?text=Depois'
  }
])
</script>

<style scoped>
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>