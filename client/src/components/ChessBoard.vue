<template>
  <div class="chessboard-container" :class="{ inversed: playerColor == Color.Black }">
    <div class="notation-top">
      <span>A</span>
      <span>B</span>
      <span>C</span>
      <span>D</span>
      <span>E</span>
      <span>F</span>
      <span>G</span>
      <span>H</span>
    </div>
    <div class="chessboard">
      <div v-for="column in chessBoard?.getBoard()">
        <div v-for="cell in column" class="square" :class="{ highlight: cell.isHighlighted }" @drop="drop($event, cell)" @dragover.prevent @dragenter.prevent>
          <img v-if="cell.piece" v-bind:src="cell.piece.getSprite()" v-bind:alt="cell.piece.getColor() + ' ' + cell.piece.getName()" draggable="true" @dragstart="pickUp($event, cell)"/>
          <div v-else> </div>
        </div>
      </div>
    </div>
    <div class="notation-left">
      <span>8</span>
      <span>7</span>
      <span>6</span>
      <span>5</span>
      <span>4</span>
      <span>3</span>
      <span>2</span>
      <span>1</span>
    </div>
  </div>
  <Button label="Refresh" icon="fa-solid fa-arrows-rotate" @click="refresh()"></Button>
</template>

<script setup lang="ts">
import type {Chessboard} from '@/models/Chessboard';
import {Position} from "@/models/Position";
import {socket} from "@/socket";
import type {Cell} from "@/models/Cell";
import {getChessboardFromRawBoard} from "@/mapper/ChessboardMapper";
import {getPositionArrayFromRaw} from "@/mapper/PositionMapper";
import {Color} from "@/models/Piece";
import {useStoredUserService} from "@/composables/user/storedUserService";
import {Button} from 'primevue'
import { computed } from 'vue'

const chessBoard = defineModel<Chessboard>('chessboard', { required: true });

const storedUserService = useStoredUserService();
const userId = storedUserService.storedUser.value.id;

const playerColor = computed(() => {
  return chessBoard.value?.playersId.indexOf(userId) == 0 ? Color.White : Color.Black;
});

if (!socket.hasListeners('MOVE_RESPONSE')) {
  socket.on("MOVE_RESPONSE", (board: any) => {
    const newChessBoard: Chessboard = getChessboardFromRawBoard(board);
    if (chessBoard.value) chessBoard.value = newChessBoard;
  });
}
if (!socket.hasListeners('MOVES_RESPONSE')) {
  socket.on("MOVES_RESPONSE", (moves: any[]) => {
    const positions: Position[] = getPositionArrayFromRaw(moves);
    for (const position of positions) {
      const cell = chessBoard.value?.getCellFromPosition(position);
      if (cell) cell.isHighlighted = true;
    }
  });
}

function pickUp(event: DragEvent, cell: Cell) {
  if (chessBoard.value.playersId[chessBoard.value.turnIndex] != userId){
    console.log('not your turn');
    event.preventDefault();
    return;
  }
  if (cell.piece?.getColor() != playerColor.value){
    event.preventDefault();
    console.log('player cannot move other color pieces');
    return;
  }

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

    if (chessBoard.value) {
      chessBoard.value.movePiece(from, to);
      chessBoard.value.clearHighlights();
    }
    socket.emit('MOVE_PIECE', from, to);
  }
}

function refresh() {
  socket.emit('GET_CHESSBOARD');
}

</script>
