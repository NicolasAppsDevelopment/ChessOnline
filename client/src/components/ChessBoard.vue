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
        <div v-for="column in chessBoard?.board ">
          <div v-for="cell in column" class="square" @drop="letDown" @dragover.prevent @dragenter.prevent>
            <img v-if="cell?.getSprite()" v-bind:src="cell?.getSprite()" v-bind:alt="cell?.getColor() + ' ' + cell?.getName()"  @mousemove="move"
                 draggable="true" @dragstart="pickUp"/>
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

let pieceGrabbed : EventTarget | null = null;

function pickUp(event: MouseEvent) {
  pieceGrabbed = event.target;
  console.log("pickup")
  console.log(event.target)
}

function move(event: MouseEvent) {
  if (pieceGrabbed){
    pieceGrabbed.
    pieceGrabbed.classList.add("grabbing")
    pieceGrabbed.style.top = event.y;
    pieceGrabbed.style.left = event.x;
  }
  console.log("move")
  console.log(event.target)
}


function letDown(element: HTMLElement, event: MouseEvent) {
  element.classList.remove("grabbing");
  pieceGrabbed = null;
  console.log("letdown")
  console.log(event.target)
}


console.log(chessBoard.value?.board[0])
</script>
