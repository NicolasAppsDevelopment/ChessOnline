import { reactive } from "vue";
import { io } from "socket.io-client";
import {ApiUrl} from "@/constants/ApiUrl";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = ApiUrl;//process.env.NODE_ENV === "production" ? undefined : "http://10.8.0.2:8100/";

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("message", (id: string) => {
  console.log("Message received: ", id);
});
