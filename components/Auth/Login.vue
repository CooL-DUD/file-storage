<script setup lang="ts">

const emit = defineEmits(['redirect'])

function goToRegister(): void {
  emit('redirect')
}
</script>

<template>
  <div class="container h-[100vh] flex flex-col gap-10 items-center justify-center">
    <h3 class="">Вход</h3>
    <form
        @submit.prevent
        class="auth-form"
    >
      <UIInput :label="'Почта'"/>
      <UIInput :label="'Пароль'"/>

      <p @click="goToRegister" class="auth-redirect">Ещё нет аккаунта? Зарегистрируйтесь</p>
      <UIBtn class="auth-btn">Войти</UIBtn>
    </form>
  </div>
</template>

<style scoped>

</style>