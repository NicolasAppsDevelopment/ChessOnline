<template>
  <div class="card flex justify-center">
    <Dialog :visible="visible" modal header="Promotion" :style="{ width: '25rem' }" :closable="false">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Your pawn just reach the opposite edge of the board. You can promote your pawn into the class you want.</span>
      <div class="flex flex-row justify-end gap-2">
        <Button type="button" @click="close('Queen')">
          <img :src="getPieceImage('queen')" alt="Queen" />
        </Button>
        <Button type="button" @click="close('Knight')">
          <img :src="getPieceImage('knight')" alt="Knight" />
        </Button>
        <Button type="button" @click="close('Rook')">
          <img :src="getPieceImage('rook')" alt="Rook" />
        </Button>
        <Button type="button" @click="close('Bishop')">
          <img :src="getPieceImage('bishop')" alt="Bishop" />
        </Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Button, Dialog } from 'primevue'
import { useModal } from '@/composables/modal'

const { visible, close } = useModal();

function getPieceImage(piece: string) {
  return `/src/assets/images/green ${piece}.png`;
}
</script>
