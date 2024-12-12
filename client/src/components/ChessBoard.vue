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
        <div v-for="column in chessBoard?.getBoard()">
          <div v-for="cell in column" class="square" :class="{ highlight: cell.isHighlighted }" @drop="drop($event, cell)" @dragover.prevent @dragenter.prevent>
            <img v-if="cell.piece" v-bind:src="cell.piece.getSprite()" v-bind:alt="cell.piece.getColor() + ' ' + cell.piece.getName()" draggable="true" @dragstart="pickUp($event, cell)"/>
            <div v-else> </div>
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
import { Position } from "@/models/Position";
import {socket} from "@/socket";
import type {Cell} from "@/models/Cell";
const chessBoard = defineModel<Chessboard>('chessBoard', {});

function pickUp(event: DragEvent, cell: Cell) {
  socket.emit('GET_MOVES', cell.position);
  event.dataTransfer?.setData('position', JSON.stringify(cell.position));
}

function drop(event: DragEvent, destination: Cell) {
  event.preventDefault();
  const fromData = event.dataTransfer?.getData('position');
  if (fromData) {
    const fromRaw = JSON.parse(fromData);
    const from = new Position(fromRaw.x, fromRaw.y);
    const to = new Position(destination.position.x, destination.position.y);

    if (chessBoard.value) chessBoard.value.movePiece(from, to);
    socket.emit('MOVE_PIECE', {from, to});
  }
}

</script>
