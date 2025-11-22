<template>
  <div class="register-container">
    <div class="register-card">

      <div class="header">
        <h1 class="title">Criar Conta</h1>
        <p class="subtitle">Preencha os dados para acessar o sistema</p>
      </div>

      <!-- Alerta de Erro -->
      <div v-if="erro" class="alert alert-error">
        <AlertCircle size="18" />
        <span>{{ erro }}</span>
      </div>

      <!-- Alerta de Sucesso -->
      <div v-if="sucesso" class="alert alert-success">
        <CheckCircle size="18" />
        <span>Cadastro realizado! Entrando...</span>
      </div>

      <form @submit.prevent="cadastrar" class="form-content">


        <div class="input-group">
          <label>Email</label>
          <div class="input-wrapper">
            <Mail class="icon" size="20" />
            <input
              v-model="email"
              type="email"
              placeholder="exemplo@email.com"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="input-group">
            <label>Senha</label>
            <div class="input-wrapper">
              <Lock class="icon" size="20" />
              <input
                v-model="senha"
                type="password"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          <div class="input-group">
            <label>Confirmar</label>
            <div class="input-wrapper">
              <Lock class="icon" size="20" />
              <input
                v-model="senha2"
                type="password"
                placeholder="••••••"
                required
              />
            </div>
          </div>
        </div>

        <button
          :disabled="loading"
          class="btn-submit"
        >
          <span v-if="loading" class="loading-state">
            <Loader2 class="spin" size="20" />
            Processando...
          </span>
          <span v-else>Criar Conta</span>
        </button>
      </form>

      <p class="footer-text">
        Já possui cadastro?
        <router-link to="/login" class="link-login">
          Fazer Login
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Mail, Lock, User, AlertCircle, CheckCircle, Loader2 } from "lucide-vue-next"
import authService from "@/services/authService"

const nome = ref("")
const email = ref("")
const senha = ref("")
const senha2 = ref("")

const loading = ref(false)
const erro = ref("")
const sucesso = ref(false)

const router = useRouter()

async function cadastrar() {
  erro.value = ""
  sucesso.value = false

  if (senha.value !== senha2.value) {
    erro.value = "As senhas não conferem."
    return
  }

  if (senha.value.length < 6) {
    erro.value = "A senha deve ter no mínimo 6 caracteres."
    return
  }

  loading.value = true

  try {
    await authService.cadastro({
      email: email.value,
      senha: senha.value,
      nome: nome.value 
    })

    sucesso.value = true

    setTimeout(() => {
      router.push("/login")
    }, 1500)

  } catch (err) {
    erro.value = err.response?.data?.message || "Erro ao criar conta."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff1f2; 
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

/* O Card branco */
.register-card {
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ffe4e6;
}

/* Cabeçalho do card */
.header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #be123c; /* Tom escuro do Rose */
  margin-bottom: 8px;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
}

/* Formulário */
.form-content {
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
  color: #9ca3af;
  pointer-events: none; 
}

.input-wrapper input {
  width: 100%;
  padding: 12px 16px 12px 42px; 
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #f9fafb;
  transition: all 0.2s;
  outline: none;
}

.input-wrapper input:focus {
  border-color: #e11d48;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1); 
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.btn-submit {
  margin-top: 12px;
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

.btn-submit:hover {
  opacity: 0.9;
}

.btn-submit:active {
  transform: scale(0.98);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Alertas */
.alert {
  padding: 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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

/* Footer */
.footer-text {
  margin-top: 32px;
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
}

.link-login {
  color: #e11d48;
  font-weight: 700;
  text-decoration: none;
}

.link-login:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-card {
    padding: 24px;
  }
  .row {
    grid-template-columns: 1fr; 
  }
}
</style>