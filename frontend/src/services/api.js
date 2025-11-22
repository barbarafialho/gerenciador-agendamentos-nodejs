import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    // quando a resposta dá certo (2xx)
    response => response, 

    // quando há erro
    error => { 
        if (error.response?.status === 401) {
            console.log("Token inválido, redirecionando para login...");
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else if (error.response?.status === 500) {
            console.log("Erro de servidor, tente novamente");
        } else {
            console.log("Erro", error.message);
        }
        return Promise.reject(error); 
    }
);

export default api;