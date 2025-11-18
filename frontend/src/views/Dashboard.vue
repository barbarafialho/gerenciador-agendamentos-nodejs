<template>
  <div class="dashboard">

    <h1>Dashboard</h1>

    <!-- Card de quantidade -->
    <div class="cards">
      <div class="card-default">
        <h3>Atendimentos Hoje</h3>
        <p class="card-number">{{ atendimentosHoje }}</p>
      </div>
    </div>

    <!-- Tabela -->
    <h2 style="margin-top: 30px;">Atendimentos do Dia</h2>

    <table class="tabela">
      <thead>
        <tr>
          <th class="id-hidden">ID</th>
          <th>Cliente</th>
          <th>Profissional</th>
          <th>Serviço</th>
          <th>Horário</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in atendimentosDia" :key="item.id">
          <td class="id-hidden">{{ item.id }}</td>
          <td>{{ item.nome_cliente }}</td>
          <td>{{ item.nome_profissional }}</td>
          <td>{{ item.nome_servico }}</td>
          <td>{{ item.hora }}</td>
        </tr>

        <tr v-if="atendimentosDia.length === 0">
          <td colspan="5" style="text-align:center; padding: 15px; color:#777;">
            Nenhum atendimento hoje.
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import agendamentoService from '@/services/agendamentoService'

// estado
const atendimentosHoje = ref(0)
const atendimentosDia = ref([])

onMounted(() => {
  carregarDashboard()
})

async function carregarDashboard() {
  try {
    const hoje = new Date().toISOString().split('T')[0]

    // pega todos os atendimentos
    const res = await agendamentoService.getAll()
    const lista = Array.isArray(res.data) ? res.data : []

    // filtra apenas atendimentos do dia
    const hojeLista = lista.filter(a => a.data === hoje)

    atendimentosHoje.value = hojeLista.length
    atendimentosDia.value = hojeLista

  } catch (err) {
    console.error('Erro ao carregar dashboard:', err)
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.card-number {
  font-size: 32px;
  font-weight: bold;
}

/* tabela */
.tabela {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.tabela th {
  background: #1e1e2f;
  color: #fff;
  padding: 12px;
  text-align: left;
}

.tabela td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.tabela tr:hover {
  background: #f8f8f8;
}

/* ID oculto */
.id-hidden {
  display: none;
}
</style>
