import type { User } from '@/models/User';
import { useUserApi } from './userApi';
import { useStoredUserService } from './storedUserService';

const userApi = useUserApi();
const storedUserService = useStoredUserService();
export function useUserService() {
  return {
    async login(user: User): Promise<void> {
      user = await userApi.authenticate(user);
      storedUserService.storedUser.value = user;
      storedUserService.subscribeReAuth();
    },
    async register(user: User): Promise<void> {
      user = await userApi.register(user);
      storedUserService.storedUser.value = user;
      storedUserService.subscribeReAuth();
    },
    async logout(): Promise<void> {
      storedUserService.clear();
    },
    async getUserById(id: number): Promise<User> {
      return await userApi.getUserById(id);
    },
    async getUserRank(id: number): Promise<number> {
      return await userApi.getUserRank(id);
    },
    async getLeaderboard(): Promise<User[]> {
      return await userApi.getLeaderboard();
    }
  };
}
