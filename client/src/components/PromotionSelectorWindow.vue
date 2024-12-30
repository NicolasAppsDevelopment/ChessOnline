<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="visible" modal header="Promotion" :style="{ width: '25rem' }" :closable="false">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Your pawn just reach the opposite edge of the board. You can promote your pawn into the class you want.</span>
      <div class="flex flex-row justify-end gap-2">
        <Button type="button" @click="">
          <img :src="getPieceImage('queen')" alt="Queen" />
        </Button>
        <Button type="button" @click="">
          <img :src="getPieceImage('knight')" alt="Knight" />
        </Button>
        <Button type="button" @click="">
          <img :src="getPieceImage('rook')" alt="Rook" />
        </Button>
        <Button type="button" @click="">
          <img :src="getPieceImage('bishop')" alt="Bishop" />
        </Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Dialog, Button } from "primevue";
import { Chessboard } from '@/models/Chessboard';
import { ref } from 'vue'
import { Color } from '@/models/Piece'
const chessboard = defineModel<Chessboard>({ required: true });

const visible = ref(false);

function getPieceImage(piece: string) {
  return `/src/assets/images/${chessboard.value.colorTurn == Color.White ? 'green' : 'red'} ${piece}.png`;
}
</script>
