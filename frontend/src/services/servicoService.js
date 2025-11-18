import api from './api'

const getAll = () => api.get('/servicos')

const getById = (id) => api.get(`/servicos/${id}`)

const create = (data) => api.post('/servicos', data)

const update = (id, data) => api.put(`/servicos/${id}`, data)

const remove = (id) => api.post(`/servicos/delete/${id}`)

export default {
  getAll,
  getById,
  create,
  update,
  remove
}
