import axiosInstance from '@/config/AxiosConfig';
import {
  ApiUrlLogin,
  ApiUrlRefresh,
  ApiUrlRegister,
  ApiUrlGetUser,
  ApiUrlGetLeaderboard,
} from '@/constants/ApiUrl'
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
    async getUserByUsername(username: string): Promise<User> {
      const res = await axiosInstance.get(`${ApiUrlGetUser}`+ username);
      return res.data;
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
