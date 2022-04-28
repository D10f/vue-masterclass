import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';
import AppDate from '@/components/AppDate.vue';
import App from './App.vue';

createApp(App)
  .use(router)
  .use(store)
  .component('AppDate', AppDate)
  .mount('#app');
