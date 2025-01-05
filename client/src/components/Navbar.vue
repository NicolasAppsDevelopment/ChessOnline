<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <a :href="'/user/' + user.id">
            {{ user.username }}
          </a>
          <a @click="storedUserService.clear()" class="cursor-pointer">
            <span class="fa-solid fa-power-off" />
          </a>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import {Menubar} from "primevue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import {useStoredUserService} from "@/composables/user/storedUserService";

const storedUserService = useStoredUserService();
const user = storedUserService.storedUser.value;

const router = useRouter();
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
