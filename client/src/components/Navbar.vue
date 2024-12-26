<template>
    <nav class="navbar">
      <router-link to="/" class="nav-item"><i class="fa-solid fa-play"></i> Home </router-link>
      <router-link to="/leaderboard" class="nav-item"><i class="fa-solid fa-play"></i> LeaderBoard </router-link>
      <router-link to="/history" class="nav-item"><i class="fa-solid fa-play"></i> History </router-link>
      <router-link to="/statistics" class="nav-item"><i class="fa-solid fa-play"></i> Statistics </router-link>

      <div class="expanded"></div>

      <p class="nav-item">{{ storedUserService.storedUser.value.username }}</p>
      <Button label="Logout" @click="storedUserService.clear()" class="nav-item logout"></Button>
    </nav>
</template>

<script setup lang="ts">
import {Button} from "primevue";
import {useStoredUserService} from "@/composables/user/storedUserService";
const storedUserService = useStoredUserService();
</script>
