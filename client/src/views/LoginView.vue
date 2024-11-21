<template>
  <InputText v-model="user.username"></InputText>
  <Password v-model="user.password" :feedback="false"></Password>
  <Button :label="label" @click="getToken()"></Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InputText, Password } from 'primevue';
import { Button } from 'primevue';
import { useUserService } from '@/composables/user/userService';
import { useUserLoginService } from '@/composables/user/userLoginService';
import type { User } from '@/models/User';

const { authenticate } = useUserService();
const { userLogin } = useUserLoginService();

const user = ref<User>({ username: "", password: "" });
const label = "Connect";

async function getToken() {
  userLogin.value = await authenticate(user.value);
}
</script>
