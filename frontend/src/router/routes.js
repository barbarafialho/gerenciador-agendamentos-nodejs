import LayoutDefault from '@/layouts/LayoutDefault.vue'
import Dashboard from '@/views/Dashboard.vue'
import Cadastro from '@/views/Cadastro.vue'
import Login from '@/views/Login.vue'
import Profissionais from '@/views/Profissionais.vue'
import Servicos from '@/views/Servicos.vue'
import Atendimentos from '@/views/Atendimentos.vue'
import Agendamentos from '@/views/Agendamentos.vue'
import AgendamentoNovo from '@/views/AgendamentoNovo.vue' 
import ProfissionalNovo from '@/views/ProfissionalNovo.vue'
import AtendimentoNovo from '@/views/AtendimentoNovo.vue'
import ServicoNovo from '@/views/ServicoNovo.vue'

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
        component: Profissionais,
      },
      {
        path: 'profissional-novo/:id?',
        name: 'ProfissionalNovo',
        component: ProfissionalNovo,
        meta: { hideInMenu: true }
      },
      {
        path: 'servicos',
        name: 'Servicos',
        component: Servicos,
      },
      {
        path: 'servico-novo/:id?',
        name: 'ServicoNovo',
        component: ServicoNovo,
        meta: { hideInMenu: true }
      },
      {
        path: 'atendimentos',
        name: 'Atendimentos',
        component: Atendimentos,
      },
      {
        path: 'atendimento-novo/:id?',
        name: 'NovoAtendimento',
        component: AtendimentoNovo,
        meta: { hideInMenu: true }
      },
      {
        path: 'agendamentos',
        name: 'Agendamentos',
        component: Agendamentos,
      },
      {
        path: 'agendamento-novo/:id?',
        name: 'NovoAgendamento',
        component: AgendamentoNovo, 
        meta: { hideInMenu: true }
      }
    ]
  }
]