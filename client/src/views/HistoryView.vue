<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import { useStoredUserService } from "@/composables/user/storedUserService";
import { useUserService } from '@/composables/user/userService';
import { onMounted, onUpdated, ref } from 'vue'
import type { GameHistory } from '@/models/GameHistory'

const storedUserService = useStoredUserService();
const userService = useUserService();

const userId = storedUserService.storedUser.value.id;
const gameHistories = ref<GameHistory[]>([]);

onMounted(async () => {
  gameHistories.value = await userService.getUserGameHistories(userId);
});

</script>

<template>
  <Navbar></Navbar>

  <div class="p1">
    <h1>Game Histories</h1>
    <table>
      <thead>
        <tr>
          <th><i class="fa-solid fa-user"></i> Room Name</th>
          <th><i class="fa-solid fa-user"></i> Date</th>
          <th><i class="fa-solid fa-star"></i> Black Player</th>
          <th><i class="fa-solid fa-star"></i> White Player</th>
          <th><i class="fa-solid fa-star"></i> Winner</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="gameHistory in gameHistories" :key="gameHistory.id">
          <!--<td>{{ gameHistory.room.name }}</td>
          <td>{{ gameHistory.date }}</td>
          <td>{{ gameHistory.blackPlayer?.username }}</td>
          <td>{{ gameHistory.whitePlayer?.username }}</td>
          <td>{{ gameHistory.winner?.username }}</td>
          <td><RouterLink :to="'/user/' + gameHistory.id"><i class="fa-solid fa-star"></i></RouterLink></td>
          -->
        </tr> 
      </tbody>
    </table>
  </div>
</template>


<style scoped>

</style>
