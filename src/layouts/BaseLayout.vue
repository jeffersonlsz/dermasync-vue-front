<template>
  <div class="min-h-screen flex flex-col bg-cream font-sans text-gray-900">
    <Navbar />

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <!-- Col 1: Logo & Description -->
          <div class="flex flex-col items-start">
            <span class="font-heading font-bold text-xl text-gray-900 tracking-tight block mb-4">DermaSync</span>
            <p class="text-gray-600 leading-relaxed">
              Um espaço seguro de acolhimento e troca para quem convive com Dermatite Atópica.
              Sem julgamentos, sem promessas milagrosas. Apenas histórias reais.
            </p>
          </div>

          <!-- Col 2: Links -->
          <div>
            <h3 class="font-bold text-gray-900 mb-4">Comunidade</h3>
            <ul class="space-y-3">
              <li>
                <RouterLink to="/galeria" class="text-gray-600 hover:text-primary transition-colors">Galeria de Relatos
                </RouterLink>
              </li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Compartilhar Experiência</a>
              </li>
              <li>
                <RouterLink to="/videos-explicativos" class="text-gray-600 hover:text-primary transition-colors">
                  Conteúdos Informativos</RouterLink>
              </li>
              <li>
                <RouterLink to="/faq" class="text-gray-600 hover:text-primary transition-colors">Dúvidas Frequentes
                </RouterLink>
              </li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Quem Somos</a></li>
            </ul>
          </div>

          <!-- Col 3: Legal & Ethics -->
          <div>
            <h3 class="font-bold text-gray-900 mb-4">Transparência</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Nossa Ética</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Privacidade de Dados</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">Fale Conosco</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-8 text-center">
          <p class="text-gray-500 text-sm">
            © 2025 DermaSync. Construído com respeito.<br />
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