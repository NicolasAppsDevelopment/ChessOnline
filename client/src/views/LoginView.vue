<template>

  <div class="container-card login-form" style="margin-left: 50%; margin-right: 50%;">
    <h1>Login</h1>
    <p v-if="lastError">{{ lastError }}</p>
    <p>Username</p>
    <InputText v-model="user.username"></InputText>
    <p>Password</p>
    <Password v-model="user.password" :feedback="false"></Password>
    <Button :label="processing ? 'Processing...' : 'Login'" @click="getToken()" :disabled="processing"></Button>
    <p> If you don't have an account yet, you can
      <router-link to="/register"> Register </router-link>
    </p>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InputText, Password, Button } from 'primevue';
import { useUserService } from '@/composables/user/userService';
import type { User } from '@/models/User';
import router from "@/router";
import {AxiosError} from "axios";

const { login } = useUserService();
const user = ref<User>({ username: "", password: "" });

let lastError = ref("");
let processing = ref(false);

async function getToken() {
  try {
    processing.value = true;
    await login(user.value);
    router.push({ path: '/' });
  } catch (error) {
    if (error instanceof AxiosError) {
      lastError.value = error.response?.data.message ?? error.message;
    } else {
      lastError.value = "Unknown error";
    }
  } finally {
    processing.value = false;
  }
}
</script>

