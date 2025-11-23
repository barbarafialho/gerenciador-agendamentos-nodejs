<template>
  <div class="login-container">
    <div class="login-card">
      
      <div class="header">
        <h1 class="brand-name">Mon Biju Salon</h1>
        <p class="welcome-text">Bem-vindo de volta!</p>
      </div>

      <div v-if="error" class="alert alert-error">
        <span>{{ error }}</span>
      </div>

      <div v-if="success" class="alert alert-success">
        <span>{{ success }}</span>
      </div>

      <form @submit.prevent="login" class="login-form">
        
        <div class="input-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <Mail class="icon" size="20" />
            <input 
              id="email"
              v-model="email" 
              type="email" 
              placeholder="seuemail@email.com" 
              required 
            />
          </div>
        </div>

        <div class="input-group">
          <label for="senha">Senha</label>
          <div class="input-wrapper">
            <Lock class="icon" size="20" />
            <input 
              id="senha"
              v-model="senha" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
        </div>

        <button 
          :disabled="loading" 
          class="btn-login"
        >
          <span v-if="loading" class="loading-state">Entrando...</span>
          <span v-else>Entrar</span>
        </button>

      </form>

      <div class="footer">
        <p>Não tem conta?</p>
        <button @click="router.push('/cadastro')" class="link-create">
          Criar conta
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'
import { Mail, Lock } from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const senha = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const login = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await authService.login(email.value, senha.value)

    localStorage.setItem('token', response.token)

    success.value = 'Login realizado com sucesso!'

    setTimeout(() => router.push('/dashboard'), 800)

  } catch (err) {
    error.value = err.response?.data?.message || 'Credenciais inválidas'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff1f2; 
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

.login-card {
  background: white;
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ffe4e6;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.brand-name {
  font-size: 2rem;
  font-weight: 800;
  color: #be123c; 
  margin-bottom: 8px;
}

.welcome-text {
  color: #6b7280;
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.icon {
  position: absolute;
  left: 12px;
  color: #be123c; /* Ícone na cor do tema */
  pointer-events: none;
}

input {
  width: 100%;
  padding: 12px 16px 12px 42px; /* Espaço para o ícone */
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #f9fafb;
  transition: all 0.2s;
  outline: none;
}

input:focus {
  border-color: #e11d48;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.btn-login {
  margin-top: 10px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, #e11d48, #be123c);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
  box-shadow: 0 4px 12px rgba(190, 18, 60, 0.3);
}

.btn-login:hover {
  opacity: 0.95;
}

.btn-login:active {
  transform: scale(0.98);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.footer {
  margin-top: 32px;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
}

.link-create {
  background: none;
  border: none;
  color: #e11d48;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  padding: 0;
}

.link-create:hover {
  text-decoration: underline;
}

/* Alertas */
.alert {
  padding: 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-align: center;
}

.alert-error {
  background-color: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.alert-success {
  background-color: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
}
</style>