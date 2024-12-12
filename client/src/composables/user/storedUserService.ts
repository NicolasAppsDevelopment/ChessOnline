import type { User } from '@/models/User';
import { ref } from 'vue';
import router from "@/router";
import {jwtDecode} from "jwt-decode";
import {useUserApi} from "@/composables/user/userApi";
import {socket} from "@/socket";

const storedUser = ref<User>({ username: '', password: '' });
const userApi = useUserApi();

let refreshTimeout: number | null = null;

export function useStoredUserService() {
  return {
    storedUser,
    init(): void {
      if (localStorage.getItem('token')) {
        const storedToken = localStorage.getItem('token')!;
        storedUser.value.token = storedToken;
        const data = jwtDecode(storedUser.value.token) as Token;
        storedUser.value.username = data.username;
        socket.io.opts.extraHeaders = { Authorization: `Bearer ${storedToken}` };
        this.subscribeReAuth();
      }
    },
    async refresh(): Promise<void> {
      try {
        storedUser.value = await userApi.refresh(storedUser.value);
        this.subscribeReAuth();
      } catch (e) {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        router.push({ path: '/login' });
        throw e;
      }
    },
    async subscribeReAuth(): Promise<void> {
      const oldToken = storedUser.value.token;
      if (oldToken) {
        const delay = Math.max(jwtDecode(oldToken).exp! - (Date.now() / 1000) - (60 * 5), 0);
        console.log('delay', delay);
        // re-authenticate user every hour
        refreshTimeout = setTimeout(() => {
          this.refresh();
        }, delay * 1000);
      }
    },
    clear(): void {
      storedUser.value = { username: '', password: '' };
      localStorage.removeItem('token');
      if (refreshTimeout) { clearTimeout(refreshTimeout); }
      router.push({ path: '/login' });
    }
  };
}
