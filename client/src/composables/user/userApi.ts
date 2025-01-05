import axiosInstance from '@/config/AxiosConfig';
import {
  ApiUrlLogin,
  ApiUrlRefresh,
  ApiUrlRegister,
  ApiUrlGetUser,
  ApiUrlGetLeaderboard,
} from '@/constants/ApiUrl'
import type { User } from '@/models/User';

export function useUserApi() {
  return {
    async authenticate(user: User): Promise<void> {
      const res = await axiosInstance.post<{ token: string }>(`${ApiUrlLogin}`, {
        grant_type: 'password',
        username: user.username,
        password: user.password,
      });
      localStorage.setItem('token', res.data.token);
    },
    async refresh(): Promise<void> {
      const res = await axiosInstance.post<{ token: string }>(`${ApiUrlRefresh}`);
      localStorage.setItem('token', res.data.token);
    },
    async register(user: User): Promise<void> {
      await axiosInstance.post<{ token: string }>(`${ApiUrlRegister}`, {
        username: user.username,
        password: user.password,
      });
      await this.authenticate(user);
    },
    async delete(userId: number): Promise<void> {
      await axiosInstance.delete(`${ApiUrlGetUser}` + userId);
    },
    async update(user: User): Promise<void> {
      await axiosInstance.patch(`${ApiUrlGetUser}` + user.id, {
        username: user.username,
        password: user.password,
      });
      await this.refresh();
    },
    async getUserById(id: number): Promise<User> {
      const res = await axiosInstance.get(`${ApiUrlGetUser}`+ id);
      return res.data;
    },
    async getLeaderboard(): Promise<User[]> {
      const res = await axiosInstance.get(`${ApiUrlGetLeaderboard}`);
      return res.data;
    },
  };
}
