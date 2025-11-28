// src/router/index.js
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

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/videos-explicativos', name: 'Videos', component: VideosExplicativosView },
  {
    path: '/galeria',
    name: 'Galeria',
    component: GaleriaView,
    meta: { requiresAuth: true }
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
  const goingToLogin = to.name === 'Login' || to.name === 'Register'

  // Check if authenticated (token exists)
  const authed = !!authStore.accessToken || !!localStorage.getItem('refresh_token')

  // If trying to open login but already authed, redirect to dashboard or home
  if (goingToLogin && authed) {
    return next({ name: 'Home' }) // Or Dashboard if you have one
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

  // Role check (simplified for now as store might not have role yet)
  // You might need to fetch user profile here if not in store
  if (requiredRole) {
    // TODO: Implement role check based on authStore.user or fetch profile
    // For now, allowing if authenticated to avoid blocking during dev
    // console.warn('Role check skipped in POC');
  }

  return next()
})

export default router

