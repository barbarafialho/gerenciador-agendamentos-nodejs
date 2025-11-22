<template>
  <div class="page">
    <h1>Novo Agendamento</h1>

    <AlertaErro v-if="erro" :mensagem="erro" />
    <LoadingSpinner v-if="carregando" />

    <form v-if="!carregando" @submit.prevent="salvar" class="form">

      <InputBase label="Cliente" v-model="form.cliente" />
      <InputBase label="Profissional" v-model="form.profissional" />
      <InputBase label="Serviço" v-model="form.servico" />
      <InputBase label="Data" type="date" v-model="form.data" />
      <InputBase label="Hora" type="time" v-model="form.hora" />

      <button class="btn">Salvar</button>
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import agendamentoService from '@/services/agendamentoService'

import InputBase from '@/components/InputBase.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import AlertaErro from '@/components/AlertaErro.vue'

const form = ref({
  cliente: "",
  profissional: "",
  servico: "",
  data: "",
  hora: ""
})

const carregando = ref(false)
const erro = ref("")

async function salvar() {
  try {
    carregando.value = true
    await agendamentoService.create(form.value)
    alert("Agendamento criado!")
  } catch (e) {
    erro.value = "Erro ao salvar o agendamento."
  } finally {
    carregando.value = false
  }
}
</script>

<style scoped>
.page {
  max-width: 500px;
}
.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
