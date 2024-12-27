<script setup lang="ts">
import ChessBoardComponent from "@/components/ChessBoard.vue";
import {useRoomService} from "@/composables/room/roomService";
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Chessboard } from "@/models/Chessboard";
import Navbar from "@/components/Navbar.vue";
import { socket } from '@/socket'
import { getChessboardFromRawBoard } from '@/mapper/ChessboardMapper'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const route = useRoute()
const roomsService = useRoomService();

const chessboard = ref<Chessboard>(new Chessboard());
onMounted(() => {
  socket.emit('JOIN_ROOM', route.params.id);
  socket.on('JOIN_ROOM_RESPONSE', async (error: string) => {
    if (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: error, closable: false, life: 4000 });
      router.push({ path: '/' });
      return;
    }
    await roomsService.join(route.params.id as string);
    socket.emit('GET_CHESSBOARD');
  });
  socket.on('GET_CHESSBOARD_RESPONSE', (board: any) => {
    if (board === null) {
      toast.add({ severity: 'error', summary: 'Error', detail: "bébou" , closable: false, life: 4000});
      router.push({ path: '/' });
      return;
    }
    const newChessboard: Chessboard = getChessboardFromRawBoard(board);
    if (chessboard.value) chessboard.value = newChessboard;
  });
});
onBeforeUnmount(() => {
  socket.emit('LEAVE_ROOM');
});

</script>

<template>
  <Navbar></Navbar>
  <ChessBoardComponent v-model:chessboard="chessboard"></ChessBoardComponent>
</template>

<style scoped>

</style>
