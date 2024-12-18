<script setup lang="ts">
import {Button, InputText, Password} from "primevue";
import {AxiosError} from "axios";
import {ref, onMounted} from "vue";
import {useRoomService} from "@/composables/room/roomService";

import type {Room} from "@/models/Room";
import Navbar from "@/components/Navbar.vue";
const roomService = useRoomService();

const room = ref<Room>({ name: "", password: "" });
const rooms = ref<string[]>([]);

onMounted(async () => {
  getRooms();
});

let lastError = ref("");
let processing = ref(false);
async function getRooms() {
  try {
    rooms.value = await roomService.list();
  } catch (error) {
    if (error instanceof AxiosError) {
      lastError.value = error.response?.data.message ?? error.message;
    } else {
      lastError.value = "Unknown error";
    }
    rooms.value = [];
  } finally {
    processing.value = false;
  }
}

async function createRoom() {
  try {
    processing.value = true;
    await roomService.create(room.value);
  } catch (error) {
    if (error instanceof AxiosError) {
      lastError.value = error.response?.data.message ?? error.message;
    } else {
      lastError.value = "Unknown error";
    }
  } finally {
    processing.value = false;
  }
}

async function joinRoom(name: string) {
  const password = prompt('Enter the room password');
  if (password === null) {
    return;
  }

  try {
    processing.value = true;
    await roomService.join({ name, password });
  } catch (error) {
    if (error instanceof AxiosError) {
      lastError.value = error.response?.data.message ?? error.message;
    } else {
      lastError.value = "Unknown error";
    }
  } finally {
    processing.value = false;
  }
}

</script>

<template>
  <Navbar></Navbar>

  <div class="container-card login-form">
    <h2>Join a room</h2>
    <ul>
      <li v-for="room in rooms" :key="room">
        <p>{{ room }}</p>
        <Button label="Join" @click="joinRoom(room)"></Button>
      </li>
    </ul>
    <Button label="Refresh" @click="getRooms()"></Button>

    <h2>Create a room</h2>
    <p v-if="lastError">{{ lastError }}</p>
    <InputText v-model="room.name"></InputText>
    <Password v-model="room.password"></Password>
    <Button label="Create a room" @click="createRoom()"></Button>
  </div>

</template>

<style scoped>

</style>
