import { useStoredUserService } from '@/composables/user/storedUserService';
import axios, { type InternalAxiosRequestConfig } from 'axios';

const { storedUser } = useStoredUserService();
const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Authorization'] = `Bearer ${storedUser.value.token}`;
  return config;
});

export default axiosInstance;
