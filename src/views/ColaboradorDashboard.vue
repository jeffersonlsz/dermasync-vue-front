<template>
  <DashboardLayout>
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold mb-0">Painel do Colaborador</h2>
      </div>

      <div class="alert alert-info">
        Bem-vindo! Aqui você poderá:
        <ul class="mb-0">
          <li>Enviar novas imagens e relatos de tratamento</li>
          <li>Acompanhar suas contribuições</li>
          <li>Editar ou excluir envios</li>
        </ul>
      </div>

      <div class="card p-4 shadow-sm mt-4">
        <p class="text-muted mb-1">Funcionalidade de envio será implementada aqui.</p>
        <p class="text-muted">Aguarde a próxima sprint para ativação.</p>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
</script>
