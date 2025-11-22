import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: appRoutes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.name === 'Login' && token) {
    return next('/dashboard')
  }

  next()
})

export default router
