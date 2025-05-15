<template>
    <section class="home-galeria py-5">
      <div class="container">
        <h2 class="text-center mb-4 fw-semibold">Nossos serviços</h2>
        <div class="row justify-content-center gap-4 flex-wrap">   
            <div class="galeria-grid"> 
            
                <div
                    v-for="(item, index) in cards"
                    :key="index"
                    class="galeria-card col-12 col-sm-6 col-md-4"
                >
                <div v-if="item.isunica">
                  <div class="galeria-img-unica">
                    <img :src="item.imgUnica" alt="Imagem única" class="galeria-img" />
                  </div>
                </div>
                <div v-else>
                  <div class="galeria-img-dupla">
                    <img :src="item.imgAntes" alt="Antes" />
                    <img :src="item.imgDepois" alt="Depois" />
                    
                </div>
                </div>
                
                    <h5 class="galeria-titulo">{{ item.titulo }}</h5>
                    <p class="text-center">{{ item.descricao }}</p>
                    <div class="galeria-badges" v-for="(badge, badgeIndex) in item.badge" :key="badgeIndex">
                        <span class="galeria-badge">{{ badge }}</span>
                    </div>
                    
                </div>
            </div>
        </div>

      </div>
    </section>
  </template>
  
  <script setup>
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
  padding-top: 2rem;
  padding-bottom: 4rem;
}
  
  .galeria-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 6rem; /* espaço vertical, horizontal */
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
  .galeria-badges{
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
    height: 220px; /* Defina a altura desejada */
    overflow: hidden;

  }
  </style>
  