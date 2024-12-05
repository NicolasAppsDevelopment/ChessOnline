<template>

  <div>
    <div class="chessboard-top">
      <span>8</span>
      <span>7</span>
      <span>6</span>
      <span>5</span>
      <span>4</span>
      <span>3</span>
      <span>2</span>
      <span>1</span>
    </div>
    <div class="chessboard-right-container">
      <div class="chessboard">
        <div v-for="column in chessBoard?.board">
          <div v-for="cell in column" class="square">
            <img v-if="cell?.getSprite()" v-bind:src="cell?.getSprite()" v-bind:alt="cell?.getColor() + ' ' + cell?.getName()" />
            <div v-if="!cell?.getSprite()"> </div>
          </div>
        </div>
      </div>
      <div class="chessboard-right">
        <span>H</span>
        <span>G</span>
        <span>F</span>
        <span>E</span>
        <span>D</span>
        <span>C</span>
        <span>B</span>
        <span>A</span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import type { Chessboard } from '@/models/Chessboard';
const chessBoard = defineModel<Chessboard>('chessBoard', {});

/**
document.addEventListener("DOMContentLoaded", (event) => {
  const squares = document.getElementsByClassName("square");
  console.log(squares);
  for (let row=0;row<8;row++) {
    for (let column=0;column<8;column++) {
      if ((row + column) % 2) {
        squares[(row + column)].className = 'black';
      } else {
        squares[(row + column)].className = 'white';
      }
    }
  }
});
*/


</script>

<style scoped>
@import '@/assets/main.css';
</style>
