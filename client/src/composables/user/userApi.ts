import axiosInstance from '@/config/AxiosConfig';
import { ApiUrlLogin } from '@/constants/ApiUrl';
import type { User } from '@/models/User';

export function useUserApi() {
  return {
    async authenticate(user: User): Promise<string> {
      const res = await axiosInstance.post<{ token: string }>(`${ApiUrlLogin}`, {
        grant_type: 'password',
        username: user.username,
        password: user.password,
      });
      return res.data.token;
    },
  };
}
