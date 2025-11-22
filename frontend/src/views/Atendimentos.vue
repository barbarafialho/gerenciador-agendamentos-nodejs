<template>
  <div>
    <h1>Histórico de Atendimentos</h1>

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
          </tr>
        </thead>

        <tbody>
          <tr v-for="a in lista" :key="a.id">
            <td>{{ formatarData(a.data) }}</td>
            <td>{{ a.hora }}</td>
            <td style="font-weight: 500;">{{ a.nome_cliente }}</td>
            <td>{{ a.nome_profissional }}</td>
            <td>{{ a.nome_servico }}</td>
            <td>
              <span class="status-badge">Concluído</span>
            </td>
          </tr>

          <tr v-if="lista.length === 0">
            <td colspan="6" class="empty-state">
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
import atendimentoService from '@/services/atendimentoService'

const lista = ref([])

onMounted(async () => {
  const res = await atendimentoService.getAll()
  lista.value = res.data
})

function formatarData(dataISO) {
  if(!dataISO) return '-'
  return new Date(dataISO).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.status-badge {
  background: #dcfce7;
  color: #166534;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}
</style>