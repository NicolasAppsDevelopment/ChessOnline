<script setup lang="ts">
import { useStoredUserService } from "@/composables/user/storedUserService";
import {Button} from "primevue";
const service = useStoredUserService();
console.log(service.storedUser.value.token);
</script>

<template>
  <Button label="Logout" @click="service.clear()"></Button>
</template>

<style scoped>

</style>
