<template>
  <div>
    <div class="page-header">
      <h1>Catálogo de Serviços</h1>
      <button class="btn-primary">
        + Novo Serviço
      </button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome do Serviço</th>
            <th style="text-align: right;">Valor</th>
            <th style="width: 50px;"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="s in lista" :key="s.id">
            <td>
              <span class="service-name">{{ s.nome }}</span>
            </td>
            <td style="text-align: right; font-weight: 600; color: #1f2937;">
              R$ {{ Number(s.preco).toFixed(2) }}
            </td>
            <td style="text-align: center;">
              <button class="btn-icon">⋮</button>
            </td>
          </tr>

          <tr v-if="lista.length === 0">
            <td colspan="3" class="empty-state">
              Nenhum serviço cadastrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import servicoService from '@/services/authService'

const lista = ref([])

onMounted(async () => {
  const res = await servicoService.getAll()
  lista.value = res.data
})
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
}

.btn-primary:hover {
  background-color: #be123c;
}

.service-name {
  font-weight: 500;
  color: #111827;
}

.btn-icon {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.2rem;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #6b7280;
}
</style>