<script setup lang="ts">
enum FormStages {
  userData = 1,
  userPassword = 2
}
const formStage = ref(FormStages.userData)

const emit = defineEmits(['redirect'])

function goToLogin(): void {
  emit('redirect')
}
</script>

<template>
<div class="container h-[100vh] flex flex-col gap-10 items-center justify-center">
  <h3 class="">Регистрация</h3>
  <div v-if="formStage === FormStages.userData" @submit.prevent class="auth-form">
    <div class="grid grid-cols-2 gap-3">
      <UIInput :label="'Ваше имя'"/>
      <UIInput :label="'Ваша фамилия'"/>
    </div>
    <UIInput :label="'Ваша почта'"/>

    <p @click="goToLogin" class="auth-redirect">Уже есть аккаунт? Войдите</p>
    <UIBtn @click="formStage = FormStages.userPassword" class="auth-btn">Далее</UIBtn>
  </div>
  <form v-else-if="formStage === FormStages.userPassword" @submit.prevent class="auth-form">

    <UIInput :label="'Придумайте пароль'"/>
    <UIInput :label="'Повторите пароль'"/>
    <UIBtn class="auth-btn">Зарегистрироваться</UIBtn>
  </form>
</div>
</template>

<style scoped>

</style>