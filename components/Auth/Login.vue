<script setup lang="ts">
import type {LoginParams} from "~/types/Auth";

const emit = defineEmits(['redirect'])

const userData = ref<LoginParams>({
  username: '',
  password: ''
})

function goToRegister(): void {
  emit('redirect')
}
</script>

<template>
  <div class="container h-[100vh] flex flex-col gap-10 items-center justify-center">
    <h3 class="">Вход</h3>
    <form
        @submit.prevent="useLogin(userData)"
        class="auth-form"
    >
      <UIInput v-model="userData.username" :label="'Почта'"/>
      <UIInput v-model="userData.password" :label="'Пароль'" :type="'password'"/>

      <p @click="goToRegister" class="auth-redirect">Ещё нет аккаунта? Зарегистрируйтесь</p>
      <UIBtn class="auth-btn">Войти</UIBtn>
    </form>
  </div>
</template>

<style scoped>

</style>