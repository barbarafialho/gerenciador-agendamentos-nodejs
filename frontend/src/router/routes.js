import LayoutDefault from '@/layouts/LayoutDefault.vue'
import Dashboard from '@/views/Dashboard.vue'
import Cadastro from '@/views/Cadastro.vue'
import Login from '@/views/Login.vue'

export const appRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },

  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    meta: { requiresAuth: false }
  },

  {
    path: '/',
    component: LayoutDefault,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'profissionais',
        name: 'Profissionais',
        component: () => import('@/views/Profissionais.vue'),
      },
      {
        path: 'servicos',
        name: 'Servicos',
        component: () => import('@/views/Servicos.vue'),
      },
      {
        path: 'agendamentos',
        name: 'Agendamentos',
        component: () => import('@/views/Agendamentos.vue'),
      },
      {
        path: 'atendimentos',
        name: 'Atendimentos',
        component: () => import('@/views/Atendimentos.vue'),
      }
    ]
  }
]
