import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { ApiUrl } from '@/constants/ApiUrl'

export const state = reactive({
  connected: false,
});

export const socket = io(ApiUrl);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
