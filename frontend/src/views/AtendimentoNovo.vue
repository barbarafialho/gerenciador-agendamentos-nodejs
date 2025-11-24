<template>
  <div class="page-container">
    <h1 class="page-title">{{ isEditing ? 'Editar Atendimento' : 'Registrar Atendimento' }}</h1>
    <p class="page-subtitle">Preencha os dados do cliente, profissional e serviço realizado.</p>

    <!-- Loading -->
    <div v-if="loadingLists" class="loading-box">
      <Loader2 class="spin" size="30" />
      <span>Carregando profissionais e serviços...</span>
    </div>

    <div v-else class="form-card">
      
      <!-- Alerta de Erro -->
      <div v-if="erro" class="alert alert-error">
        <AlertCircle size="18" />
        <span>{{ erro }}</span>
      </div>

      <form @submit.prevent="salvar" class="form-grid">
        
        <!-- Cliente -->
        <div class="input-group full-width">
          <label>Nome do Cliente</label>
          <div class="input-wrapper">
            <User size="20" class="icon" />
            <input type="text" v-model="form.nome_cliente" placeholder="Nome completo" required />
          </div>
        </div>

        <!-- Profissional -->
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

        <!-- Serviço -->
        <div class="input-group">
          <label>Serviço Realizado</label>
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

        <!-- Data -->
        <div class="input-group">
          <label>Data</label>
          <div class="input-wrapper">
            <Calendar size="20" class="icon" />
            <input type="date" v-model="form.data" required />
          </div>
        </div>

        <!-- Hora -->
        <div class="input-group">
          <label>Hora</label>
          <div class="input-wrapper">
            <Clock size="20" class="icon" />
            <input type="time" v-model="form.hora" required />
          </div>
        </div>

        <!-- Status -->
        <div class="input-group">
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

        <!-- Observação -->
        <div class="input-group full-width">
          <label>Observação</label>
          <div class="input-wrapper">
            <FileText size="20" class="icon" />
            <input type="text" v-model="form.observacao" placeholder="Detalhes adicionais (opcional)" />
          </div>
        </div>

        <!-- Botões -->
        <div class="full-width button-row">
          <button type="button" class="btn-secondary" @click="router.push('/atendimentos')">
            Cancelar
          </button>
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="loading" class="loading-state">
              <Loader2 class="spin" size="20" />
              Salvando...
            </span>
            <span v-else>{{ isEditing ? 'Atualizar' : 'Salvar Registro' }}</span>
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
import { User, Calendar, Clock, Users, Scissors, Loader2, AlertCircle, FileText } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const profissionais = ref([])
const servicos = ref([])
const loading = ref(false)
const loadingLists = ref(true)
const erro = ref("")

const form = ref({
  nome_cliente: "",
  fk_profissional: "",
  fk_servico: "",
  data: "",
  hora: "",
  status: "Concluído", // Padrão para atendimento é concluído, mas pode mudar
  observacao: ""
})

const isEditing = computed(() => !!route.params.id)

onMounted(async () => {
  await carregarDados()
})

async function carregarDados() {
  loadingLists.value = true
  erro.value = ""
  
  try {
    // Carrega Listas
    const [resProf, resServ] = await Promise.all([
      profissionalService.getAll(),
      servicoService.getAll()
    ])
    
    profissionais.value = resProf.data || []
    servicos.value = resServ.data || []

    // Se for edição, carrega os dados existentes
    if (isEditing.value) {
      const res = await agendamentoService.getById(route.params.id)
      const dados = res.data
      
      form.value = {
        nome_cliente: dados.nome_cliente,
        fk_profissional: dados.fk_profissional,
        fk_servico: dados.fk_servico,
        data: dados.data ? dados.data.split('T')[0] : '',
        hora: dados.hora,
        status: dados.status,
        observacao: dados.observacao || ''
      }
    }
  } catch (e) {
    console.error("Erro ao carregar dados:", e)
    erro.value = "Erro ao carregar listas ou dados do agendamento."
  } finally {
    loadingLists.value = false
  }
}

async function salvar() {
  try {
    loading.value = true
    
    // Monta o payload garantindo que observação não seja null
    const payload = {
      ...form.value,
      observacao: form.value.observacao || ""
    }

    if (isEditing.value) {
      await agendamentoService.update(route.params.id, payload)
      alert("Registro atualizado com sucesso!")
    } else {
      await agendamentoService.create(payload)
      alert("Atendimento registrado com sucesso!")
    }
    router.push('/atendimentos')
  } catch (e) {
    console.error(e)
    erro.value = "Erro ao salvar. Verifique se todos os campos obrigatórios estão preenchidos."
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
.loading-box { text-align: center; padding: 50px; color: #881337; display: flex; flex-direction: column; gap: 10px; align-items: center; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.full-width { grid-column: 1 / -1; }
.input-group { display: flex; flex-direction: column; }
.input-group label { font-weight: 600; color: #374151; margin-bottom: 8px; font-size: 0.9rem; }
.input-wrapper { position: relative; }
.input-wrapper .icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
input, select { width: 100%; padding: 10px 10px 10px 40px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; appearance: none; font-size: 1rem; }
input:focus, select:focus { outline: none; border-color: #e11d48; box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1); background-color: white; }
.button-row { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.btn-primary { background-color: #e11d48; color: white; padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
.btn-secondary { background-color: #f3f4f6; color: #4b5563; padding: 12px 24px; border-radius: 8px; border: 1px solid #d1d5db; cursor: pointer; font-weight: 600; }
.loading-state { display: flex; align-items: center; justify-content: center; gap: 8px; }
.spin { animation: spin 1s linear infinite; }
.alert { padding: 12px; border-radius: 8px; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; background-color: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
</style>