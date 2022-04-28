import { createApp } from 'vue';
import { router } from '@/router';
import AppDate from '@/components/AppDate.vue';
import App from './App.vue';

createApp(App).component('AppDate', AppDate).use(router).mount('#app');
