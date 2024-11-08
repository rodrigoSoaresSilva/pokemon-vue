import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/pokemon',
  timeout: 10000,
});

export const getData = async (endpoint, params = {}) => {
    try {
        const response = await api.get(endpoint, { params });

        if (response.status === 200) {
            return { success: true, data: response.data };
        }

        return { success: false, message: 'Erro na resposta da API', data: null };
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

export default api;
