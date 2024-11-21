<template>
    <!--
    <p>v-model="chessBoard.board"</p>
    <table class="table">
      <tbody>
          <tr v-for="(item, index) in chessBoard.board" :key="index">
              <td v-for="(column, indexColumn) in columns" :key="indexColumn">{{item[column]}}</td>
          </tr>
      </tbody>
    </table>
  -->
</template>

<script setup lang="ts">
import type { Chessboard } from '@/class/chessboard';
const chessBoard = defineModel<Chessboard>('chessboard');

</script>

<style scoped>
</style>
