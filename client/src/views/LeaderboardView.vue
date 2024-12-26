<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import {useStoredUserService} from "@/composables/user/storedUserService";
import { useUserService } from '@/composables/user/userService';

const storedUserService = useStoredUserService();
const userService = useUserService();

const actualUser = await userService.getUserById(storedUserService.storedUser.value.id);
const actualUserData = actualUser.data;

const actualUserRank = 0;

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
        {% endfor %}
        <tr>
          <td>{{ actualUserRank }}</td>
          <td>{{ actualUserData.username }}</td>
          <td>{{ actualUserData.elo }}</td>
        </tr>-->
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
