<script setup lang="ts">
import {Button, InputText, Checkbox} from "primevue";
import {AxiosError} from "axios";
import {ref, onMounted} from "vue";
import {useRoomService} from "@/composables/room/roomService";

import type {CreateRoom, ListRoomItem} from "@/models/Room";
import Navbar from "@/components/Navbar.vue";
const roomService = useRoomService();

const newRoom = ref<CreateRoom>({ name: "", isPrivate: true });
const rooms = ref<ListRoomItem[]>([]);

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
    await roomService.create(newRoom.value);
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
    <h2>Join a public room</h2>
    <ul>
      <li v-for="room in rooms" :key="room.uuid">
        <RouterLink :to="'/game/' + room.uuid">{{ room.name }}</RouterLink>
      </li>
    </ul>
    <Button label="Refresh" @click="getRooms()"></Button>

    <h2>Create a room</h2>
    <p v-if="lastError">{{ lastError }}</p>
    <InputText v-model="newRoom.name"></InputText>
    <Checkbox v-model="newRoom.isPrivate" binary>Is private</Checkbox>
    <Button label="Create a room" @click="createRoom()"></Button>
  </div>

</template>

<style scoped>

</style>
