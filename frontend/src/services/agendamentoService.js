import api from './api'

const getAll = () => api.get('/agendamentos')
const getById = (id) => api.get(`/agendamentos/${id}`)
const create = (data) => api.post('/agendamentos', data)
const update = (id, data) => api.put(`/agendamentos/${id}`, data)
const remove = (id) => api.post(`/agendamentos/delete/${id}`)

export default {
  getAll,
  getById,
  create,
  update,
  remove
}