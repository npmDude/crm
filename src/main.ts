import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

// CSS
import './assets/main.scss';

// JS
import 'bootstrap';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
