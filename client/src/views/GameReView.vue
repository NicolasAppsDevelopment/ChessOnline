<script setup lang="ts">
import ChessBoardComponent from "@/components/ChessBoard.vue";
import Navbar from "@/components/Navbar.vue";
import {useRoomService} from "@/composables/room/roomService";
import { useUserService } from '@/composables/user/userService';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { getChessboardFromRawBoard } from '@/mapper/ChessboardMapper'
import router from '@/router'
import { useRoute } from 'vue-router'
import { Button } from 'primevue'
import PromotionSelectorWindow from '@/components/PromotionSelectorDialog.vue'
import { useConfirm } from "primevue/useconfirm";
import { useStoredUserService } from '@/composables/user/storedUserService'
import type { GameHistory } from '@/models/GameHistory'
import { Position } from '@/models/Position'
import { Chessboard } from "@/models/Chessboard";
import type { Move } from "@/models/Move";
import { Piece } from "@/models/Piece";
import { Rook } from "@/models/Rook";
import { Queen } from "@/models/Queen";
import { Knight } from "@/models/Knight";
import { Bishop } from "@/models/Bishop";

const confirm = useConfirm();
const roomsService = useRoomService();
const route = useRoute();
let chessboard = ref<Chessboard>(new Chessboard());//TODO props
const storedUserService = useStoredUserService();
const userId = storedUserService.storedUser.value.id;

const userService = useUserService();
const gameHistorId = parseInt(route.params.id as string);
const gameHistory = ref<GameHistory>();

let moveNumber = 0;
let moves: Move[] | null | undefined = null;

let chessboardStates: Chessboard[] = [] ; 

onMounted(async () => {
  gameHistory.value = await userService.getGameHistoryById(gameHistorId);
  moves = gameHistory.value.moves;
  chessboardStates.push(getChessboardFromRawBoard(chessboard.value));
});


function previous() {
  if (moves != null && moveNumber>=0){
    moveNumber --;
    chessboard.value = chessboardStates[moveNumber];
  } 
}

function next() {
  if (moves != null && moveNumber<moves.length){
    moveNumber ++;
    if (!chessboardStates[moveNumber]){
      chessboard.value.replayMovePiece(new Position(moves[moveNumber-1].from_x, moves[moveNumber-1].from_y), new Position(moves[moveNumber-1].to_x, moves[moveNumber-1].to_y));
      if (moves[moveNumber-1].promotion){
        let cellToModify = chessboard.value.getCellFromXY(moves[moveNumber-1].to_x,moves[moveNumber-1].to_y);
        if (cellToModify != null){
          if (cellToModify.piece != null){
            switch (moves[moveNumber-1].promotionIntoWhichPiece) {
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
      return;
    }
    chessboard.value = chessboardStates[moveNumber];
  } 
}

</script>

<template>
  <Navbar></Navbar>
  <div class="flex gap-1 p-1" >
    <ChessBoardComponent v-model="chessboard"></ChessBoardComponent>
    <div>
      <p><i class="fa-solid fa-user"></i> Black Player : {{ gameHistory?.blackPlayer?.username }}</p>
      <p><i class="fa-solid fa-user"></i> White Player : {{ gameHistory?.whitePlayer?.username }}</p>
      <p><i class="fa-solid fa-chess-king"></i> Winner : {{ gameHistory?.winner?.username }}</p>
    </div>
  </div>
  <div class="flex gap-1 p-1">
    <Button label="Previous" icon="fa-solid fa-angle-left" @click="previous()"></Button>
    <Button label="Next" icon="fa-solid fa-angle-right" @click="next()"></Button>
  </div>
</template>
