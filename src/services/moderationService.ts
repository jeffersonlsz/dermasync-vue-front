import api from '../lib/api';

export const getPendingRelatos = async () => {
    const response = await api.get('/relatos/moderation/pending');
    return response.data;
};

export const getRelatoById = async (id: string) => {
    const response = await api.get(`/relatos/${id}`);
    return response.data;
};

export const moderateRelato = async (id: string, action: string) => {
    const response = await api.post(`/relatos/${id}/moderate/${action}`);
    return response.data;
};
