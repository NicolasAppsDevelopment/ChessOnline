import type { User } from '@/models/User';
import type { GameHistory } from '@/models/GameHistory'
import { useUserApi } from './userApi';
import { useStoredUserService } from './storedUserService';

const userApi = useUserApi();
const storedUserService = useStoredUserService();
export function useUserService() {
  return {
    async login(user: User): Promise<void> {
      await userApi.authenticate(user);
      storedUserService.init();
    },
    async register(user: User): Promise<void> {
      await userApi.register(user);
      storedUserService.init();
    },
    async getUserById(id: number): Promise<User> {
      return await userApi.getUserById(id);
    },
    async getLeaderboard(): Promise<User[]> {
      return await userApi.getLeaderboard();
    },
    async getUserGameHistories(id: number): Promise<GameHistory[]> {
      return await userApi.getUserGameHistories(id);
    },
    async getGameHistoryById(id: number): Promise<GameHistory> {
      return await userApi.getGameHistoryById(id);
    },
  };
}
