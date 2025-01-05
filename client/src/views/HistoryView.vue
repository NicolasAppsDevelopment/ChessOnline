<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import { Button, Checkbox, Message } from 'primevue'
import { useStoredUserService } from "@/composables/user/storedUserService"
import { useGameHistoryService } from '@/composables/history/historyService'
import { onMounted, ref, watch } from 'vue'
import type { GameHistory } from '@/models/GameHistory'
import router from '@/router'
import { useRoute } from 'vue-router'
import { AxiosError } from 'axios'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const route = useRoute();
watch(() => route.params.id, async () => {
  getData();
});

const storedUserService = useStoredUserService();
const gameHistoryService = useGameHistoryService();

const confirm = useConfirm();
const toast = useToast();
const lastError = ref("");

const gameHistories = ref<GameHistory[]>([]);
const userId = storedUserService.storedUser.value.id;
const isOwner = ref(false);

onMounted(async () => {
  getData();
});

async function getData() {
  if (!route.params.id || route.params.id !instanceof String) {
    return;
  }
  const id = parseInt(route.params.id as string);
  if (isNaN(id)) {
    return;
  }

  gameHistories.value = await gameHistoryService.getUserGameHistories(id);
  isOwner.value = route.params.id == userId.toString();
}

function goToGameHistory(id: number) {
  router.push({ path: '/gameReview/' + id });
}

function stopPropagation(event: Event) {
  event.stopPropagation();
}

function requestUpdate(gameHistory: GameHistory, event: Event) {
  event.stopPropagation();
  confirm.require({
    header: 'Confirmation',
    message: 'Are you sure you want to change this game visibility?',
    icon: 'fa-solid fa-triangle-exclamation',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      icon: 'fa-solid fa-xmark',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm',
      icon: 'fa-solid fa-check',
    },
    accept: async () => {
      lastError.value = "";

      try {
        await gameHistoryService.updateGameHistoryVisibility(gameHistory.id, gameHistory.isPublic);
        toast.add({ severity: 'success', summary: 'Success', detail: 'History visibility updated successfully.', life: 4000 });
      } catch (error) {
        if (error instanceof AxiosError) {
          lastError.value = error.response?.data.message ?? error.message;
        } else {
          lastError.value = "Unknown error";
        }
      }
    },
    reject: () => {
      lastError.value = "";
      gameHistory.isPublic = !gameHistory.isPublic;
    }
  });
}

</script>

<template>
  <Navbar></Navbar>

  <div class="p1">
    <h1>Game Histories</h1>
    <Message v-if="lastError" severity="error" icon="fa-solid fa-circle-exclamation" class="mb-2">{{ lastError }}</Message>
    <table class="gameHistory">
      <thead>
        <tr>
          <th><i class="fa-solid fa-calendar"></i> Date</th>
          <th><i class="fa-solid fa-user"></i> Black Player</th>
          <th><i class="fa-solid fa-user"></i> White Player</th>
          <th><i class="fa-solid fa-chess-king"></i> Winner</th>
          <th v-if="isOwner"><i class="fa-solid fa-eye"></i> Is public</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="gameHistory in gameHistories" :key="gameHistory.id" @click="goToGameHistory(gameHistory.id)">
          <td>{{ gameHistory.startDate }}</td>
          <td>
            <RouterLink :to="'/user/' + gameHistory.blackPlayer?.id" @click="stopPropagation">
              {{ gameHistory.blackPlayer?.username }}
            </RouterLink>
          </td>
          <td>
            <RouterLink :to="'/user/' + gameHistory.whitePlayer?.id" @click="stopPropagation">
              {{ gameHistory.whitePlayer?.username }}
            </RouterLink>
          </td>
          <td>
            <RouterLink :to="'/user/' + gameHistory.winner?.id" @click="stopPropagation">
              {{ gameHistory.winner?.username }}
            </RouterLink>
          </td>
          <td v-if="isOwner"><Checkbox v-model="gameHistory.isPublic" binary @click="requestUpdate(gameHistory, $event)" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
