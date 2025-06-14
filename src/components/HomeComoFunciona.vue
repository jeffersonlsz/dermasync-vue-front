<template>
<section class="como-funciona">
  <h2>Como Funciona</h2>
  <div class="grid-funciona">
    <div class="etapa">
      <img src="/img/compartilhe.png" alt="Compartilhe">
      <h3>Compartilhe sua história</h3>
      <p>Envie fotos e relatos da sua luta contra a dermatite. Sua experiência pode mudar a vida de alguém.</p>
    </div>
    <div class="etapa">
      <img src="/img/explore.png" alt="Explore">
      <h3>Explore histórias de verdade</h3>
      <p>Veja fotos reais de quem enfrentou os mesmos desafios que você — e descubra que não está sozinho.</p>
    </div>
    <div class="etapa">
      <img src="/img/descubra.png" alt="Descubra">
      <h3>Descubra soluções que funcionam de verdade</h3>
      <p>Filtre, compare e encontre caminhos que ajudaram outras pessoas. Você pode se surpreender.</p>
    </div>
  </div>
</section>

</template>

<script setup>

</script>

<style scoped>
.como-funciona {
  padding: 3rem 1rem;
  background: #fdfdfdee;
  text-align: center;
}

.grid-funciona {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: 0 auto;
}

.etapa img {
  max-width: 180px;
  margin-bottom: 1rem;
}

.etapa h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #222;
}

.etapa p {
  font-size: 1rem;
  color: #555;
}

</style>