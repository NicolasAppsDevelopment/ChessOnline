<script setup lang="ts">
import ChessBoardComponent from "@/components/ChessBoard.vue";

import { onMounted, ref } from 'vue'
import { Chessboard } from "@/models/Chessboard";
import Navbar from "@/components/Navbar.vue";
import { socket } from '@/socket'
import type { Cell } from '@/models/Cell'
import { getCellsFromRawBoard } from '@/mapper/ChessboardMapper'
import router from '@/router'


const chessBoard = ref<Chessboard>(new Chessboard());
onMounted(() => {
  socket.emit('GET_BOARD');
  socket.on('GET_BOARD_RESPONSE', (board: any[]) => {
    if (board === null) {
      router.push({ path: '/' });
      return;
    }
    const cells: Cell[] = getCellsFromRawBoard(board);
    if (chessBoard.value) chessBoard.value.board = cells;
  });
})

</script>

<template>
  <Navbar></Navbar>
  <ChessBoardComponent v-model:chessBoard="chessBoard"></ChessBoardComponent>
</template>

<style scoped>

</style>
