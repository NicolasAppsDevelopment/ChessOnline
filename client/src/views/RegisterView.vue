<template>

  <div class="container-card login-form">
    <h1>Register</h1>
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
      <Password v-model="user.password" placeholder="Password" toggleMask></Password>
    </InputGroup>
    <Button label="Register" icon="fa-solid fa-arrow-right" icon-pos="right" @click="getToken()" :disabled="processing"></Button>
    <p>If you already have an account, you can
      <router-link to="/login"> Login <i class="fa-solid fa-arrow-right"></i></router-link>
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

const { register } = useUserService();

const user = ref<User>({ username: "", password: "", id: -1, elo: 0 });
let lastError = ref("");
let processing = ref(false);

async function getToken() {
  try {
    processing.value = true;
    lastError.value = "";
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
