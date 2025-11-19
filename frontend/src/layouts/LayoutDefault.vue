<template>
  <div class="layout">

    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="logo">Meu Sistema</h2>

      <nav class="menu">
        <router-link
          v-for="route in menuRoutes"
          :key="route.path"
          :to="'/' + route.path"
          class="menu-item"
        >
          {{ route.meta.label }}
        </router-link>
      </nav>
    </aside>

    <!-- Área principal -->
    <main class="content">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { appRoutes } from '@/router/routes'

// rotas que aparecem no menu (as rotas filhas do layout)
const menuRoutes = computed(() => appRoutes[0].children)
</script>

<style scoped>
/* estrutura do layout */
.layout {
  display: flex;
  height: 100vh;
}

/* sidebar */
.sidebar {
  width: 240px;
  background: #1e1e2f;
  color: #fff;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
}

/* nome/logo */
.logo {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
}

/* menu */
.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* links do menu */
.menu-item {
  color: #bdbdbd;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 8px;
  transition: .2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

/* estado ativo */
.menu-item.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-weight: 600;
}

/* conteúdo principal */
.content {
  flex: 1;
  background: #f5f5f5;
  padding: 25px;
  overflow-y: auto;
}
</style>
