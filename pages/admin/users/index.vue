<script setup lang="ts">
import {useHeaders} from "~/composables/session/useHeaders";

const users = ref([])

async function getUsers() {
 try {
   const response = await $fetch('/api/users', {
     method: 'GET',
     headers: useHeaders()
   });

   if (response.statusCode === 200) {
     users.value = response.data
   }
 } catch (e) {
   console.log(e)
 }
}

function getUserRole(role: string) {
  switch (role) {
    case 'user':
      return 'Пользователь'
    case 'admin':
      return 'Админ'
  }
}

getUsers()
</script>

<template>
  <div class="container relative py-10">
    <table class="files-table">
      <thead>
        <tr>
          <th>Nº</th>
          <th></th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Почта</th>
          <th>Роль</th>
        </tr>
      </thead>
      <tbody>
      <tr
          v-for="(user, index) in users"
          :key="user._id"
          @click="$router.push(`/admin/users/${user._id}`)"
      >
        <td>{{index + 1}}</td>
        <td>
          <div v-if="user.avatar" class="flex items-center justify-center h-[50px] w-[50px] rounded-full overflow-hidden mx-auto">
            <img :src="user.avatar" alt="">
          </div>
          <div v-else class="flex items-center justify-center h-[50px] w-[50px] rounded-full overflow-hidden mx-auto bg-gray-400 text-gray-100">
            <Icon name="iconamoon:profile-fill" size="40"/>
          </div>
        </td>
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ getUserRole(user.role) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.files-table td {
  text-align: center;
}

tbody tr:hover {
  cursor: pointer;
  background-color: rgba(0, 123, 255, 0.1);
  color: rgb(29 78 216);
}
</style>