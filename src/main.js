import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import intersect from './directives/intersect.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import './styles/bootstrap-custom.scss';
import './styles/main.scss';

const app = createApp(App);
app.use(router);
app.directive('intersect', intersect);
app.mount('#app');
