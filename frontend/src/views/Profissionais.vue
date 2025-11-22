<script setup>
import { ref, onMounted } from 'vue';
import profissionalService from '../services/profissionalService';
import { User } from 'lucide-vue-next';

const profissionais = ref([]);

onMounted(async () => {
  try {
    const res = await profissionalService.getAll();
    profissionais.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar profissionais", error);
  }
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
        <h3 class="nome">{{ p.nome_profissional }}</h3>
        <p class="cargo">{{ p.especialidade || 'Cabeleireiro(a)' }}</p>
        <div class="contato-info" v-if="p.telefone">
          📱 {{ p.telefone }}
        </div>
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
  cursor: pointer;
}

.btn-add:hover {
  background: #fff1f2;
}

.grid-profissionais {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 16px;
}

.nome {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.cargo {
  font-size: 0.9rem;
  color: #e11d48;
  font-weight: 500;
  margin-bottom: 8px;
}

.contato-info {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 16px;
}

.btn-ver {
  width: 100%;
  padding: 10px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  color: #4b5563;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
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