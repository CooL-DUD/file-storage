<script setup lang="ts">
import {useHeaders} from "~/composables/session/useHeaders";
import {extractTimeFromISO} from "../../../utils/extractTimeFromISO";
definePageMeta({
  middleware: "auth",
})
// const { db, user } = useGUN()

const userData = ref(null)
const files = ref([])
const actions = ref([])
const actionTypes = {
  register: 'Зарегистрировался',
  login: 'Вошел',
  avatar: 'Добавил аватарку',
  profile_bg: 'Добавил картинку в профиль',
}

getUserData()

async function getUserData() {
  try {
    const response = await $fetch('/api/users/' + useRoute().params.user_id, {
      method: "GET",
      headers: useHeaders()
    })
    
    if (response.statusCode === 200) {
      userData.value = response.data.user_data
      files.value = response.data.user_files
      actions.value = response.data.actions
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="pb-[100px]">
    <div class="relative h-[200px]">
      <div v-if="userData?.profile_bg"
           class="absolute inset-0 bg-profile"
           :style="`background-image: url(${userData?.profile_bg})`"
      >
      </div>
      <div v-else
           class="absolute inset-0 bg-profile bg-gray-300"
      >
      </div>
      <div
          class="absolute bottom-0 left-1/2
                 translate-x-[-50%] translate-y-[30%]
                 w-[200px] h-[200px] rounded-full
                 border-2 border-white bg-gray-400
                 flex items-center justify-center
                 text-gray-100
">
        <!--        <img src="https://api.dicebear.com/8.x/bottts-neutral/svg?randomizeIds=false&size=200&radius=50" alt="">-->
        <div v-if="userData?.avatar" class="rounded-full overflow-hidden w-full h-full">
          <img :src="userData.avatar" alt="avatar">
        </div>
        <Icon v-else name="iconamoon:profile-fill" size="180"/>
      </div>
    </div>

    <div class="container flex flex-col gap-8">
      <div v-if="userData" class="pt-20 pt-[100px] flex flex-col gap-8 text-xl">
        <UIInput v-model="userData.first_name" :label="'Имя'" :readonly="true"/>
        <UIInput v-model="userData.last_name" :label="'Фамилия'" :readonly="true"/>
        <UIInput v-model="userData.email" :label="'Почта'" :readonly="true"/>
      </div>

      <template v-if="files.length">
        <h3 class="text-2xl font-semibold">Файлы</h3>
        <table class="files-table px-5">
          <thead>
          <tr>
            <th>Nº</th>
            <th>Название</th>
            <th>Дата загрузки</th>
            <th>Размер</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(file, index) in files" :key="file._id">
            <td class="text-center">{{index + 1}}</td>
            <td class="text-base font-medium">{{ file.file_name }}</td>
            <td>{{ formatDate(file.uploaded_date) }}</td>
            <td>{{ formatBytes(file.size) }}</td>
          </tr>
          </tbody>
        </table>
      </template>
      <template v-if="actions.length">
        <h3 class="text-2xl font-semibold">Действия</h3>
        <table class="files-table px-5">
          <thead>
          <tr>
            <th>Nº</th>
            <th>Действие</th>
            <th>Дата и время</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(action, index) in actions">
            <td class="text-center">{{index + 1}}</td>
            <td class="text-base font-medium">{{ actionTypes[action.name] }}</td>
            <td>{{ formatDate(action.time) }} {{ extractTimeFromISO(action.time) }}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<style scoped>
.bg-profile {
  background-size: cover;
}
.files-table tbody tr td {
  text-align: center;
}
.files-table tbody tr td:nth-child(2) {
  text-align: left;
}
</style>