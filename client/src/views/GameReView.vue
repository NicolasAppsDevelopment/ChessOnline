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

const confirm = useConfirm();
const roomsService = useRoomService();
const route = useRoute();
let chessboard = ref<Chessboard>(new Chessboard());//TODO props
const storedUserService = useStoredUserService();
const userId = storedUserService.storedUser.value.id;

const userService = useUserService();
const gameHistorId = parseInt(route.params.id as string);
const gameHistory = ref<GameHistory>();

let moveNumber = -1;
let moves: any[] | null | undefined = null;

onMounted(async () => {
  gameHistory.value = await userService.getGameHistoryById(gameHistorId);
  console.log(gameHistory.value);
  moves = gameHistory.value.moves;
});


function previous() {
  if (moves != null && moveNumber>=0){
    chessboard.value.movePiece(new Position(moves[moveNumber].to_x,moves[moveNumber].to_y), new Position(moves[moveNumber].from_x,moves[moveNumber].from_y));
    moveNumber --;
  } 
}

function next() {
  if (moves != null && moveNumber<moves.length){
    moveNumber ++;
    console.log(typeof moves[0].from );
    chessboard.value.movePiece(new Position(moves[moveNumber].from_x,moves[moveNumber].from_y), new Position(moves[moveNumber].to_x,moves[moveNumber].to_y));
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
  <PromotionSelectorWindow v-model="chessboard"></PromotionSelectorWindow>
</template>
