<template>
  <div class="min-h-screen flex flex-col bg-cream font-sans text-gray-900">
    <Navbar />

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-100 pt-20 pb-12 mt-auto">
      <div class="container mx-auto px-4 text-left">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <!-- Col 1: Logo & Social -->
          <div class="md:col-span-4 space-y-8">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10.9 14.19 12 15 15 15"/></svg>
                </div>
                <span class="font-heading font-bold text-2xl text-gray-900 tracking-tight">DermaSync</span>
              </div>
              <p class="text-gray-600 leading-relaxed max-w-sm">
                Um espaço seguro de acolhimento e troca para quem convive com Dermatite Atópica. Sem julgamentos, sem promessas milagrosas. Apenas histórias reais.
              </p>
            </div>
            
            <div class="flex items-center gap-4">
              <a href="#" class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <i class="bi bi-youtube"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <i class="bi bi-tiktok"></i>
              </a>
            </div>
          </div>

          <!-- Col 2: Links Community -->
          <div class="md:col-span-2 space-y-6">
            <h3 class="font-bold text-gray-900">Comunidade</h3>
            <ul class="space-y-4 text-sm">
              <li><RouterLink to="/galeria" class="text-gray-600 hover:text-primary transition-colors">Galeria de Relatos</RouterLink></li>
              <li><RouterLink to="/videos-explicativos" class="text-gray-600 hover:text-primary transition-colors">Relatos em Vídeo</RouterLink></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Compartilhar Experiência</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Conteúdos Informativos</a></li>
              <li><RouterLink to="/faq" class="text-gray-600 hover:text-primary transition-colors">Dúvidas Frequentes</RouterLink></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Quem Somos</a></li>
            </ul>
          </div>

          <!-- Col 3: Links Legal -->
          <div class="md:col-span-2 space-y-6">
            <h3 class="font-bold text-gray-900">Transparência</h3>
            <ul class="space-y-4 text-sm">
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Nossa Ética</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Privacidade de Dados</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          <!-- Col 4: Support Box -->
          <div class="md:col-span-4">
            <div class="bg-primary-100/50 rounded-2xl p-8 space-y-4">
              <h3 class="font-bold text-gray-900">Precisa de ajuda?</h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Se estiver passando por um momento difícil, busque apoio profissional.
              </p>
              <button class="w-full py-3 px-6 bg-white border border-gray-200 text-sm font-bold text-gray-900 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                Ver recursos de apoio
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-10 text-center space-y-4">
          <p class="text-gray-500 text-xs">
            © 2025 DermaSync. Construído com respeito.
          </p>
          <p class="text-gray-400 text-[10px] max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
            As experiências compartilhadas aqui são pessoais. Este site não substitui orientação médica profissional.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
</script>