<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


type GamesHistory = {
  name: string;
  date: Date;
  playersAndColor: string;
  winner: string;
};

const history: GamesHistory[] = [
  { name: "Game 1", date: new Date("2024-12-27"), playersAndColor: "Nico Black & Tom White", winner: "Tom"},
  { name: "Game 2", date: new Date("2024-12-27"), playersAndColor: "Tom Black & Nico White", winner: "Nico"},
  { name: "Game 3", date: new Date("2024-12-27"), playersAndColor: "Tom Black & Nico White", winner: "Black"},
];

</script>

<template>
  <Navbar></Navbar>

  <DataTable :value="history" tableStyle="min-width: 50rem">
    <Column field="name" header="name"></Column>
    <Column field="date" header="date"></Column>
    <Column field="playersAndColor" header="playersAndColor"></Column>
    <Column field="winner" header="winner"></Column>
  </DataTable>
</template>

<style scoped>

</style>
