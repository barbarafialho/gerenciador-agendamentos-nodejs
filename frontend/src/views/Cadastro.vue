<template>
  <div class="min-h-screen flex items-center justify-center bg-rose-100">
    <div class="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

      <h1 class="text-3xl font-bold text-rose-700 text-center mb-6">
        Criar Conta
      </h1>

      <!-- Erro -->
      <div
        v-if="erro"
        class="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center"
      >
        {{ erro }}
      </div>

      <!-- Sucesso -->
      <div
        v-if="sucesso"
        class="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center"
      >
        Cadastro realizado!
      </div>

      <form @submit.prevent="cadastrar">

        <!-- Email -->
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

        <!-- Senha -->
        <div class="mb-5">
          <label class="block mb-1 text-gray-700 font-semibold">Senha</label>
          <div class="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Lock class="w-5 h-5 text-rose-600" />
            <input
              v-model="senha"
              type="password"
              class="w-full bg-transparent outline-none ml-2"
              placeholder="••••••••••"
              required
            />
          </div>
        </div>

        <!-- Confirmar senha -->
        <div class="mb-6">
          <label class="block mb-1 text-gray-700 font-semibold">Confirmar Senha</label>
          <div class="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Lock class="w-5 h-5 text-rose-600" />
            <input
              v-model="senha2"
              type="password"
              class="w-full bg-transparent outline-none ml-2"
              placeholder="••••••••••"
              required
            />
          </div>
        </div>

        <!-- Botão -->
        <button
          :disabled="loading"
          class="w-full bg-rose-600 hover:bg-rose-700 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50"
        >
          {{ loading ? "Criando conta..." : "Cadastrar" }}
        </button>
      </form>

      <!-- Link para login -->
      <p class="text-center mt-4 text-gray-600">
        Já tem uma conta?
        <router-link to="/login" class="text-rose-700 font-semibold">
          Entrar
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Mail, Lock, User } from "lucide-vue-next"
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

  // validações
  if (senha.value !== senha2.value) {
    erro.value = "As senhas não coincidem."
    return
  }

  loading.value = true

  try {
    await authService.cadastro({
      email: email.value,
      senha: senha.value
    })

    sucesso.value = true

    setTimeout(() => {
      router.push("/login")
    }, 1000)

  } catch (err) {
    erro.value = "Erro ao criar conta. Email já existe?"
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
