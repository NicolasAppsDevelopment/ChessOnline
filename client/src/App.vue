<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import ChessBoardComponent from './components/ChessBoard.vue'

import { ref } from 'vue';
import type { Chessboard } from '../src/class/chessboard';

import { socket } from "@/socket";

socket.emit("message", "test");

const chessBoard = ref<Chessboard>();

</script>

<template>
    <ChessBoardComponent v-model:chessBoard="chessBoard"></ChessBoardComponent>
</template>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
