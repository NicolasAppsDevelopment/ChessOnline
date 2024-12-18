import axiosInstance from '@/config/AxiosConfig';
import {ApiUrlGetRooms, ApiUrlLogin, ApiUrlRefresh, ApiUrlRegister} from '@/constants/ApiUrl';
import type { User } from '@/models/User';
import {socket} from "@/socket";

export function useUserApi() {
  return {
    async authenticate(user: User): Promise<User> {
      const res = await axiosInstance.post<{ token: string }>(`${ApiUrlLogin}`, {
        grant_type: 'password',
        username: user.username,
        password: user.password,
      });
      user.token = res.data.token;
      localStorage.setItem('token', user.token);
      socket.io.opts.extraHeaders = { Authorization: `Bearer ${user.token}` };
      return user;
    },
    async refresh(user: User): Promise<User> {
      const res = await axiosInstance.post<{ token: string }>(`${ApiUrlRefresh}`);
      user.token = res.data.token;
      localStorage.setItem('token', user.token);
      socket.io.opts.extraHeaders = { Authorization: `Bearer ${user.token}` };
      return user;
    },
    async register(user: User): Promise<User> {
      await axiosInstance.post<{ token: string }>(`${ApiUrlRegister}`, {
        username: user.username,
        password: user.password,
      });
      return await this.authenticate(user);
    },
    async getLeaderboard(): Promise<string[]> {
      const res = await axiosInstance.get<string[]>(`${ApiUrlRegister}`);
      /**res.data;**/

      return this.getLeaderboard();
    },
  };
}
