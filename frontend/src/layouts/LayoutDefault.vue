<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <div class="brand">
        <div class="logo-icon">MB</div>
        <span class="logo-text">Mon Biju Salon</span>
      </div>

      <nav class="nav-menu">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="nav-link"
        >
          <component :is="item.icon" class="nav-icon" />
          {{ item.label }}
        </router-link>
      </nav>
    </aside>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { LayoutDashboard, Calendar, Users, Scissors } from 'lucide-vue-next'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Agendamentos', path: '/atendimentos', icon: Calendar },
  { label: 'Profissionais', path: '/profissionais', icon: Users },
  { label: 'Serviços', path: '/servicos', icon: Scissors }
]
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #be123c 0%, #881337 100%);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 4px 0 10px rgba(0,0,0,0.1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: white;
  color: #be123c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: -0.5px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(4px);
}

.nav-link.router-link-active {
  background: white;
  color: #be123c;
  font-weight: 700;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.main-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: #fff1f2;
}
</style>