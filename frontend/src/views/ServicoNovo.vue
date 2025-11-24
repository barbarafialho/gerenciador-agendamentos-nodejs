<template>
  <div class="page-container">
    <h1 class="page-title">{{ isEditing ? 'Editar Serviço' : 'Novo Serviço' }}</h1>

    <div class="form-card">
      <form @submit.prevent="salvar" class="form-grid">
        
        <div class="input-group full-width">
          <label>Nome do Serviço</label>
          <input type="text" v-model="form.nome_servico" required />
        </div>

        <div class="input-group full-width">
          <label>Descrição</label>
          <input type="text" v-model="form.descricao_servico" />
        </div>

        <div class="input-group">
          <label>Preço (R$)</label>
          <input type="number" step="0.01" v-model="form.preco_servico" required />
        </div>

        <div class="input-group">
          <label>Profissional Responsável</label>
          <select v-model="form.fk_profissional" required>
            <option value="" disabled>Selecione...</option>
            <option v-for="p in profissionais" :key="p.id" :value="p.id">
              {{ p.nome_profissional }}
            </option>
          </select>
        </div>

        <div class="full-width button-row">
          <button type="button" class="btn-secondary" @click="router.push('/servicos')">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import servicoService from '@/services/servicoService';
import profissionalService from '@/services/profissionalService';

const router = useRouter();
const route = useRoute();
const isEditing = computed(() => !!route.params.id);

const profissionais = ref([]);
const form = ref({
  nome_servico: '',
  descricao_servico: '',
  preco_servico: '',
  fk_profissional: ''
});

onMounted(async () => {
  // Carrega profissionais para o dropdown
  const resProf = await profissionalService.getAll();
  profissionais.value = resProf.data;

  // Se for edição, carrega dados do serviço
  if (isEditing.value) {
    const resServ = await servicoService.getById(route.params.id);
    form.value = resServ.data;
  }
});

async function salvar() {
  try {
    if (isEditing.value) {
      await servicoService.update(route.params.id, form.value);
    } else {
      await servicoService.create(form.value);
    }
    router.push('/servicos');
  } catch (e) {
    alert("Erro ao salvar serviço.");
  }
}
</script>

<style scoped>
.page-container { max-width: 600px; margin: 0 auto; padding: 20px; }
.page-title { color: #881337; font-size: 1.8rem; margin-bottom: 20px; }
.form-card { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.full-width { grid-column: 1 / -1; }
.input-group { display: flex; flex-direction: column; }
.input-group label { margin-bottom: 6px; font-weight: 600; color: #374151; }
input, select { padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; width: 100%; background: white; }
input:focus, select:focus { outline: none; border-color: #e11d48; }
.button-row { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.btn-primary { background: #e11d48; color: white; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; }
.btn-secondary { background: #f3f4f6; color: #374151; padding: 10px 20px; border-radius: 8px; border: 1px solid #d1d5db; cursor: pointer; }
</style>