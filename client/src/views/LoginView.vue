<template>

  <div class="container-card login-form">
    <h1>Login</h1>
    <Message v-if="lastError" severity="error" icon="fa-solid fa-circle-exclamation" class="mb-2">{{ lastError }}</Message>
    <InputGroup class="mb-2">
      <InputGroupAddon>
        <i class="fa-solid fa-user"></i>
      </InputGroupAddon>
      <InputText v-model="user.username" placeholder="Username"></InputText>
    </InputGroup>
    <InputGroup class="mb-2">
      <InputGroupAddon>
        <i class="fa-solid fa-key"></i>
      </InputGroupAddon>
      <Password v-model="user.password" :feedback="false" placeholder="Password" toggleMask></Password>
    </InputGroup>
    <Button label="Login" icon="fa-solid fa-arrow-right" icon-pos="right" @click="getToken()" :disabled="processing"></Button>
    <p> If you don't have an account yet, you can
      <router-link to="/register"> Register <i class="fa-solid fa-arrow-right"></i></router-link>
    </p>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, InputGroup, InputGroupAddon, InputText, Message, Password } from 'primevue'
import { useUserService } from '@/composables/user/userService'
import type { User } from '@/models/User'
import router from '@/router'
import { AxiosError } from 'axios'

const { login } = useUserService();
const user = ref<User>({ username: "", password: "", id: -1 });

const lastError = ref("");
const processing = ref(false);

async function getToken() {
  try {
    lastError.value = "";
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
