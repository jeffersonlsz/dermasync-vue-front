<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12 container-mobile">
        <Navbar />
        <main>
          <slot />
        </main>
      </div>



    </div>
    <!-- FOOTER -->
    <footer class="bg-white text-center py-4 border-top mt-5">
      <p class="text-muted small mb-0">
        © 2025 DermaSync. Todos os direitos reservados.<br />
        Este site não substitui orientação médica. Leia nossa
        <a href="#">Política de Ética</a>.
      </p>
    </footer>

  </div>





</template>

<script setup>
import Navbar from '../components/Navbar.vue';

console.log("🧪 BaseLayout foi renderizado");
</script>

<style scoped>
main {
  min-height: 80vh;
}

@media screen and (max-width: 768px) {
  main {
    min-height: 70vh;
  }

  .container-mobile {
    padding-left: 0px;
    padding-right: 0px;
  }

  footer {
    font-size: 0.9rem;
  }
}
  



</style>