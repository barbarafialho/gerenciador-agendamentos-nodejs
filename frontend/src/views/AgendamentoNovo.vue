<template>
  <div class="page-container">
    <h1 class="page-title">{{ isEditing ? 'Editar Agendamento' : 'Novo Agendamento' }}</h1>
    <p class="page-subtitle">Gerencie os detalhes e o status da marcação.</p>

    <div v-if="loadingLists" class="loading-box">
      <Loader2 class="spin" size="30" />
      <span>Carregando dados...</span>
    </div>

    <div v-else class="form-card">
      <form @submit.prevent="salvar" class="form-grid">
        
        <div class="input-group full-width">
          <label>Nome da Cliente</label>
          <div class="input-wrapper">
            <User size="20" class="icon" />
            <input type="text" v-model="form.nome_cliente" placeholder="Nome completo" required />
          </div>
        </div>
        
        <div class="input-group">
          <label>Profissional</label>
          <div class="input-wrapper">
            <Users size="20" class="icon" />
            <select v-model="form.fk_profissional" required>
              <option value="" disabled>Selecione...</option>
              <option v-for="p in profissionais" :key="p.id" :value="p.id">
                {{ p.nome_profissional }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="input-group">
          <label>Serviço</label>
          <div class="input-wrapper">
            <Scissors size="20" class="icon" />
            <select v-model="form.fk_servico" required>
              <option value="" disabled>Selecione...</option>
              <option v-for="s in servicos" :key="s.id" :value="s.id">
                {{ s.nome_servico }} (R$ {{ Number(s.preco_servico).toFixed(2) }})
              </option>
            </select>
          </div>
        </div>

        <div class="input-group">
          <label>Data</label>
          <div class="input-wrapper">
            <Calendar size="20" class="icon" />
            <input type="date" v-model="form.data" required />
          </div>
        </div>

        <div class="input-group">
          <label>Hora</label>
          <div class="input-wrapper">
            <Clock size="20" class="icon" />
            <input type="time" v-model="form.hora" required />
          </div>
        </div>

        <div class="input-group full-width">
          <label>Status</label>
          <div class="input-wrapper">
            <select v-model="form.status" required style="font-weight: bold; color: #be123c;">
              <option value="Agendado">Agendado</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div class="full-width button-row">
          <button type="button" class="btn-secondary" @click="router.push('/atendimentos')">
            Cancelar
          </button>
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="loading" class="loading-state">
              <Loader2 class="spin" size="20" />
              Salvar
            </span>
            <span v-else>{{ isEditing ? 'Atualizar' : 'Confirmar' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import agendamentoService from '@/services/agendamentoService'
import profissionalService from '@/services/profissionalService'
import servicoService from '@/services/servicoService'
import { User, Calendar, Clock, Users, Scissors, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const profissionais = ref([])
const servicos = ref([])
const loading = ref(false)
const loadingLists = ref(true)

const form = ref({
  nome_cliente: "",
  fk_profissional: "",
  fk_servico: "",
  data: "",
  hora: "",
  status: "Agendado"
})

const isEditing = computed(() => !!route.params.id)

onMounted(async () => {
  await carregarDados()
})

async function carregarDados() {
  loadingLists.value = true
  try {
    const [resProf, resServ] = await Promise.all([
      profissionalService.getAll(),
      servicoService.getAll()
    ])
    profissionais.value = resProf.data
    servicos.value = resServ.data

    if (isEditing.value) {
      const resAgendamento = await agendamentoService.getById(route.params.id)
      const dados = resAgendamento.data
      
      form.value = {
        nome_cliente: dados.nome_cliente,
        fk_profissional: dados.fk_profissional,
        fk_servico: dados.fk_servico,
        data: dados.data ? dados.data.split('T')[0] : '',
        hora: dados.hora,
        status: dados.status || 'Agendado'
      }
    }
  } catch (e) {
    alert("Erro ao carregar dados.")
  } finally {
    loadingLists.value = false
  }
}

async function salvar() {
  try {
    loading.value = true
    if (isEditing.value) {
      await agendamentoService.update(route.params.id, form.value)
      alert("Agendamento atualizado!")
    } else {
      await agendamentoService.create(form.value)
      alert("Agendamento criado!")
    }
    router.push('/atendimentos') 
  } catch (e) {
    alert("Erro ao salvar o agendamento.")
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-container { max-width: 800px; margin: 0 auto; padding: 20px; }
.page-title { color: #881337; font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
.page-subtitle { color: #6b7280; margin-bottom: 30px; }
.form-card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); }
.loading-box { text-align: center; padding: 50px; color: #881337; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.input-group { display: flex; flex-direction: column; }
.input-group label { font-weight: 600; color: #374151; margin-bottom: 8px; font-size: 0.9rem; }
.input-wrapper { position: relative; }
.input-wrapper .icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
input, select { width: 100%; padding: 10px 10px 10px 40px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 1rem; background-color: #f9fafb; appearance: none; }
input:focus, select:focus { outline: none; border-color: #e11d48; box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1); background-color: white; }
.full-width { grid-column: 1 / -1; }
.button-row { display: flex; justify-content: flex-end; gap: 16px; margin-top: 20px; }
.btn-primary { background-color: #e11d48; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.btn-secondary { background-color: #f3f4f6; color: #4b5563; border: 1px solid #d1d5db; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.loading-state { display: flex; align-items: center; justify-content: center; gap: 8px; }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
</style>