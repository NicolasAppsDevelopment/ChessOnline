<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useStoredUserService } from "@/composables/user/storedUserService";
import { useUserService } from '@/composables/user/userService';
import { onMounted, onUpdated, ref } from 'vue'
import type { UserRank } from '@/models/User'

const storedUserService = useStoredUserService();
const userService = useUserService();

const userId = storedUserService.storedUser.value.id;
const users = ref<UserRank[]>([]);

onMounted(async () => {
  users.value = await userService.getLeaderboard();
});

onUpdated(async () => {
  const scrollToElement = document.getElementById(userId.toString());
  if (scrollToElement) {
    scrollToElement.scrollIntoView({ behavior: "smooth" });
  }
});

</script>

<template>
  <Navbar></Navbar>

  <div class="p1">
    <h1>Leaderboard</h1>
    <table class="leaderboard">
      <thead>
        <tr>
          <th><i class="fa-solid fa-medal"></i> Position</th>
          <th><i class="fa-solid fa-user"></i> Username</th>
          <th><i class="fa-solid fa-star"></i> Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id" :class="{ 'highlight-border': (user.id == userId)}" :id="user.id.toString()">
          <td>{{ index + 1 }}</td>
          <td><RouterLink :to="'/user/' + user.id">{{ user.username }}</RouterLink></td>
          <td>{{ user.elo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
