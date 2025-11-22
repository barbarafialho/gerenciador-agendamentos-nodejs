<script setup>
import { ref, onMounted } from 'vue';
import profissionalApi from '../api/profissionalApi';
import { User } from 'lucide-vue-next';

const profissionais = ref([]);

onMounted(async () => {
    const res = await profissionalApi.getAll();
    profissionais.value = res.data;
});
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Nossa Equipe</h1>
      <button class="btn-add">+ Adicionar Profissional</button>
    </div>
    
    <div class="grid-profissionais">
      <div v-for="p in profissionais" :key="p.id" class="card-profissional">
        <div class="avatar-placeholder">
          <User size="32" />
        </div>
        <h3 class="nome">{{ p.nome }}</h3>
        <p class="cargo">Especialista</p>
        <button class="btn-ver">Ver Agenda</button>
      </div>

      <div v-if="profissionais.length === 0" class="no-data">
        Nenhum profissional encontrado.
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-add {
  background: #fff;
  border: 1px solid #e11d48;
  color: #e11d48;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-add:hover {
  background: #fff1f2;
}

.grid-profissionais {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

.card-profissional {
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  border: 1px solid #fce7f3;
  transition: transform 0.2s;
}

.card-profissional:hover {
  transform: translateY(-5px);
  border-color: #e11d48;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  background: #ffe4e6;
  color: #be123c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.nome {
  font-size: 1.1rem;
  color: #1f2937;
  margin-bottom: 4px;
}

.cargo {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 20px;
}

.btn-ver {
  width: 100%;
  padding: 8px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  color: #4b5563;
  font-size: 0.85rem;
  font-weight: 500;
}

.btn-ver:hover {
  background: #e5e7eb;
  color: #111827;
}

.no-data {
  grid-column: 1 / -1;
  text-align: center;
  color: #9ca3af;
  padding: 40px;
}
</style>