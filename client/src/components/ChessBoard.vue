<template>
 
  <table class="table">
    <tbody>
        <tr v-for="column in chessBoard?.board">
            <td v-for="cell in column" >{{[cell]}}</td>
        </tr>
    </tbody>
  </table>
  
</template>

<script setup lang="ts">
import type { Chessboard } from '@/class/chessboard';
const chessBoard = defineModel<Chessboard>('chessBoard', {});

console.log(chessBoard.value?.board[0])
</script>

<style scoped>
</style>
