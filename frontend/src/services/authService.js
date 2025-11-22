import api from './api';

const login = async (email, senha) => {
    const response = await api.post('/login', { email, senha });
    localStorage.setItem('token', response.data.token);
    return response.data;
}

const cadastro = async ({ email, senha }) => {
    const response = await api.post('/cadastro', { email, senha });
    return response.data;
}

export default {
    login,
    cadastro
}
