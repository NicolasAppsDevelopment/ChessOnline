import { useUserLoginService } from '@/composables/user/userLoginService';
import axios, { type InternalAxiosRequestConfig } from 'axios';

const { userLogin } = useUserLoginService();
const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Authorization'] = `Bearer ${userLogin.value.token}`;
  return config;
});

export default axiosInstance;
