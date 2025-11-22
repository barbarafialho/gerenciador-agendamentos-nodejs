<script setup>
import { ref, onMounted } from 'vue'
import agendamentoService from '@/services/agendamentoService'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { Calendar, Scissors, Users } from 'lucide-vue-next'

const carregando = ref(true)
const erro = ref("")
const atendimentosHoje = ref(0)
const profissionais = ref(0)
const servicos = ref(0)
const lista = ref([])

onMounted(() => carregar())

async function carregar() {
  try {
    carregando.value = true
    const hoje = new Date().toISOString().split('T')[0]
    const res = await agendamentoService.getAll()
    const dados = res.data || []

    lista.value = dados.filter(a => a.data === hoje)
    atendimentosHoje.value = lista.value.length
    profissionais.value = new Set(dados.map(a => a.nome_profissional)).size
    servicos.value = new Set(dados.map(a => a.nome_servico)).size

  } catch (e) {
    erro.value = "Não foi possível carregar os dados."
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="dashboard-container">
    <div class="header-area">
      <h1>Visão Geral</h1>
      <p class="date-display">{{ new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) }}</p>
    </div>

    <div v-if="carregando" class="loading-area"><LoadingSpinner /></div>

    <div v-else>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="icon-box pink"><Calendar /></div>
          <div class="stat-info">
            <h3>Agendamentos Hoje</h3>
            <p class="stat-value">{{ atendimentosHoje }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="icon-box purple"><Users /></div>
          <div class="stat-info">
            <h3>Profissionais</h3>
            <p class="stat-value">{{ profissionais }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="icon-box rose"><Scissors /></div>
          <div class="stat-info">
            <h3>Serviços Ativos</h3>
            <p class="stat-value">{{ servicos }}</p>
          </div>
        </div>
      </div>

      <div class="recent-section">
        <h2>Próximos Atendimentos</h2>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Horário</th>
                <th>Cliente</th>
                <th>Profissional</th>
                <th>Serviço</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in lista" :key="item.id">
                <td style="font-weight: bold; color: #e11d48;">{{ item.hora }}</td>
                <td>{{ item.nome_cliente }}</td>
                <td>{{ item.nome_profissional }}</td>
                <td>
                  <span class="badge">{{ item.nome_servico }}</span>
                </td>
              </tr>
              <tr v-if="lista.length === 0">
                <td colspan="4" class="empty-state">Nenhum atendimento para hoje.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-area {
  margin-bottom: 30px;
}

.date-display {
  color: #6b7280;
  text-transform: capitalize;
  margin-top: -10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  border: 1px solid #fce7f3;
}

.icon-box {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-box.pink { background: #ec4899; }
.icon-box.purple { background: #8b5cf6; }
.icon-box.rose { background: #e11d48; }

.stat-info h3 {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
}

.recent-section h2 {
  font-size: 1.2rem;
  color: #374151;
  margin-bottom: 16px;
}

.badge {
  background: #fce7f3;
  color: #9d174d;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}
</style>