<script setup lang="ts">

import ChessBoardComponent from "@/components/ChessBoard.vue";
import type { Chessboard } from "@/class/chessboard";
import {ref} from "vue";

const chessBoard = ref<Chessboard>();

</script>

<template>
  <ChessBoardComponent v-model:chessboard="chessBoard"></ChessBoardComponent>
</template>

<style scoped>

</style>
