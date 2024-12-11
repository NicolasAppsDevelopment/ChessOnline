import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginView.vue';
import RegisterView from "@/views/RegisterView.vue";
import LeaderboardView from "@/views/LeaderboardView.vue";
import StatisticsView from "@/views/StatisticsView.vue";
import HistoryView from "@/views/HistoryView.vue";
import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";
const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterView },
  { path: '/leaderboard', component: LeaderboardView },
  { path: '/statistics', component: StatisticsView },
  { path: '/history', component: HistoryView },
  { path: '/game', component: GameView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
