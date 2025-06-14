import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import GaleriaView from '../views/GaleriaView.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import ColaboradorDashboard from '../views/ColaboradorDashboard.vue';
import HomeView from '../views/HomeView.vue';
import VideosExplicativosView from '../views/VideosExplicativosView.vue'
import CadastroView from '../views/CadastroView.vue';


const routes = [
    { path: '/', component: HomeView }, // agora a home real
    { path: '/login', component: LoginView },
    { path: '/videos-explicativos', component: VideosExplicativosView },
    { path: '/galeria', component: GaleriaView },
    { path: '/cadastro', component: CadastroView },
    { path: '/admin', component: AdminDashboard },
    { path: '/colaborador', component: ColaboradorDashboard }

  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
