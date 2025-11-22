<template>
  <div class="page">
    <h1>Agendamentos</h1>

    <!-- Botão novo -->
    <button class="btn" style="margin: 20px 0;" @click="abrirNovo">
      Novo Agendamento
    </button>

    <!-- Tabela -->
    <table class="tabela">
      <thead>
        <tr>
          <th class="id-hidden">ID</th>
          <th>Cliente</th>
          <th>Profissional</th>
          <th>Serviço</th>
          <th>Data</th>
          <th>Hora</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="a in lista" :key="a.id">
          <td class="id-hidden">{{ a.id }}</td>
          <td>{{ a.nome_cliente }}</td>
          <td>{{ a.nome_profissional }}</td>
          <td>{{ a.nome_servico }}</td>
          <td>{{ a.data }}</td>
          <td>{{ a.hora }}</td>
        </tr>

        <tr v-if="lista.length === 0">
          <td colspan="6" style="text-align:center; padding: 15px; color:#777;">
            Nenhum agendamento encontrado.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import agendamentoService from '@/services/agendamentoService'

const lista = ref([])

onMounted(() => carregar())

async function carregar() {
  const res = await agendamentoService.getAll()
  lista.value = res.data
}

function abrirNovo() {
  alert("Aqui depois você abre um modal ou navega para a página de criação.")
}
</script>

<style scoped>
.page {
  padding: 20px;
}
.id-hidden {
  display: none;
}
</style>
