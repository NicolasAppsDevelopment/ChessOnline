<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useStoredUserService } from "@/composables/user/storedUserService";
import { useUserService } from '@/composables/user/userService';
import {onMounted, ref} from "vue";

const storedUserService = useStoredUserService();
const userService = useUserService();

const userId = storedUserService.storedUser.value.id;

const actualUserRank = ref("calcul...");
const actualUserUsername = ref("calcul..");
const actualUserElo = ref("calcul..");
const users = ref([]);

onMounted(async () => {
  let actualUser = await userService.getUserById(userId);
  actualUser = actualUser.data;


  actualUserUsername.value = actualUser.username;
  actualUserElo.value = actualUser.elo;

  let rank = await userService.getUserRank(userId);
  actualUserRank.value = rank.data;

  let leaderboard = await userService.getLeaderboard();
  users.value = leaderboard.data

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
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td><a href="{{ path('app_account_view', {'id': user.id}) }}">{{ user.username }}</a></td>
          <td>{{ user.elo }}</td>
        </tr>
        <tr>
          <td>{{ actualUserRank }}</td>
          <td>{{ actualUserUsername }}</td>
          <td>{{ actualUserElo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
