<template>
  <div>
    <div class="page-header">
      <h1>Histórico de Atendimentos</h1>
      <button class="btn-primary" @click="router.push('/agendamento-novo')">
        + Novo Agendamento
      </button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Cliente</th>
            <th>Profissional</th>
            <th>Serviço</th>
            <th>Status</th>
            <th style="text-align: center;">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="a in lista" :key="a.id">
            <td>{{ formatarData(a.data) }}</td>
            <td>{{ a.hora }}</td>
            <td style="font-weight: 600;">{{ a.nome_cliente }}</td>
            <td>{{ a.nome_profissional }}</td>
            <td>{{ a.nome_servico }}</td>
            <td>
              <span :class="['status-badge', getStatusClass(a.status)]">
                {{ a.status || 'Agendado' }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn-icon edit" @click="editar(a.id)" title="Editar Status/Detalhes">
                  <Edit size="18" />
                </button>
                <button class="btn-icon delete" @click="excluir(a.id)" title="Excluir">
                  <Trash2 size="18" />
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="lista.length === 0">
            <td colspan="7" class="empty-state">
              Nenhum atendimento registrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import agendamentoService from '@/services/agendamentoService'
import { Trash2, Edit } from 'lucide-vue-next'

const router = useRouter()
const lista = ref([])

onMounted(async () => {
  try {
    const res = await agendamentoService.getAll()
    lista.value = res.data
  } catch (error) {
    console.error("Erro ao carregar atendimentos", error)
  }
})

function formatarData(dataISO) {
  if(!dataISO) return '-'
  const [ano, mes, dia] = dataISO.split('T')[0].split('-')
  return `${dia}/${mes}/${ano}`
}

function getStatusClass(status) {
  switch (status) {
    case 'Concluído': return 'status-success';
    case 'Cancelado': return 'status-error';
    case 'Em Andamento': return 'status-warning';
    case 'Confirmado': return 'status-info';
    default: return 'status-neutral';
  }
}

function editar(id) {
  router.push(`/agendamento-novo/${id}`)
}

async function excluir(id) {
  if(!confirm("Tem certeza que deseja excluir este agendamento?")) return;
  
  try {
    await agendamentoService.remove(id)
    lista.value = lista.value.filter(a => a.id !== id)
  } catch (e) {
    alert("Erro ao excluir o agendamento.")
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: #e11d48;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
  box-shadow: 0 4px 6px rgba(225, 29, 72, 0.2);
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #be123c;
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  overflow: hidden;
  overflow-x: auto; 
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th {
  background-color: #ffe4e6;
  color: #881337;
  padding: 16px;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
}

td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: 0.2s;
}

.btn-icon.edit {
  color: #2563eb;
}

.btn-icon.edit:hover {
  background-color: #eff6ff;
}

.btn-icon.delete {
  color: #dc2626;
}

.btn-icon.delete:hover {
  background-color: #fef2f2;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
}

.status-success { background-color: #dcfce7; color: #166534; }
.status-error { background-color: #fee2e2; color: #991b1b; }
.status-warning { background-color: #fef9c3; color: #854d0e; }
.status-info { background-color: #dbeafe; color: #1e40af; }
.status-neutral { background-color: #f3f4f6; color: #4b5563; }

.empty-state {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}
</style>