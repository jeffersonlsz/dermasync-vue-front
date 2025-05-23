import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import intersect from './directives/intersect.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
//import './assets/js/argon-dashboard.min.js';
import './styles/main.scss';

const app = createApp(App);
app.use(router);
app.directive('intersect', intersect);
app.mount('#app');
