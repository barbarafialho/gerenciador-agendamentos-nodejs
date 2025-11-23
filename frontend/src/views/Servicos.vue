<template>
  <div>
    <div class="page-header">
      <h1>Catálogo de Serviços</h1>
      <button class="btn-primary" @click="router.push('/servico-novo')">
        + Novo Serviço
      </button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th style="text-align: center;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in lista" :key="s.id">
            <td class="fw-bold">{{ s.nome_servico }}</td>
            <td class="text-gray">{{ s.descricao_servico || '-' }}</td>
            <td class="text-price">R$ {{ Number(s.preco_servico).toFixed(2) }}</td>
            <td style="text-align: center;">
              <div class="actions">
                <button class="btn-icon edit" @click="editar(s.id)" title="Editar">
                  <Edit size="18" />
                </button>
                <button class="btn-icon delete" @click="excluir(s.id)" title="Excluir">
                  <Trash2 size="18" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="lista.length === 0">
            <td colspan="4" class="empty-state">Nenhum serviço cadastrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import servicoService from '@/services/servicoService'
import { Edit, Trash2 } from 'lucide-vue-next'

const router = useRouter()
const lista = ref([])

onMounted(carregar)

async function carregar() {
  try {
    const res = await servicoService.getAll()
    lista.value = res.data
  } catch (e) {
    console.error("Erro ao carregar serviços", e);
  }
}

function editar(id) {
  router.push(`/servico-novo/${id}`)
}

async function excluir(id) {
  if(!confirm("Excluir este serviço?")) return;
  try {
    await servicoService.remove(id)
    lista.value = lista.value.filter(s => s.id !== id)
  } catch(e) {
    alert("Erro ao excluir.")
  }
}
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.btn-primary { background: #e11d48; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.table-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
th { background: #ffe4e6; color: #881337; padding: 16px; text-align: left; font-size: 0.9rem; }
td { padding: 16px; border-bottom: 1px solid #f3f4f6; }
.actions { display: flex; gap: 8px; justify-content: center; }
.btn-icon { background: none; border: none; cursor: pointer; padding: 6px; border-radius: 4px; }
.btn-icon.edit { color: #2563eb; } .btn-icon.delete { color: #dc2626; }
.empty-state { text-align: center; color: #9ca3af; padding: 30px; }
.fw-bold { font-weight: 600; color: #1f2937; }
.text-price { font-weight: 700; color: #059669; }
.text-gray { color: #6b7280; font-size: 0.9rem; }
</style>