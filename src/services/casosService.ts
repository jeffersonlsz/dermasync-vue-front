

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL


export const buscarCasosSemelhantesAPI = async (info) => { 
    console.log(`USANDO API PARA BUSCAR: ${info.descricao}`);
    
    

    // Example usage of the query parameter (you can modify this logic as needed)
    const mockData = [
        {
            imgAntes: "https://placehold.co/64x64.png?text=Img1",
            imgDepois: "https://placehold.co/64x64.png?text=Img2",
            genero: "Feminino",
            faixaEtaria: "Adulto",
            areasAfetadas: ["braços", "pernas", "costas"],
            descricao: "Eu tinha uma coceira insuportável que não passava. Depois de anos tentando de tudo, descobri um creme milagroso que mudou minha vida "
        },
        {
            imgAntes: "https://placehold.co/64x64.png?text=Img1",
            imgDepois: "https://placehold.co/64x64.png?text=Img2",
            genero: "Masculino",
            faixaEtaria: "Criança",
            areasAfetadas: ["rosto"],
            descricao: "Sofri por anos até descobrir um hidratante de babosa que aliviou muito a minha coceira. Graças a deus.",
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
    return {'data' : mockData};
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