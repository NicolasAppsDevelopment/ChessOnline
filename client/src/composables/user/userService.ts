import type { User, UserRank } from '@/models/User';
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
    async delete(userId: number): Promise<void> {
      await userApi.delete(userId);
    },
    async update(user: User): Promise<void> {
      await userApi.update(user);
      storedUserService.init();
    },
    async getUserById(id: number): Promise<User> {
      return await userApi.getUserById(id);
    },
    async getLeaderboard(): Promise<UserRank[]> {
      return await userApi.getLeaderboard();
    },
  };
}
