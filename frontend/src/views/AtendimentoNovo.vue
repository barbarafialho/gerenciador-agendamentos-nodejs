<template>
  <div class="page-container">
    <h1 class="page-title">{{ isEditing ? 'Editar Atendimento' : 'Registrar Atendimento' }}</h1>
    <p class="page-subtitle">Adicione serviços realizados a um agendamento existente.</p>

    <div v-if="loadingLists" class="loading-box">
      <Loader2 class="spin" size="30" />
      <span>Carregando dados...</span>
    </div>

    <div v-else class="form-card">
      
      <div v-if="erro" class="alert alert-error">
        <AlertCircle size="18" />
        <span>{{ erro }}</span>
      </div>

      <form @submit.prevent="salvar" class="form-grid">
        
        <!-- Seleção do Agendamento (FK) -->
        <div class="input-group full-width">
          <label>Vincular ao Agendamento</label>
          <div class="input-wrapper">
            <Calendar size="20" class="icon" />
            <select v-model="form.fk_agendamento" required :disabled="isEditing">
              <option value="" disabled>Selecione o cliente/horário...</option>
              <option v-for="a in agendamentos" :key="a.id" :value="a.id">
                {{ formatarData(a.data) }} às {{ a.hora }} - {{ a.nome_cliente }} ({{ a.status }})
              </option>
            </select>
          </div>
        </div>

        <!-- Seleção do Serviço (FK) -->
        <div class="input-group">
          <label>Serviço Realizado</label>
          <div class="input-wrapper">
            <Scissors size="20" class="icon" />
            <select v-model="form.fk_servico" required @change="atualizarPreco">
              <option value="" disabled>Selecione o serviço...</option>
              <option v-for="s in servicos" :key="s.id" :value="s.id">
                {{ s.nome_servico }}
              </option>
            </select>
          </div>
        </div>

        <!-- Preço Final -->
        <div class="input-group">
          <label>Preço Final (R$)</label>
          <div class="input-wrapper">
            <DollarSign size="20" class="icon" />
            <input type="number" step="0.01" v-model="form.preco_final" required />
          </div>
        </div>

        <!-- Observação -->
        <div class="input-group full-width">
          <label>Observações do Atendimento</label>
          <div class="input-wrapper">
            <FileText size="20" class="icon" />
            <input type="text" v-model="form.observacao" placeholder="Ex: Desconto aplicado, produto extra usado..." />
          </div>
        </div>

        <div class="full-width button-row">
          <button type="button" class="btn-secondary" @click="router.push('/atendimentos')">Cancelar</button>
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="loading" class="loading-state">
              <Loader2 class="spin" size="20" />
              Salvando...
            </span>
            <span v-else>{{ isEditing ? 'Atualizar' : 'Salvar' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import atendimentoService from '@/services/atendimentoService'
import agendamentoService from '@/services/agendamentoService'
import servicoService from '@/services/servicoService'
import { Calendar, Scissors, DollarSign, FileText, Loader2, AlertCircle, User } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const agendamentos = ref([])
const servicos = ref([])
const loading = ref(false)
const loadingLists = ref(true)
const erro = ref("")

const form = ref({
  fk_agendamento: "",
  fk_servico: "",
  preco_final: "",
  observacao: ""
})

const isEditing = computed(() => !!route.params.id)

onMounted(async () => {
  await carregarListas()
})

async function carregarListas() {
  loadingLists.value = true
  erro.value = ""

  try {
    // Busca Agendamentos e Serviços para preencher os Selects
    const [resAgend, resServ] = await Promise.all([
      agendamentoService.getAll(), 
      servicoService.getAll()      
    ])
    
    agendamentos.value = resAgend.data || []
    servicos.value = resServ.data || []

    if (isEditing.value) {
      try {
        const res = await atendimentoService.getById(route.params.id)
        const dados = res.data
        
        if (!dados) {
           throw new Error("Atendimento não encontrado")
        }

        form.value = {
          fk_agendamento: dados.fk_agendamento,
          fk_servico: dados.fk_servico,
          preco_final: dados.preco_final,
          observacao: dados.observacao || ""
        }
      } catch (e) {
        console.error("Erro ao buscar atendimento para edição:", e)
        erro.value = "Atendimento não encontrado ou erro ao carregar. Verifique o ID."
      }
    }
  } catch (e) {
    erro.value = "Erro ao carregar listas de dados (Agendamentos/Serviços)."
    console.error(e)
  } finally {
    loadingLists.value = false
  }
}

function atualizarPreco() {
  const servicoSelecionado = servicos.value.find(s => s.id === form.value.fk_servico)
  if (servicoSelecionado) {
    form.value.preco_final = servicoSelecionado.preco_servico
  }
}

function formatarData(dataISO) {
  if(!dataISO) return ''
  const [ano, mes, dia] = dataISO.split('T')[0].split('-')
  return `${dia}/${mes}/${ano}`
}

async function salvar() {
  try {
    loading.value = true
    erro.value = ""
    
    const payload = { ...form.value, observacao: form.value.observacao || "" }
    
    if (isEditing.value) {
      // Usamos o ID da rota para a atualização
      await atendimentoService.update(route.params.id, payload)
      alert("Atendimento atualizado!")
    } else {
      // Criação de um novo registro na tabela atendimento (N:M)
      await atendimentoService.create(payload)
      alert("Atendimento registrado com sucesso!")
    }
    router.push('/atendimentos')
  } catch (e) {
    console.error("Erro ao salvar:", e)
    erro.value = "Erro ao salvar: " + (e.response?.data?.message || "Verifique os dados e a conexão.")
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