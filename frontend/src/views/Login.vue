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

<template>
  <div class="min-h-screen flex items-center justify-center bg-rose-100">
    <div class="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

      <h1 class="text-3xl font-bold text-rose-700 text-center mb-8">
        Mon Biju Salon
      </h1>

      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
        {{ error }}
      </div>

      <div v-if="success" class="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
        {{ success }}
      </div>

      <form @submit.prevent="login">
        <div class="mb-5">
          <label class="block mb-1 text-gray-700 font-semibold">Email</label>
          <div class="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Mail class="w-5 h-5 text-rose-600" />
            <input
              v-model="email"
              type="email"
              class="w-full bg-transparent outline-none ml-2"
              placeholder="seuemail@email.com"
              required
            />
          </div>
        </div>

        <div class="mb-6">
          <label class="block mb-1 text-gray-700 font-semibold">Senha</label>
          <div class="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Lock class="w-5 h-5 text-rose-600" />
            <input
              v-model="senha"
              type="password"
              class="w-full bg-transparent outline-none ml-2"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          :disabled="loading"
          class="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="text-center text-gray-600 mt-6">
        Não tem conta?
        <button
          @click="router.push('/cadastro')"
          class="text-rose-600 font-bold hover:underline"
        >
          Criar conta
        </button>
      </p>

    </div>
  </div>
</template>
