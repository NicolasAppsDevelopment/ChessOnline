<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import { useStoredUserService } from "@/composables/user/storedUserService";
import { useUserService } from '@/composables/user/userService';
import { onMounted, ref } from 'vue'
import type { GameHistory } from '@/models/GameHistory'
import router from '@/router'

const storedUserService = useStoredUserService();
const userService = useUserService();

const userId = storedUserService.storedUser.value.id;
const gameHistories = ref<GameHistory[]>([]);

onMounted(async () => {
  gameHistories.value = await userService.getUserGameHistories(userId);
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="gameHistory in gameHistories" :key="gameHistory.id" @click="goToGameHistory(gameHistory.id)">
          <td>{{ gameHistory.room.name }}</td>
          <td>{{ gameHistory.date }}</td>
          <td>{{ gameHistory.blackPlayer?.username }}</td>
          <td>{{ gameHistory.whitePlayer?.username }}</td>
          <td>{{ gameHistory.winner?.username }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
