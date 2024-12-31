<script setup lang="ts">
import ChessBoardComponent from "@/components/ChessBoard.vue";
import Navbar from "@/components/Navbar.vue";
import {useRoomService} from "@/composables/room/roomService";
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Chessboard } from "@/models/Chessboard";
import { socket } from '@/socket'
import { getChessboardFromRawBoard } from '@/mapper/ChessboardMapper'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { Button } from 'primevue'
import PromotionSelectorWindow from '@/components/PromotionSelectorDialog.vue'
import { useConfirm } from "primevue/useconfirm";
import { useStoredUserService } from '@/composables/user/storedUserService'

const confirm = useConfirm();
const toast = useToast();
const route = useRoute()
const roomsService = useRoomService();
const chessboard = ref<Chessboard>(new Chessboard());
const storedUserService = useStoredUserService();
const userId = storedUserService.storedUser.value.id;

socket.on('JOIN_ROOM_RESPONSE', async (error: string) => {
  if (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error, closable: false, life: 4000 });
    router.push({ path: '/' });
    return;
  }
  await roomsService.join(route.params.id as string);
  socket.emit('GET_CHESSBOARD');
});
socket.on('UPDATE_CHESSBOARD', (board: any) => {
  if (board === null) {
    toast.add({ severity: 'error', summary: 'Error', detail: "bébou" , closable: false, life: 4000});
    router.push({ path: '/' });
    return;
  }
  const newChessboard: Chessboard = getChessboardFromRawBoard(board);
  if (chessboard.value) chessboard.value = newChessboard;
});
socket.on('PLAYER_JOINED', async (username: string) => {
  toast.add({ severity: 'info', summary: 'Info', detail: username + " joined the room.", closable: false, life: 4000 });
});
socket.on('PLAYER_LEFT', async (username: string) => {
  toast.add({ severity: 'info', summary: 'Info', detail: username + " left the room.", closable: false, life: 4000 });
});
socket.on('PLAYER_DISCONNECTED', async (username: string) => {
  toast.add({ severity: 'warn', summary: 'Warning', detail: username + " lost connection with the room.", closable: false, life: 4000 });
});

onMounted(() => {
  socket.emit('JOIN_ROOM', route.params.id);
});
onBeforeUnmount(() => {
  socket.off('JOIN_ROOM_RESPONSE');
  socket.off('UPDATE_CHESSBOARD');
  socket.off('PLAYER_JOINED');
  socket.off('PLAYER_LEFT');
  socket.off('PLAYER_DISCONNECTED');
  socket.emit('LEAVE_ROOM');
});

function askDraw() {
  confirm.require({
    header: 'Confirmation',
    message: 'Are you sure you want to ask for a draw?',
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
    accept: () => {
      socket.emit('ASK_DRAW');
      toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Draw request send.', life: 4000 });
    },
  });
}
function resign() {
  confirm.require({
    header: 'Confirmation',
    message: 'Are you sure you want to resign?',
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
    accept: () => {
      socket.emit('RESIGN');
    },
  });
}

const drawAskingOpponentPlayerId = computed(() => chessboard.value.drawAskingOpponentPlayerId);
watch(drawAskingOpponentPlayerId, async (newVal) => {
  if (newVal == userId) {
    confirm.require({
      header: 'Draw request',
      message: 'Your opponent asked for a draw. Do you accept?',
      icon: 'fa-solid fa-triangle-exclamation',
      rejectProps: {
        label: 'Reject',
        severity: 'secondary',
        icon: 'fa-solid fa-xmark',
        outlined: true
      },
      acceptProps: {
        label: 'Accept',
        icon: 'fa-solid fa-check',
      },
      accept: () => {
        socket.emit('ACCEPT_DRAW');
      },
      reject: () => {
        socket.emit('DENY_DRAW');
      }
    });
  }
})

</script>

<template>
  <Navbar></Navbar>
  <ChessBoardComponent v-model="chessboard"></ChessBoardComponent>
  <div class="flex gap-1 p-1">
    <Button label="Resign" icon="fa-solid fa-flag" @click="resign()"></Button>
    <Button label="Draw" icon="fa-solid fa-equals" @click="askDraw()"></Button>
  </div>
  <PromotionSelectorWindow v-model="chessboard"></PromotionSelectorWindow>
</template>
