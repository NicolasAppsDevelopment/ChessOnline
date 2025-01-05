import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginView.vue';
import RegisterView from "@/views/RegisterView.vue";
import LeaderboardView from "@/views/LeaderboardView.vue";
import UserView from "@/views/UserView.vue";
import HistoryView from "@/views/HistoryView.vue";
import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";
import GameReView from '@/views/GameReView.vue';
const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterView },
  { path: '/leaderboard', component: LeaderboardView },
  { path: '/user/:id', component: UserView }, // ALSO STATISTICS PAGE
  { path: '/history/:id', component: HistoryView },
  { path: '/gameReview/:id', component: GameReView },
  { path: '/game/:id', component: GameView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
