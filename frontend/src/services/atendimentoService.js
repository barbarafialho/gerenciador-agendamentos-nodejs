import api from './api'

const addItem = (data) => api.post('/atendimentos', data)

const getItensByAgendamento = (idAgendamento) =>
  api.get(`/agendamentos/${idAgendamento}/itens`)

const removeItem = (id) => api.post(`/atendimentos/delete/${id}`)

export default {
  addItem,
  getItensByAgendamento,
  removeItem
}
