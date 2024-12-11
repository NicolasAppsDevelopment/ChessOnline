<template>

  <div class="container-card login-form" style="margin-left: 50%; margin-right: 50%;">
    <h1>Register</h1>
    <p v-if="lastError">{{ lastError }}</p>
    <p>Username</p>
    <InputText v-model="user.username"></InputText>
    <p>Password</p>
    <Password v-model="user.password"></Password>
    <Button :label="processing ? 'Processing...' : 'Register'" @click="getToken()" :disabled="processing"></Button>
    <p> If you already have an account, you can
      <router-link to="/login"> Login </router-link>
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

const { register } = useUserService();

const user = ref<User>({ username: "", password: "" });
let lastError = ref("");
let processing = ref(false);

async function getToken() {
  try {
    processing.value = true;
    await register(user.value);
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
