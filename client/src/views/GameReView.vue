<script setup lang="ts">
import ChessBoardComponent from '@/components/ChessBoard.vue'
import Navbar from '@/components/Navbar.vue'

import { useGameHistoryService } from '@/composables/history/historyService'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Button, Tag } from 'primevue'

import { getChessboardFromRawBoard } from '@/mapper/ChessboardMapper'
import type { GameReplay } from '@/models/GameHistory'
import { Position } from '@/models/Position'
import { Chessboard } from '@/models/Chessboard'
import type { MoveReplay } from '@/models/MoveReplay'
import { Rook } from '@/models/Rook'
import { Queen } from '@/models/Queen'
import { Knight } from '@/models/Knight'
import { Bishop } from '@/models/Bishop'

const route = useRoute();
const chessboard = ref<Chessboard>(new Chessboard());

const gameHistoryService = useGameHistoryService();
const gameHistorId = parseInt(route.params.id as string);
const gameHistory = ref<GameReplay>();

const moveNumber = ref<number>(0);
let moves: MoveReplay[] | null | undefined = null;

let chessboardStates: Chessboard[] = [] ;
const processing = ref<boolean>(true);

onMounted(async () => {
  gameHistory.value = await gameHistoryService.getGameHistoryById(gameHistorId);
  moves = gameHistory.value.moves;

  if (!moves) {
    return;
  }

  chessboardStates.push(getChessboardFromRawBoard(chessboard.value));

  for (const move of moves) {
    chessboard.value.replayMovePiece(new Position(move.from_x, move.from_y), new Position(move.to_x, move.to_y))
    if (move.promotion) {
      let cellToModify = chessboard.value.getCellFromXY(move.to_x, move.to_y)
      if (cellToModify != null) {
        if (cellToModify.piece != null) {
          switch (move.promotionIntoWhichPiece) {
            case "Queen":
              cellToModify.piece = new Queen(cellToModify.piece.getColor());
              break;
            case "Knight":
              cellToModify.piece = new Knight(cellToModify.piece.getColor());
              break;
            case "Rook":
              cellToModify.piece = new Rook(cellToModify.piece.getColor());
              break;
            case "Bishop":
              cellToModify.piece = new Bishop(cellToModify.piece.getColor());
              break;
            default:
              console.log("The promotion is not defined correctly");
          }
        }
      }
    }
    chessboardStates.push(getChessboardFromRawBoard(chessboard.value));
  }
  begin();
  processing.value = false;
});

function begin() {
  moveNumber.value = 0;
  chessboard.value = chessboardStates[moveNumber.value];
}

function end() {
  if (moves != null){
    moveNumber.value = moves.length;
    chessboard.value = chessboardStates[moveNumber.value];
  }
}

function previous() {
  if (moves != null && moveNumber.value>0){
    moveNumber.value--;
    chessboard.value = chessboardStates[moveNumber.value];
  }
}

function next() {
  if (moves != null && moveNumber.value<moves.length){
    moveNumber.value++;
    chessboard.value = chessboardStates[moveNumber.value];
  }
}

</script>

<template>
  <Navbar></Navbar>

  <div>
    <p><i class="fa-solid fa-crown"></i> Winner : {{ gameHistory?.winner?.username }}</p>
  </div>

  <div class="flex flex-column gap-1 p-1">
    <RouterLink :to="'/user/' + gameHistory?.blackPlayer?.id">
      <Tag class="player-tag" severity="danger">
        <div class="flex items-center gap-2 px-1">
          <i class="fa-solid fa-user "></i>
          <span class="text-base">{{ gameHistory?.blackPlayer?.username ?? "Deleted user" }}</span>
        </div>
      </Tag>
    </RouterLink>
    <ChessBoardComponent v-model="chessboard"></ChessBoardComponent>
    <RouterLink :to="'/user/' + gameHistory?.whitePlayer?.id">
      <Tag class="player-tag" severity="success">
        <div class="flex items-center gap-2 px-1">
          <i class="fa-solid fa-user "></i>
          <span class="text-base">{{ gameHistory?.whitePlayer?.username ?? "Deleted user" }}</span>
        </div>
      </Tag>
    </RouterLink>
  </div>

  <div class="flex gap-1 p-1">
    <Button label="Begin" icon="fa-solid fa-backward-step" @click="begin()" :disabled="processing"></Button>
    <Button label="Previous" icon="fa-solid fa-angle-left" @click="previous()" :disabled="processing"></Button>
    <Button label="Next" icon-pos="right" icon="fa-solid fa-angle-right" @click="next()" :disabled="processing"></Button>
    <Button label="End" icon-pos="right" icon="fa-solid fa-forward-step" @click="end()" :disabled="processing"></Button>
    <span>{{ moveNumber }}/{{ moves?.length }}</span>
  </div>
</template>
