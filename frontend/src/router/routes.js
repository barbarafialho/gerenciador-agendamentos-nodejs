import LayoutDefault from '@/layouts/LayoutDefault.vue'
import Dashboard from '@/views/Dashboard.vue'

export const appRoutes = [
  {
    path: '/',
    component: LayoutDefault,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { label: 'Dashboard', icon: 'i-home' }
      },
      /*
      {
        path: 'profissionais',
        name: 'Profissionais',
        component: () => import('@/views/Profissionais.vue'),
        meta: { label: 'Profissionais', icon: 'i-users' }
      },
      {
        path: 'servicos',
        name: 'Servicos',
        component: () => import('@/views/Servicos.vue'),
        meta: { label: 'Serviços', icon: 'i-box' }
      },
      {
        path: 'agendamentos',
        name: 'Agendamentos',
        component: () => import('@/views/Agendamentos.vue'),
        meta: { label: 'Agendamentos', icon: 'i-box' }
      },
      {
        path: 'atendimentos',
        name: 'Atendimentos',
        component: () => import('@/views/Atendimentos.vue'),
        meta: { label: 'Atendimentos', icon: 'i-box' }
      }
    */
    ]
  }
]
