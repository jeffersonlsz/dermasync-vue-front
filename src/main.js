import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import intersect from './directives/intersect.js';
import './styles/main.scss';

const app = createApp(App);
app.use(router);
app.directive('intersect', intersect);
app.mount('#app');
