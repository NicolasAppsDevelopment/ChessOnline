<script setup lang="ts">
import ChessBoardComponent from "@/components/ChessBoard.vue";

import {ref} from "vue";
import { Chessboard } from "@/class/chessboard";

const chessBoard = ref<Chessboard>(new Chessboard());

</script>

<template>
  <ChessBoardComponent v-model:chessBoard="chessBoard"></ChessBoardComponent>
</template>

<style scoped>

</style>