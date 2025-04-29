# Safe Guard de Duplicação na Galeria

📅 **Data:** 29/04/2025  
👤 **Responsável:** Jefferson  
📁 **Contexto:** Projeto DermaSync - Componente GaleriaViewer.vue

---

## ✔️ Decisão

Implementado `safe guard` para impedir inserção duplicada de cards na galeria, mesmo após resolução do bug de `emit` duplicado.
```js
if (galeria.value.some(card => card.id === docSnap.id)) return;

## 🎯 Motivo
Durante testes com retry no getDownloadURL, detectamos que:

O evento uploadFinalizado era disparado múltiplas vezes

Isso resultava na inserção duplicada de um mesmo card no galeria.value

Apesar do erro ter sido resolvido na origem, decidimos blindar a função carregarNovoCard com verificação por ID.

## 🛠️ Alternativas consideradas
Remover o safe guard após corrigir o bug
❌ Risco de regressão alta

Mover verificação para o componente de upload
❌ Quebraria a responsabilidade do GaleriaViewer

## ✅ Resultado Esperado

## 📌 Observação futura

Criar habito de guardar essas decisoes