import type { User } from '@/models/User';
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
    }
  };
}
