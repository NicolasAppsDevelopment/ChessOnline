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
          <div v-for="cell in column" class="square" @drop="drop($event, cell)" @dragover.prevent @dragenter.prevent>
            <img v-if="isCellNotEmpty(cell)" v-bind:src="cell.getSprite()" v-bind:alt="cell.getColor() + ' ' + cell.getName()" draggable="true" @dragstart="pickUp($event, cell)"/>
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
import { Piece } from '@/models/Piece';
import { Position } from "@/models/Position";
const chessBoard = defineModel<Chessboard>('chessBoard', {});

function pickUp(event: DragEvent, piece: Piece) {
  event.dataTransfer?.setData('position', JSON.stringify(piece.getPosition()));
}

function drop(event: DragEvent, destination: Piece | Position) {
  event.preventDefault();
  const fromData = event.dataTransfer?.getData('position');
  if (fromData) {
    const fromRaw = JSON.parse(fromData);
    const from = new Position(fromRaw.x, fromRaw.y);
    let to: Position;

    if (destination instanceof Position) {
      to = destination
    } else {
      to = destination.getPosition();
    }

    if (chessBoard.value) chessBoard.value.movePiece(from, to);
  }
}

function isCellNotEmpty(cell: Piece | Position): boolean {
  return cell instanceof Piece;
}

</script>
