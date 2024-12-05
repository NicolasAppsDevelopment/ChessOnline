<script setup lang="ts">
import { useStoredUserService } from "@/composables/user/storedUserService";
import {Button} from "primevue";
import { socket } from "@/socket";
const storedUserService = useStoredUserService();

socket.emit("GET_ROOMS", "test");



</script>

<template>
  <Button label="Logout" @click="storedUserService.clear()"></Button>
  <h1>{{ storedUserService.storedUser.value.username }}</h1>
</template>

<style scoped>

</style>
