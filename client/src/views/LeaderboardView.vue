<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useStoredUserService } from "@/composables/user/storedUserService";
import { useUserService } from '@/composables/user/userService';
import {onBeforeMount, onMounted, ref} from "vue";

const storedUserService = useStoredUserService();
const userService = useUserService();

const userId = storedUserService.storedUser.value.id;

const actualUserRank = ref("calcul...");
const actualUserUsername = ref("calcul..");
const actualUserElo = ref("calcul..");

onMounted(async () => {
  let actualUser = await userService.getUserById(userId);
  actualUser = actualUser.data;


  actualUserUsername.value = actualUser.username;
  actualUserElo.value = actualUser.elo;

  console.log();

  let rank = await userService.getUserRank(userId);
  rank = rank.data;

  actualUserRank.value = rank;



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
        <!--{% for user in users %}
        <tr>
          <td>{{ user.rank }}</td>
          <td><a href="{{ path('app_account_view', {'id': user.id}) }}">{{ user.username }}</a></td>
          <td>{{ user.score }}</td>
        </tr>
        {% endfor %}-->
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
