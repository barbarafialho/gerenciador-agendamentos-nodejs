import api from './api'

const getAll = () => api.get('/profissionais')
const getById = (id) => api.get(`/profissionais/${id}`)
const create = (data) => api.post('/profissionais', data)
const update = (id, data) => api.put(`/profissionais/${id}`, data)
const remove = (id) => api.post(`/profissionais/delete/${id}`)

export default {
    getAll,
    getById,
    create,
    update,
    remove
}