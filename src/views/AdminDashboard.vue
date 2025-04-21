<template>
    <DashboardLayout>
      <h2 class="fw-bold mb-4">Painel do Administrador</h2>
  
      <div class="row g-4">
        <div class="col-md-6">
          <div class="card border-0 shadow-sm p-4">
            <h5 class="fw-bold mb-2">Usuários da plataforma</h5>
            <p class="text-muted">Gerencie permissões e papéis de acesso.</p>
            <button class="btn btn-primary btn-sm" disabled>Ver lista de usuários (em breve)</button>
          </div>
        </div>
  
        <div class="col-md-6">
          <div class="card border-0 shadow-sm p-4">
            <h5 class="fw-bold mb-2">Galeria colaborativa</h5>
            <p class="text-muted">Modere envios, organize filtros e destaque conteúdos.</p>
            <button class="btn btn-outline-secondary btn-sm" disabled>Acessar moderação (em breve)</button>
          </div>
        </div>
  
        <div class="col-md-6">
          <div class="card border-0 shadow-sm p-4">
            <h5 class="fw-bold mb-2">Depoimentos e jornadas</h5>
            <p class="text-muted">Analise os relatos enviados e extraia insights.</p>
            <button class="btn btn-outline-secondary btn-sm" disabled>Ver relatos (em breve)</button>
          </div>
        </div>
  
        <div class="col-md-6">
          <div class="card border-0 shadow-sm p-4">
            <h5 class="fw-bold mb-2">Logs e segurança</h5>
            <p class="text-muted">Acompanhe atividades e possíveis anomalias.</p>
            <button class="btn btn-outline-secondary btn-sm" disabled>Ver registros (em breve)</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  </template>
  
  <script setup>
  import DashboardLayout from '../layouts/DashboardLayout.vue';
  </script>
  