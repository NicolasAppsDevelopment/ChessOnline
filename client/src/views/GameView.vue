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
const route = useRoute()


const chessboard = ref<Chessboard>(new Chessboard());
onMounted(() => {
  socket.emit('JOIN_ROOM', route.params.id);
  socket.on('JOIN_ROOM_RESPONSE', (error: string) => {
    if (error) {
      console.error(error);
      router.push({ path: '/' });
      return;
    }
    socket.emit('GET_BOARD');
  });
  socket.on('GET_BOARD_RESPONSE', (board: any[]) => {
    if (board === null) {
      console.error("board is null");
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
