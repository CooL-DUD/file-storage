<script setup lang="ts">
enum FormStages {
  userData = 1,
  userPassword = 2
}
const formStage = ref(FormStages.userData)
</script>

<template>
<div class="container h-[100vh] flex items-center justify-center">
  <div v-if="formStage === FormStages.userData" @submit.prevent class="auth-form">
    <div class="grid grid-cols-2 gap-3">
      <UIInput :label="'Ваше имя'"/>
      <UIInput :label="'Ваша фамилия'"/>
    </div>
    <UIInput :label="'Ваша почта'"/>
    <UIBtn class="auth-btn">Далее</UIBtn>
  </div>
  <form v-else-if="formStage === FormStages.userPassword" @submit.prevent class="auth-form">
    <UIInput :label="'Придумайте пароль'"/>
    <UIInput :label="'Повторите пароль'"/>
  </form>
</div>
</template>

<style scoped>

</style>