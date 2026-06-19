import api from '../lib/api';

export const buscarCasosSemelhantesAPI = async (info) => { 
    console.log(`USANDO API PARA BUSCAR: ${info.tags ? info.tags.slice(1) : ''}`);
    
    try {
        const resposta = await api.post(`/relatos/${info.id}/similares`, {
            relato_id: info.id
        });
        
        const data = resposta.data;
        console.log('Dados recebidos:', data);

    // Support both old `{ resultados: [...] }` format and new top-level array format
    const results = Array.isArray(data) ? data : data.resultados || [];

    const buildUrl = (path) => {
        if (!path) return "https://placehold.co/64x64.png?text=No+Image";
        if (path.startsWith('http')) return path;
        const base = (api && api.defaults && api.defaults.baseURL) ? api.defaults.baseURL.replace(/\/$/, '') : '';
        return base ? `${base}/${path.replace(/^\/+/, '')}` : path;
    };

    let dados: Array<{
        descricao: any;
        tags: any;
        id: any;
        imgAntes: string;
        imgDepois: string;
        genero: any;
        faixaEtaria: any;
        areasAfetadas: any[];
    }> = [];

    for (let i = 0; i < results.length; i++) {
        const item = results[i];

        const metadados = item.metadados || {};

        // image_refs may contain arrays for 'antes', 'depois' and 'durante'
        const refs = item.image_refs || {};
        const antesPath = Array.isArray(refs.antes) && refs.antes.length ? refs.antes[0] : null;
        const depoisPath = Array.isArray(refs.depois) && refs.depois.length ? refs.depois[0] : null;
        const durantePath = Array.isArray(refs.durante) && refs.durante.length ? refs.durante[0] : null;

        const newObj = {
            descricao: item.conteudo_original || item.texto || '',
            tags: metadados.tags || item.tags || [],
            id: item.id || metadados.id_relato,
            imgAntes: buildUrl(antesPath || durantePath) ,
            imgDepois: buildUrl(depoisPath) ,
            genero: metadados.genero || "Não informado",
            faixaEtaria: metadados.faixa_etaria || "Não informado",
            areasAfetadas: metadados.areas_afetadas || [],
        };

        dados.push(newObj);
    }

    return { data: dados };
    } catch (error) {
        console.error("Error in buscarCasosSemelhantesAPI:", error);
        throw error;
    }
};

