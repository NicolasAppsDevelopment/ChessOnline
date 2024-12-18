import { reactive } from "vue";
import { io } from "socket.io-client";
import {ApiUrl} from "@/constants/ApiUrl";
import router from "@/router";
import type {Cell} from "@/models/Cell";
import type {Position} from "@/models/Position";

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
