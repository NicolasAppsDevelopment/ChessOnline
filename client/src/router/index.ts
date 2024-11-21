import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginView.vue';
import RegisterView from "@/views/RegisterView.vue";
import RankingView from "@/views/RankingView.vue";
import StatsView from "@/views/StatsView.vue";
import HistoryView from "@/views/HistoryView.vue";
import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";
const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterView },
  { path: '/rank', component: RankingView },
  { path: '/stats', component: StatsView },
  { path: '/history', component: HistoryView },
  { path: '/game', component: GameView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
