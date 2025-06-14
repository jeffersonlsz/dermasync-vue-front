
const URL_DEV = 'http://localhost:8000';
const URL_PROD = 'https://dermasync-api-319776447667.southamerica-east1.run.app'; // Replace with your actual production URL
const API_BASE_URL = URL_PROD; // Use URL_PROD for production

export const buscarTodosVideos = async () => {
   const SERVICO = '/buscar-videos'
try {
    const response = await fetch(`${API_BASE_URL}${SERVICO}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Add your request payload here
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
} catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
}
} 