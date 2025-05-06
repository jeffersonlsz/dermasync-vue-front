
// jornada.js
// Contrato de dados da jornada + métodos de utilidade
/*const jornadaFinal = reactive({
  classificacao: '',
  genero: '',
  regioesAfetadas: [],
  tags: [],
  descricao: '',
  consentimentos: {
    imagemSegura: false,
    exibirGaleria: false
  },
  imagens: {
    antes: null,
    durante: [],
    depois: null
  }
}); */
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
    classificacao: '',
    genero: '',
    regioesAfetadas: [],
    tags: [],
    descricao: '',
    consentimentos: {
      imagemSegura: false,
      exibirGaleria: false
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
      //desativado por enquanto
      return true;
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
