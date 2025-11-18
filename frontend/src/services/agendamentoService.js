import api from './api'

const getAll = () => api.get('/agendamentos')

const create = (data) => api.post('/agendamentos', data)

const update = (id, data) => api.put(`/agendamentos/${id}`, data)

const remove = (id) => api.post(`/agendamentos/delete/${id}`)

export default {
  getAll,
  create,
  update,
  remove
}
