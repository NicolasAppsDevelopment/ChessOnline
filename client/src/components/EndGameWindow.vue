<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="chessboard.isEndGame" modal :header="getTitle()" :style="{ width: '25rem' }" :closable="false">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">This is the end of the game. You can ask for a rematch, leave the room or move this window to see the board.</span>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Leave" severity="secondary" icon="fa-solid fa-xmark" @click="leave()"></Button>
        <Button type="button" label="Rematch" icon="fa-solid fa-arrows-rotate" @click="resetGame()"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Dialog, Button } from "primevue";
import { Chessboard } from '@/models/Chessboard';
import router from '@/router/index';
import { useStoredUserService } from '@/composables/user/storedUserService'
import { socket } from '@/socket'
const chessboard = defineModel<Chessboard>({ required: true });
const storedUserService = useStoredUserService();
const userId = storedUserService.storedUser.value.id;

function getTitle() {
  if (chessboard.value?.winnerPlayerId == null) return "Draw 🤝";
  return chessboard.value?.winnerPlayerId == userId ? "You win 🎉" : "You lose 🥲";
}

function leave() {
  router.push("/");
}

function resetGame() {
  socket.emit('RESET');
}

</script>
