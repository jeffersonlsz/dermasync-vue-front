
// jornada.js
// Contrato de dados da jornada + métodos de utilidade

export function criarJornada() {
  return {
    // --- Dados do usuário ---
    nome: null,
    idade: null,
    sexo: null,
    classificacao: null,
    descricao: null,

    // --- Imagens da jornada ---
    imagens: {
      antes: null,
      durante: [],
      depois: null
    },

    // --- Processamento da LLM ---
    statusLLM: "pendente",
    tags_extraidas: [],
    microdepoimento: null,
    intervencoes_mencionadas: [],

    llm_processamento: {
      inicio: null,
      fim: null,
      duracao_ms: null
    },

    tentativas_llm: 0,
    erro_llm: null,
    ultima_tentativa_llm: null,

    // --- Metadados ---
    criado_em: new Date().toISOString(),
    atualizado_em: null,
    versao_schema: 1,

    // === MÉTODOS ===

    validar() {
      const erros = [];

      if (!this.nome || typeof this.nome !== "string") erros.push("Nome ausente ou inválido.");
      if (!this.idade || isNaN(this.idade)) erros.push("Idade inválida.");
      if (!["masculino", "feminino", "outro"].includes(this.sexo)) erros.push("Sexo inválido.");
      if (!this.classificacao) erros.push("Classificação ausente.");
      if (!this.descricao) erros.push("Descrição obrigatória.");

      if (!this.imagens.antes) erros.push("Imagem 'antes' é obrigatória.");
      if (!this.imagens.durante || this.imagens.durante.length === 0) erros.push("Imagem 'durante' é obrigatória.");
      if (!this.imagens.depois) erros.push("Imagem 'depois' é obrigatória.");

      return erros.length === 0 ? true : erros;
    },

    limpar() {
      Object.assign(this, criarJornada());
    },

    marcarAtualizacao() {
      this.atualizado_em = new Date().toISOString();
    },

    iniciarLLM() {
      this.statusLLM = "processando";
      this.llm_processamento.inicio = new Date().toISOString();
    },

    finalizarLLM({ tags, depoimento, intervencoes }) {
      this.statusLLM = "concluido";
      this.tags_extraidas = tags;
      this.microdepoimento = depoimento;
      this.intervencoes_mencionadas = intervencoes;
      this.llm_processamento.fim = new Date().toISOString();
      const inicio = new Date(this.llm_processamento.inicio);
      const fim = new Date(this.llm_processamento.fim);
      this.llm_processamento.duracao_ms = fim - inicio;
      this.marcarAtualizacao();
    }
  };
}
