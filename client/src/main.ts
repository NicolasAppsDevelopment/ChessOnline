import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
import router from '@/router';
import {useStoredUserService} from "@/composables/user/storedUserService";
import '@/assets/main.css';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);

useStoredUserService().init();

app.mount('#app');
