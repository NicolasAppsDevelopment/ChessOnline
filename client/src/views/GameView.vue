<script setup lang="ts">
import ChessBoardComponent from "@/components/ChessBoard.vue";

import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Chessboard } from "@/models/Chessboard";
import Navbar from "@/components/Navbar.vue";
import { socket } from '@/socket'
import type { Cell } from '@/models/Cell'
import { getCellsFromRawBoard } from '@/mapper/ChessboardMapper'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const route = useRoute()

const chessboard = ref<Chessboard>(new Chessboard());
onMounted(() => {
  socket.emit('JOIN_ROOM', route.params.id);
  socket.on('JOIN_ROOM_RESPONSE', (error: string) => {
    if (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: error , closable: false, life: 4000});
      router.push({ path: '/' });
      return;
    }
    socket.emit('GET_BOARD');
  });
  socket.on('GET_BOARD_RESPONSE', (board: any[]) => {
    if (board === null) {
      toast.add({ severity: 'error', summary: 'Error', detail: "bébou" , closable: false, life: 4000});
      router.push({ path: '/' });
      return;
    }
    const cells: Cell[] = getCellsFromRawBoard(board);
    if (chessboard.value) chessboard.value.board = cells;
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
