<script setup lang="ts">
import ChessBoardComponent from "@/components/ChessBoard.vue";
import Navbar from "@/components/Navbar.vue";
import {useRoomService} from "@/composables/room/roomService";
import { useUserService } from '@/composables/user/userService';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Chessboard } from "@/models/Chessboard";
import { getChessboardFromRawBoard } from '@/mapper/ChessboardMapper'
import router from '@/router'
import { useRoute } from 'vue-router'
import { Button } from 'primevue'
import PromotionSelectorWindow from '@/components/PromotionSelectorDialog.vue'
import { useConfirm } from "primevue/useconfirm";
import { useStoredUserService } from '@/composables/user/storedUserService'
import type { GameHistory } from '@/models/GameHistory'

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
let moves;

onMounted(async () => {
  gameHistory.value = await userService.getGameHistoryById(gameHistorId);
  const moves = gameHistory.value.moves;
  console.log(gameHistory.value);
});


function previous() {
  console.log("prev");
  if (moves != null){
    chessboard.value.movePiece(moves[moveNumber][1], moves[moveNumber][0]) 
    moveNumber --;
  } 
  
}

function next() {
  console.log("next");
  if (moves != null){
    moveNumber ++;
    chessboard.value.movePiece(moves[moveNumber][0], moves[moveNumber][1]) 
  } 
}

</script>

<template>
  <Navbar></Navbar>
  <ChessBoardComponent v-model="chessboard"></ChessBoardComponent>
  <div class="flex gap-1 p-1">
    <Button label="Previous" icon="fa-solid fa-angle-left" @click="previous()"></Button>
    <Button label="Next" icon="fa-solid fa-angle-right" @click="next()"></Button>
  </div>
  <PromotionSelectorWindow v-model="chessboard"></PromotionSelectorWindow>
</template>
