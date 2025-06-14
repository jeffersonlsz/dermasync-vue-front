
const URL_DEV = 'http://localhost:8080';
const URL_PROD = 'https://dermasync-api-319776447667.southamerica-east1.run.app'; // Replace with your actual production URL
const API_BASE_URL = URL_PROD; // Use URL_PROD for production


export const buscarCasosSemelhantesAPI = async (info) => { 
    console.log(`USANDO API PARA BUSCAR: ${info.tags.slice(1)}`);
    
    let resposta = await fetch(`${API_BASE_URL}/buscar-por-tags`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
             {
                "tags": info.tags.slice(1), // Remove the first tag (usually 'coceira')
                "modo": "or",
                "k": 5,
                "collection_name": "string",
                "log": false
                }
        )
    });

    if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
    }

    const data = await resposta.json();
    console.log('Dados recebidos:', data);

    // Example usage of the query parameter (you can modify this logic as needed)
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
    for (let i = 0; i < data.resultados.length; i++) {
        let newObj = {
            descricao: data.resultados[i].texto,
            tags: data.resultados[i].metadados ,
            id: data.resultados[i].metadados.id_relato,
            imgAntes: "https://placehold.co/64x64.png?text=Img1",
            imgDepois: "https://placehold.co/64x64.png?text=Img2",
            genero: data.resultados[i].metadados.genero || "Não informado",
            faixaEtaria: data.resultados[i].metadados.faixa_etaria || "Não informado",
            areasAfetadas: data.resultados[i].metadados.areas_afetadas || ["braços", "pernas", "costas"],
        }
        dados.push(newObj);
    }

    const mockData = [
        {
            imgAntes: "https://placehold.co/64x64.png?text=Img1",
            imgDepois: "https://placehold.co/64x64.png?text=Img2",
            genero: "Feminino",
            faixaEtaria: "Adulto",
            areasAfetadas: ["braços", "pernas", "costas"],
            descricao: data.resultados[0].texto
        },
        {
            imgAntes: "https://placehold.co/64x64.png?text=Img1",
            imgDepois: "https://placehold.co/64x64.png?text=Img2",
            genero: "Masculino",
            faixaEtaria: "Criança",
            areasAfetadas: ["rosto"],
            descricao: data.resultados[1].texto
        },
        {
            imgAntes: "https://placehold.co/64x64.png?text=Img1",
            imgDepois: "https://placehold.co/64x64.png?text=Img2",
            genero: "Não informado",
            faixaEtaria: "Adolescente",
            areasAfetadas: ["pernas", "pescoco"],
            descricao: "Passei vários tratamentos até encontrar um remédio de cacau que realmente funcionou para minha coceira. Foi um alívio enorme.",
        },
    ];

    // Filter mock data based on the query (example logic)
    return {'data' : dados};
};


/* export const buscarCasosSemelhantesAPI = async (query: string): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/casos/semelhantes`, {
            params: { query },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching similar cases:', error);
        throw error;
    }
}; */