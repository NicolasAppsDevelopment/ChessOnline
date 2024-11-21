import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginView.vue';
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/login', component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
