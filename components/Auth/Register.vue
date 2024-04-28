<script setup lang="ts">
enum FormStages {
  userData = 1,
  userPassword = 2
}
const formStage = ref(FormStages.userData)

const emit = defineEmits(['redirect'])
const router = useRouter()
const { user } = useGUN()
const { $toast, $toastError } = useNuxtApp()

const userData = ref({
  email: '',
  first_name: '',
  last_name: '',
  password: ''
})
const confirm_password = ref('')

function goToLogin(): void {
  emit('redirect')
}

</script>

<template>
<div class="container h-[100vh] flex flex-col gap-10 items-center justify-center">
  <h3 class="">Регистрация</h3>
  <div v-if="formStage === FormStages.userData" @submit.prevent class="auth-form">
    <div class="grid grid-cols-2 gap-3">
      <UIInput
          :label="'Ваше имя'"
          v-model="userData.first_name"
      />
      <UIInput
          :label="'Ваша фамилия'"
          v-model="userData.last_name"
      />
    </div>
    <UIInput
        :label="'Ваша почта'"
        v-model="userData.email"
    />

    <p @click="goToLogin" class="auth-redirect">Уже есть аккаунт? Войдите</p>
    <UIBtn @click="formStage = FormStages.userPassword" class="auth-btn">Далее</UIBtn>
  </div>
  <form
      v-else-if="formStage === FormStages.userPassword"
      @submit.prevent="useRegister(userData)"
      class="auth-form"
  >

    <UIBtnBack @click="formStage = FormStages.userData"/>

    <UIInput
        :label="'Придумайте пароль'"
        :type="'password'"
        v-model="userData.password"
    />
    <UIInput
        :label="'Повторите пароль'"
        :type="'password'"
        v-model="confirm_password"
    />
    <UIBtn class="auth-btn">Зарегистрироваться</UIBtn>
  </form>
</div>
</template>

<style scoped>

</style>