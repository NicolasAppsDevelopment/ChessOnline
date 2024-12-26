import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
import router from '@/router';
import {useStoredUserService} from "@/composables/user/storedUserService";
import '@/assets/main.css';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);
app.use(ToastService);

useStoredUserService().init();

app.mount('#app');
