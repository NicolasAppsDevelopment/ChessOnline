<script setup lang="ts">
import { Badge, Button, InputGroup, InputGroupAddon, InputText, Message, ToggleButton } from 'primevue'
import { AxiosError } from 'axios'
import { onMounted, ref } from 'vue'
import { useRoomService } from '@/composables/room/roomService'

import type { CreateRoom, ListRoomItem } from '@/models/Room'
import Navbar from '@/components/Navbar.vue'

const roomService = useRoomService();

const newRoom = ref<CreateRoom>({ name: "", isPrivate: true });
const rooms = ref<ListRoomItem[]>([]);

onMounted(async () => {
  getRooms();
});

const lastError = ref("");
const processing = ref(false);
async function getRooms() {
  try {
    lastError.value = "";
    processing.value = true;
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
    lastError.value = "";
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

    <table class="rooms mb-2">
      <thead>
      <tr>
        <th><i class="fa-solid fa-door-open"></i> Rooms <Badge :value="rooms.length" severity="contrast" size="small"></Badge></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="room in rooms" :key="room.uuid">
        <td>
          <RouterLink :to="'/game/' + room.uuid">{{ room.name }}</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
    <Button label="Refresh" icon="fa-solid fa-arrows-rotate" @click="getRooms()"></Button>

    <h2>Create a room</h2>
    <Message v-if="lastError" severity="error" icon="fa-solid fa-circle-exclamation" class="mb-2">{{ lastError }}</Message>
    <InputGroup class="mb-2">
      <InputGroupAddon>
        <i class="fa-solid fa-tag"></i>
      </InputGroupAddon>
      <InputText v-model="newRoom.name" placeholder="Name" />
    </InputGroup>
    <ToggleButton v-model="newRoom.isPrivate" onLabel="Private" offLabel="Public" onIcon="fa-solid fa-lock"
                  offIcon="fa-solid fa-lock-open" class="on-off-custom w-9rem" aria-label="Visibility of the room" />
    <Button label="Create a room" icon="fa-solid fa-plus" @click="createRoom()"></Button>
  </div>

</template>
