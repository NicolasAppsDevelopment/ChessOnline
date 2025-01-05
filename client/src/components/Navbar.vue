<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item, props }">
        <RouterLink v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <RouterLink :to="'/user/' + user.id" v-slot="{ href, navigate }" custom>
            <a :href="href" @click="navigate">
              {{ user.username }}
            </a>
          </RouterLink>
          <a @click="storedUserService.clear()" class="cursor-pointer">
            <span class="fa-solid fa-power-off" />
          </a>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { Menubar } from "primevue";
import { ref } from "vue";
import {useStoredUserService} from "@/composables/user/storedUserService";

const storedUserService = useStoredUserService();
const user = storedUserService.storedUser.value;

const items = ref([
  {
    label: 'Home',
    icon: 'fa-solid fa-home',
    route: '/'
  },
  {
    label: 'Leaderboard',
    icon: 'fa-solid fa-trophy',
    route: '/leaderboard'
  },
  {
    label: 'History',
    icon: 'fa-solid fa-book-open',
    route: '/history/' + user.id
  }
]);
</script>
