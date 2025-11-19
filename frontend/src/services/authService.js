import api from './api';

const login = async (email, senha) => {
    const response = await api.post('/login', { email, senha });
    // guarda o token
    localStorage.setItem('token', response.data.token)
    return response.data;
}

const cadastro = async (nome, email, senha) => {
    const response = await api.post('/cadastro', { nome, email, senha });
    return response.data;
}

export default {
    login,
    cadastro
}