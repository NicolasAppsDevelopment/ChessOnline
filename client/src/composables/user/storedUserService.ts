import type { User } from '@/models/User'
import { ref } from 'vue'
import router from '@/router'
import { jwtDecode } from 'jwt-decode'
import { useUserApi } from '@/composables/user/userApi'
import { socket } from '@/socket'
import type { UserJwt } from '@/models/UserJwt'

const storedUser = ref<User>({ username: '', password: '', id: -1 });
const userApi = useUserApi();

let refreshTimeout: number | null = null;

export function useStoredUserService() {
  return {
    storedUser,
    init(): void {
      if (localStorage.getItem('token')) {
        try {
          const storedToken = localStorage.getItem('token')!;
          storedUser.value.token = storedToken;
          const data = jwtDecode(storedUser.value.token) as UserJwt;
          storedUser.value.username = data.jwtPayload.username;
          storedUser.value.id = data.jwtPayload.id;
          socket.io.opts.extraHeaders = { Authorization: `Bearer ${storedToken}` };
          this.subscribeReAuth();
        } catch (e) {
          console.error(e);
          localStorage.removeItem('token');
          router.push({ path: '/login' });
        }
      } else if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        // none logged user should be redirected to login page (except login and register pages)
        router.push({ path: '/login' });
      }
    },
    async refresh(): Promise<void> {
      try {
        await userApi.refresh();
        this.init();
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
        // re-authenticate user every hour
        refreshTimeout = setTimeout(() => {
          this.refresh();
        }, delay * 1000);
      }
    },
    clear(): void {
      storedUser.value = { username: '', password: '', id: -1 };
      localStorage.removeItem('token');
      if (refreshTimeout) { clearTimeout(refreshTimeout); }
      router.push({ path: '/login' });
    }
  };
}
