<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import { Checkbox } from 'primevue'
import { useStoredUserService } from "@/composables/user/storedUserService";
import { useUserService } from '@/composables/user/userService';
import { onMounted, ref } from 'vue'
import type { GameHistory } from '@/models/GameHistory'
import router from '@/router'
import { useRoute } from 'vue-router'

const storedUserService = useStoredUserService();
const userService = useUserService();

const route = useRoute();
const gameHistories = ref<GameHistory[]>([]);
const userId = storedUserService.storedUser.value.id;
const isOwner = route.params.id == userId.toString();

onMounted(async () => {
  if (!route.params.id || route.params.id !instanceof String) {
    return;
  }
  const id = parseInt(route.params.id as string);
  if (isNaN(id)) {
    return;
  }

  gameHistories.value = await userService.getUserGameHistories(id);
});

function goToGameHistory(id: number) {
  router.push({ path: '/gameReview/' + id });
}

</script>

<template>
  <Navbar></Navbar>

  <div class="p1">
    <h1>Game Histories</h1>
    <table class="gameHistory">
      <thead>
        <tr>
          <th><i class="fa-solid fa-chess-board"></i> Room Name</th>
          <th><i class="fa-solid fa-calendar"></i> Date</th>
          <th><i class="fa-solid fa-user"></i> Black Player</th>
          <th><i class="fa-solid fa-user"></i> White Player</th>
          <th><i class="fa-solid fa-chess-king"></i> Winner</th>
          <th v-if="isOwner"><i class="fa-solid fa-eye"></i> Is public</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="gameHistory in gameHistories" :key="gameHistory.id" @click="goToGameHistory(gameHistory.id)">
          <td>{{ gameHistory.room.name }}</td>
          <td>{{ gameHistory.startDate }}</td>
          <td>{{ gameHistory.blackPlayer?.username }}</td>
          <td>{{ gameHistory.whitePlayer?.username }}</td>
          <td>{{ gameHistory.winner?.username }}</td>
          <td v-if="isOwner"><Checkbox v-model="gameHistory.isPublic" binary /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
