<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import { Button, InputGroup, InputGroupAddon, InputText, InputNumber, Message, Password } from 'primevue'
import { useRoute } from 'vue-router'
import { useStoredUserService } from '@/composables/user/storedUserService'
import { useUserService } from '@/composables/user/userService'
import { useGameHistoryService } from '@/composables/history/historyService'
import type { User } from '@/models/User'
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { AxiosError } from 'axios'
const userService = useUserService();
const storedUserService = useStoredUserService();
const gameHistoryService = useGameHistoryService();
const userId = storedUserService.storedUser.value.id;
const route = useRoute();
const confirm = useConfirm();
const toast = useToast();
const isOwner = route.params.id == userId.toString();
let lastError = ref("");
let processing = ref(false);

const user = ref<User>({ username: "", password: "", id: -1, elo: 0 });

let winPercentage = ref<number>(0);
let averageGameDuraion = ref<number>(0);
let averageGameMoves = ref<number>(0);
let totalGameTime = ref<number>(0);

onMounted(async () => {
  if (!route.params.id || route.params.id !instanceof String) {
    return;
  }
  const id = parseInt(route.params.id as string);
  if (isNaN(id)) {
    return;
  }

  user.value = await userService.getUserById(id);
  user.value.password = "";

  winPercentage.value = await gameHistoryService.getWinPercentageByUserId(id);
  averageGameDuraion.value = await gameHistoryService.getAverageGameDurationByUserId(id);
  averageGameMoves.value = await gameHistoryService.getAverageGameMoveByUserId(id);
  totalGameTime.value = await gameHistoryService.getTotalGametimeByUserId(id);

});

function requestDeletion() {
  confirm.require({
    header: 'Confirmation',
    message: 'Are you sure you want to delete your account? This action is irreversible and your progress data will be lost.',
    icon: 'fa-solid fa-triangle-exclamation',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      icon: 'fa-solid fa-xmark',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm',
      severity: 'danger',
      icon: 'fa-solid fa-check',
    },
    accept: async () => {
      lastError.value = "";
      processing.value = true;

      try {
        await userService.delete(userId);
        storedUserService.clear();
        toast.add({ severity: 'success', summary: 'Success', detail: 'Account deleted successfully.', life: 4000 });
      } catch (error) {
        if (error instanceof AxiosError) {
          lastError.value = error.response?.data.message ?? error.message;
        } else {
          lastError.value = "Unknown error";
        }
      } finally {
        processing.value = false;
      }
    },
  });
}

function requestUpdate() {
  confirm.require({
    header: 'Confirmation',
    message: 'Are you sure you want to update your account? Be sure to note your new password.',
    icon: 'fa-solid fa-triangle-exclamation',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      icon: 'fa-solid fa-xmark',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm',
      severity: 'danger',
      icon: 'fa-solid fa-check',
    },
    accept: async () => {
      lastError.value = "";
      processing.value = true;

      try {
        await userService.update(user.value);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Account updated successfully.', life: 4000 });
      } catch (error) {
        if (error instanceof AxiosError) {
          lastError.value = error.response?.data.message ?? error.message;
        } else {
          lastError.value = "Unknown error";
        }
      } finally {
        processing.value = false;
      }
    },
  });
}

</script>

<template>
  <Navbar></Navbar>
  <div class="">
    <div>
      <h1 class="text-center">User profile</h1>

      <Message v-if="lastError" severity="error" icon="fa-solid fa-circle-exclamation" class="mb-2">{{ lastError }}</Message>

      <InputGroup class="mb-2">
        <InputGroupAddon>
          <i class="fa-solid fa-user"></i>
        </InputGroupAddon>
        <InputText v-model="user.username" placeholder="Username" :readonly="!isOwner"></InputText>
      </InputGroup>

      <InputGroup class="mb-2" v-if="isOwner">
        <InputGroupAddon>
          <i class="fa-solid fa-key"></i>
        </InputGroupAddon>
        <Password v-model="user.password" :feedback="false" placeholder="Change password" toggleMask></Password>
      </InputGroup>

      <InputGroup class="mb-2">
        <InputGroupAddon>
          <i class="fa-solid fa-star"></i>
        </InputGroupAddon>
        <InputNumber v-model="user.elo" readonly fluid />
      </InputGroup>

      <div class="flex gap-1 p-1">
        <Button label="Save" icon="fa-solid fa-floppy-disk" v-if="isOwner" @click="requestUpdate()" :disabled="processing" />
        <Button label="Logout" icon="fa-solid fa-power-off" v-if="isOwner" @click="storedUserService.clear()" />
        <Button label="Delete account" icon="fa-solid fa-trash" v-if="isOwner" @click="requestDeletion()" :disabled="processing" />
        <RouterLink :to="'/history/' + route.params.id">
          <Button label="View game history" icon="fa-solid fa-clock" />
        </RouterLink>
      </div>
    </div>

    <div>
      <h1 class="text-center">User Statistics</h1>
      <p><i class="fa-solid fa-chess-king"></i> Percentage of win :  {{ winPercentage }}%</p>
      <p><i class="fa-solid fa-stopwatch"></i> Average Game Duration :  {{ averageGameDuraion }} minutes</p>
      <p><i class="fa-solid fa-hourglass-half"></i> Total of game time  :  {{ totalGameTime }} minutes</p>
      <p><i class="fa-solid fa-up-down-left-right"></i> Average Game Moves  :  {{ averageGameMoves }} </p>

    </div>
  </div>

</template>

<style scoped>

</style>
