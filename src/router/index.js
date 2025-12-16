import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GaleriaView from '../views/GaleriaView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ColaboradorDashboard from '../views/ColaboradorDashboard.vue'
import HomeView from '../views/HomeView.vue'
import VideosExplicativosView from '../views/VideosExplicativosView.vue'
import CadastroView from '../views/CadastroView.vue'
import FaqView from '../views/FaqView.vue'
import GaleriaPublicView from '../views/GaleriaPublicView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/faq', name: 'Faq', component: FaqView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/videos-explicativos', name: 'Videos', component: VideosExplicativosView },
  {
    path: '/galeria-publica',
    name: 'GaleriaPublica',
    component: GaleriaPublicView
  },
  {
    path: '/galeria',
    name: 'Galeria',
    component: GaleriaView,
    meta: {},
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      const authed = !!authStore.accessToken || !!localStorage.getItem('refresh_token')
      if (!authed) {
        return next({ name: 'GaleriaPublica' })
      }
      next()
    }
  },
  { path: '/cadastro', name: 'Cadastro', component: CadastroView },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/colaborador',
    name: 'ColaboradorDashboard',
    component: ColaboradorDashboard,
    meta: { requiresAuth: true, role: 'colaborador' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta?.requiresAuth === true
  const requiredRole = to.meta?.role

  // Check if authenticated (token exists)
  const authed = !!authStore.accessToken || !!localStorage.getItem('refresh_token')

  // If trying to open login but already authed, redirect to dashboard or home
  if ((to.name === 'Login' || to.name === 'Register') && authed) {
    return next({ name: 'Home' })
  }



  if (!requiresAuth) {
    return next()
  }

  if (!authed) {
    return next({
      name: 'Login',
      query: { next: to.fullPath }
    })
  }

  // Role check
  if (requiredRole) {
    // Role checks would go here
  }

  return next()
})

export default router
