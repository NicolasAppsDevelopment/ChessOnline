<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <RouterLink to="/logout" custom>
            <a v-ripple @click="storedUserService.clear()">
              <span class="fa-solid fa-power-off" />
            </a>
          </RouterLink>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import {Menubar} from "primevue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import {useStoredUserService} from "@/composables/user/storedUserService";

const storedUserService = useStoredUserService();
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
  }
]);
</script>
