# Uso do JavaScript do Bootstrap no Navbar

## Cenário
O menu hamburguer do `Navbar.vue` não funcionava, pois o projeto usava apenas o CSS do Bootstrap.

## Opções analisadas
- Refatorar todo o toggle para Vue puro → tempo estimado inviável para o MVP, porém será considerado futuramente, caso o projeto escale.
- Clonar e adaptar o navbar do projeto oficial Vue Argon Dashboard → exigiria reestruturação significativa. Descartado.
- Estudar o comportamento do clique no menu hamburguer e tentar replica-lo. Exige muito tempo.

## Decisão
Importar o JS do Bootstrap globalmente (`bootstrap.bundle.min.js`) para ativar o comportamento `data-bs-toggle="collapse"` no menu.

## Problemas observados
- Conflito com botão Vue que abre overlay.
- Bootstrap JS interceptava o evento `click`.

## Solução aplicada
- Mantivemos o uso do Bootstrap JS somente no Navbar.
- Utilizamos `.stop.prevent` no botão Vue afetado para evitar interferência.
- Garantimos que não há uso de `data-bs-*` fora do `Navbar.vue`.

## Futuro
- Se o projeto crescer, migrar o `Navbar.vue` para uma implementação 100% Vue. 
- Garantir que o Bootstrap JS permaneça confinado ao escopo atual.

