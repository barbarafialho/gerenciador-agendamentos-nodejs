<template>
  <div>
    <div class="page-header">
      <h1>Agenda de Horários</h1>
      <button class="btn-primary" @click="router.push('/agendamento-novo')">
        + Marcar Horário
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
            <th>Status</th>
            <th style="text-align: center;">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="a in lista" :key="a.id">
            <td>{{ formatarData(a.data) }}</td>
            <td style="font-weight: bold; color: #e11d48;">{{ a.hora }}</td>
            <td>{{ a.nome_cliente }}</td>
            <td>{{ a.nome_profissional }}</td>
            <td>
              <span :class="['status-badge', getStatusClass(a.status)]">
                {{ a.status || 'Agendado' }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="btn-icon edit" @click="editar(a.id)"><Edit size="18" /></button>
                <button class="btn-icon delete" @click="excluir(a.id)"><Trash2 size="18" /></button>
              </div>
            </td>
          </tr>
          <tr v-if="lista.length === 0">
            <td colspan="6" class="empty-state">Nenhum agendamento encontrado.</td>
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
  } catch (e) { console.error(e) }
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
    default: return 'status-neutral';
  }
}

function editar(id) {
  router.push(`/agendamento-novo/${id}`)
}

async function excluir(id) {
  if(!confirm("Cancelar agendamento?")) return;
  try {
    await agendamentoService.remove(id)
    lista.value = lista.value.filter(a => a.id !== id)
  } catch (e) { alert("Erro ao excluir") }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.btn-primary { background: #e11d48; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
th { background: #ffe4e6; color: #881337; padding: 16px; text-align: left; }
td { padding: 16px; border-bottom: 1px solid #f3f4f6; }
.actions { display: flex; gap: 10px; justify-content: center; }
.btn-icon { background: none; border: none; cursor: pointer; padding: 5px; }
.btn-icon.edit { color: #2563eb; } .btn-icon.delete { color: #dc2626; }
.status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
.status-success { background: #dcfce7; color: #166534; }
.status-error { background: #fee2e2; color: #991b1b; }
.status-neutral { background: #f3f4f6; color: #4b5563; }
.empty-state { text-align: center; padding: 40px; color: #9ca3af; }
</style>