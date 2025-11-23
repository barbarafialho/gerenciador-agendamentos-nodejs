<template>
  <div class="page-container">
    <h1 class="page-title">{{ isEditing ? 'Editar Profissional' : 'Novo Profissional' }}</h1>

    <div class="form-card">
      <form @submit.prevent="salvar" class="form-grid">
        
        <div class="input-group full-width">
          <label>Nome Completo</label>
          <input type="text" v-model="form.nome_profissional" required placeholder="Ex: Maria Silva" />
        </div>

        <div class="input-group">
          <label>Especialidade</label>
          <input type="text" v-model="form.especialidade" required placeholder="Ex: Manicure" />
        </div>

        <div class="input-group">
          <label>Telefone</label>
          <input type="text" v-model="form.telefone" placeholder="(00) 00000-0000" />
        </div>

        <div class="full-width button-row">
          <button type="button" class="btn-secondary" @click="router.push('/profissionais')">Cancelar</button>
          <button type="submit" class="btn-primary">{{ isEditing ? 'Atualizar' : 'Salvar' }}</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import profissionalService from '@/services/profissionalService';

const router = useRouter();
const route = useRoute();

const form = ref({
  nome_profissional: '',
  especialidade: '',
  telefone: ''
});

const isEditing = computed(() => !!route.params.id);

onMounted(async () => {
  if (isEditing.value) {
    try {
      const res = await profissionalService.getById(route.params.id);
      form.value = res.data;
    } catch (e) {
      alert("Erro ao carregar dados do profissional.");
    }
  }
});

async function salvar() {
  try {
    if (isEditing.value) {
      await profissionalService.update(route.params.id, form.value);
      alert("Atualizado com sucesso!");
    } else {
      await profissionalService.create(form.value);
      alert("Criado com sucesso!");
    }
    router.push('/profissionais');
  } catch (e) {
    alert("Erro ao salvar.");
  }
}
</script>

<style scoped>
.page-container { max-width: 600px; margin: 0 auto; padding: 20px; }
.page-title { color: #881337; font-size: 1.8rem; margin-bottom: 20px; font-weight: 800; }
.form-card { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.full-width { grid-column: 1 / -1; }
.input-group { display: flex; flex-direction: column; }
.input-group label { margin-bottom: 6px; font-weight: 600; color: #374151; font-size: 0.9rem; }
input { padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 1rem; }
input:focus { outline: none; border-color: #e11d48; }
.button-row { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.btn-primary { background: #e11d48; color: white; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }
.btn-secondary { background: #f3f4f6; color: #374151; padding: 10px 20px; border-radius: 8px; border: 1px solid #d1d5db; font-weight: 600; cursor: pointer; }
</style>