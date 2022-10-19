import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';

import App from './App.vue';
import router from './router';

// CSS
import './assets/main.scss';

// JS
import 'bootstrap';

const app = createApp(App);

const pinia = createPinia();

// Add vue router as a property of pinia stores
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.mount('#app');
