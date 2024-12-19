import { reactive } from "vue";
import { io } from "socket.io-client";
import {ApiUrl} from "@/constants/ApiUrl";
import router from "@/router";

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

socket.on("ROOM_JOINED", () => {
  router.push({ path: '/game' });
});
