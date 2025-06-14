<template>
  <section class="home-galeria">
    <div class="container">
      <h2 class="text-center mb-4 fw-semibold">O que fazemos</h2>
<!-- 🔄 CARROSSEL (MOBILE) -->
<div id="carouselCards" class="carousel slide d-md-none" data-bs-ride="carousel">
  <div class="carousel-inner">

    <!-- CARD 1 -->
    <div class="carousel-item active">
      <div class="galeria-card mx-3">
        <div class="galeria-img-dupla">
          <img src="/img/card-home-001.png" alt="Antes" />
          <img src="/img/card-home-002.png" alt="Depois" />
        </div>
        <h5 class="galeria-titulo">Jornadas de tratamentos</h5>
        <p class="text-center">Veja relatos de antes e depois feitos por pessoas reais</p>
        <div class="galeria-badges" v-for="(badge, badgeIndex) in cards[0].badge" :key="badgeIndex">
          <span class="galeria-badge">{{ badge }}</span>
        </div>
      </div>
    </div>

    <!-- CARD 2 -->
    <div class="carousel-item">
      <div class="galeria-card mx-3">
        <h5 class="galeria-titulo">Sobre o que estamos falando?</h5>
        <div class="word-cloud">
          <WordCloud />
        </div>
      </div>
    </div>

    <!-- CARD 3 -->
    <div class="carousel-item">
      <div class="galeria-card mx-3">
        <div class="galeria-img-unica">
          <img src='/img/card-home-004.png' alt="Imagem única" class="galeria-img" />
        </div>
        <h5 class="galeria-titulo">Ajuda com descontos e promoções</h5>
        <p class="text-center">Descontos e promoções exclusivas com parceiros</p>
        <div class="galeria-badges">
          <span class="galeria-badge">descontos</span>
          <span class="galeria-badge">promocoes</span>
          <span class="galeria-badge">parceiros</span>
        </div>
      </div>
    </div>

  </div>

  <!-- ⬅️➡️ Botões do carrossel -->
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselCards" data-bs-slide="prev">
    <span class="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>

  <button class="carousel-control-next" type="button" data-bs-target="#carouselCards" data-bs-slide="next">
    <span class="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
    <span class="visually-hidden">Próximo</span>
  </button>
</div>


    </div>
  </section>
</template>

<script setup>
import WordCloud from './WordCloud.vue';
const cards = [
  {
    imgAntes: 'img/card-home-001.png',
    imgDepois: 'img/card-home-002.png',
    titulo: 'Jornadas de tratamentos',
    descricao: 'Veja relatos de antes e depois feitos por pessoas reais',
    isunica: false,
    badge: ['Cura', 'Tratamento']
  },
  {
    imgUnica: 'img/card-home-003.jpg',
    descricao: 'Aprenda com dicas e soluções que deram certo para outros',
    isunica: true,
    titulo: 'Conhecimento extraído de dados',
    badge: ['Análise de dados', 'Insights']
  },
  {
    imgUnica: 'img/card-home-004.png',
    titulo: 'Ajuda com descontos e promoções',
    isunica: true,
    descricao: 'Descontos e promoções exclusivas com parceiros',
    badge: ['descontos', 'promoções', 'parceiros'],
  }
]
</script>

<style scoped>
.home-galeria {
  background-color: #f9fafb;

  padding-bottom: 4rem;
}

.galeria-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 6rem;
  /* espaço vertical, horizontal */
  margin-top: 2rem;
}

.galeria-card {
  max-width: 280px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;

}

.galeria-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.galeria-card:hover {
  transform: translateY(-4px);
}

.galeria-badges {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.galeria-img {
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  object-fit: cover;
}

.galeria-img-dupla {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}


.galeria-img-dupla img {
  width: 48%;
  height: auto;
  border-radius: 0.75rem;
  object-fit: cover;
}

.galeria-titulo {
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.galeria-badge {
  margin-top: 0.5rem;
  display: inline-flex;
  background-color: #eef2f7;
  border-radius: 1%;
  padding: 0.2rem 0.75rem;
  font-size: 0.7rem;
  color: #333;
}

.galeria-img-unica {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  /* Defina a altura desejada */
  overflow: hidden;

}

.word-cloud {
  width: 100%;
  height: 260px;
  /* Defina a altura desejada */
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>