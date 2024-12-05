<template>
  <div class="chessboard">
    <div v-for="column in chessBoard?.board">
      <div v-for="cell in column" class="square">
        <img v-if="cell?.getSprite()" v-bind:src="cell?.getSprite()" v-bind:alt="cell?.getColor() + ' ' + cell?.getName()" />
        <div v-if="!cell?.getSprite()"> </div>
      </div>
    </div>
  </div>



  <!--  TODO Rotate the print of the chessboard
  <div id="chessboard">
    <table>
      <thead>
        <tr>
          <td><span>8</span></td>
          <td><span>7</span></td>
          <td><span>6</span></td>
          <td><span>5</span></td>
          <td><span>4</span></td>
          <td><span>3</span></td>
          <td><span>2</span></td>
          <td><span>1</span></td>
        </tr>
      </thead>
      <tbody>
          <tr v-for="column in chessBoard?.board">
              <td v-for="cell in column" class="square">
                <img v-if="cell?.getSprite()" v-bind:src="cell?.getSprite()" v-bind:alt="cell?.getColor() + ' ' + cell?.getName()" />
                <div v-if="!cell?.getSprite()"> </div>
              </td>
          </tr>
      </tbody>
    </table>

    <div id="squares_letters">
      <p>H</p>
      <p>G</p>
      <p>F</p>
      <p>E</p>
      <p>D</p>
      <p>C</p>
      <p>B</p>
      <p>A</p>
    </div>
  </div> -->

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
