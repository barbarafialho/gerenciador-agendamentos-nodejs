import api from './api'

const getAll = () => api.get('/atendimentos')

const getById = (id) => api.get(`/atendimentos/${id}`)

const create = (data) => api.post('/atendimentos', data)

const update = (id, data) => api.put(`/atendimentos/${id}`, data)

const remove = (id) => api.post(`/atendimentos/delete/${id}`)

const getItensByAgendamento = (idAgendamento) =>
  api.get(`/agendamentos/${idAgendamento}/itens`)

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getItensByAgendamento
}