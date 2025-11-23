<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import profissionalService from '@/services/profissionalService';
import { User, Phone, Edit, Trash2 } from 'lucide-vue-next';

const router = useRouter();
const profissionais = ref([]);

onMounted(async () => {
  try {
    const res = await profissionalService.getAll();
    profissionais.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar profissionais", error);
  }
});

function editar(id) {
  router.push(`/profissional-novo/${id}`);
}

async function excluir(id) {
  if(!confirm("Tem certeza que deseja excluir este profissional?")) return;
  try {
    await profissionalService.remove(id);
    profissionais.value = profissionais.value.filter(p => p.id !== id);
  } catch (e) {
    alert("Erro ao excluir. Verifique se não há vínculos.");
  }
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Nossa Equipe</h1>
      <button class="btn-add" @click="router.push('/profissional-novo')">
        + Adicionar Profissional
      </button>
    </div>
    
    <div class="grid-profissionais">
      <div v-for="p in profissionais" :key="p.id" class="card-profissional">
        <div class="avatar-placeholder">
          <User size="32" />
        </div>
        
        <h3 class="nome">{{ p.nome_profissional }}</h3>
        <p class="cargo">{{ p.especialidade || 'Especialista' }}</p>
        
        <div class="contato-info" v-if="p.telefone">
          <Phone size="14" class="inline-icon" /> {{ p.telefone }}
        </div>
        
        <div class="actions">
          <button class="btn-icon edit" @click="editar(p.id)" title="Editar">
            <Edit size="18" />
          </button>
          <button class="btn-icon delete" @click="excluir(p.id)" title="Excluir">
            <Trash2 size="18" />
          </button>
        </div>
      </div>

      <div v-if="profissionais.length === 0" class="no-data">
        Nenhum profissional encontrado.
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.btn-add { background: #fff; border: 1px solid #e11d48; color: #e11d48; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-add:hover { background: #fff1f2; }
.grid-profissionais { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px; }
.card-profissional { background: white; border-radius: 16px; padding: 24px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #fce7f3; display: flex; flex-direction: column; align-items: center; }
.card-profissional:hover { transform: translateY(-5px); border-color: #e11d48; }
.avatar-placeholder { width: 80px; height: 80px; background: #ffe4e6; color: #be123c; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.nome { font-size: 1.1rem; font-weight: 700; color: #1f2937; margin-bottom: 4px; }
.cargo { font-size: 0.9rem; color: #e11d48; font-weight: 500; margin-bottom: 8px; }
.contato-info { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #6b7280; margin-bottom: 16px; }
.actions { display: flex; gap: 10px; justify-content: center; border-top: 1px solid #f3f4f6; padding-top: 15px; width: 100%; }
.btn-icon { background: none; border: none; cursor: pointer; padding: 6px; }
.btn-icon.edit { color: #2563eb; }
.btn-icon.delete { color: #dc2626; }
.no-data { grid-column: 1 / -1; text-align: center; color: #9ca3af; padding: 40px; }
</style>