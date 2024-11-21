import type { User } from '@/models/User';
import { ref } from 'vue';

const userLogin = ref<User>({ username: '', password: '' });

export function useUserLoginService() {
  return {
    userLogin,
  };
}
