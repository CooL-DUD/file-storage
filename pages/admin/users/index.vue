<script setup lang="ts">
import {useHeaders} from "~/composables/session/useHeaders";
import {useCookieSynchronization} from "~/composables/cookie/useCookieSynchronization";

const {setCookieSynchronization, getCookieSynchronization} = useCookieSynchronization()
const sync = getCookieSynchronization()
const users = ref([])

const usersTotalPage = ref(0)
const usersPage = ref(1)

async function getUsers(page = 1) {
  usersPage.value = page
 try {
   const response = await $fetch(`/api/users?page=${usersPage.value}`, {
     method: 'GET',
     headers: useHeaders()
   });

   if (response.statusCode === 200) {
     users.value = response.data
     usersTotalPage.value = response.pagination.totalPages
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
onMounted(() => {

  runIntervals()
})

function getRandomCountdown() {
  // Generate a random number between 1 and 10
  return Math.floor(Math.random() * 4) + 4;
}

function startRandomCountdown() {
  sync.value.secondsR = 3
  sync.value.seconds1 = getRandomCountdown()
  sync.value.seconds2 = getRandomCountdown()
  sync.value.seconds3 = getRandomCountdown()

  runIntervals()
}

function runIntervals() {
  if (sync.value.secondsR > 0) {
    const intervalR = setInterval(() => {
      sync.value.secondsR--;
      if (sync.value.secondsR <= 0) {
        clearInterval(intervalR);
      }
    }, 1000);
  }
  if (sync.value.seconds1 > 0) {
    const interval1 = setInterval(() => {
      sync.value.seconds1--;
      if (sync.value.seconds1 <= 0) {
        clearInterval(interval1);
      }
    }, 1000);
  }
  if (sync.value.seconds2 > 0) {
    const interval2 = setInterval(() => {
      sync.value.seconds2--;
      if (sync.value.seconds2 <= 0) {
        clearInterval(interval2);
      }
    }, 1000);
  }
  if (sync.value.seconds3 > 0) {
    const interval3 = setInterval(() => {
      sync.value.seconds3--;
      if (sync.value.seconds3 <= 0) {
        clearInterval(interval3);
      }
    }, 1000);
  }

}
</script>

<template>
  <div class="container relative py-10">
    <div class="grid grid-cols-4 gap-4 mb-4">
      <div @click="startRandomCountdown" class="p-4 rounded-xl shadow primary-bg text-white">
        <div class="flex gap-3 justify-between">
          <p>Relay server</p>

          <Icon name="ion:checkmark-outline" size="24" v-if="!sync.secondsR"/>
        </div>
        <div v-if="sync.secondsR" class="loading-bar-container mt-3">
          <div class="loading-bar"></div>
        </div>
        <div v-else class="h-4"></div>
      </div>
      <div class="p-4 rounded-xl shadow primary-bg text-white">
        <div class="flex gap-3 justify-between">
          <p>Node Manhattan</p>

          <Icon name="ion:checkmark-outline" size="24" v-if="!sync.seconds1"/>
        </div>
        <div v-if="sync.seconds1" class="loading-bar-container mt-3">
          <div class="loading-bar"></div>
        </div>
        <div v-else class="h-4"></div>
      </div>
      <div class="p-4 rounded-xl shadow primary-bg text-white">
        <div class="flex gap-3 justify-between">
          <p>Node Wallie</p>

          <Icon name="ion:checkmark-outline" size="24" v-if="!sync.seconds2"/>
        </div>
        <div v-if="sync.seconds2" class="loading-bar-container mt-3">
          <div class="loading-bar"></div>
        </div>
        <div v-else class="h-4"></div>
      </div>
      <div class="p-4 rounded-xl shadow primary-bg text-white">
        <div class="flex gap-3 justify-between">
          <p>Node Plankton</p>

          <Icon name="ion:checkmark-outline" size="24" v-if="!sync.seconds3"/>
        </div>
        <div v-if="sync.seconds3" class="loading-bar-container mt-3">
          <div class="loading-bar"></div>
        </div>
        <div v-else class="h-4"></div>
      </div>
    </div>
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
        <td>{{usersPage > 1 ? (usersPage - 1) * 10 + index + 1 : index + 1}}</td>
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
    <UIPagination
        :total-pages="usersTotalPage"
        :current-page="usersPage"
        @new-page="getUsers"
        class="mt-4"
    />
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

.loading-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  height: 5px;
  max-width: 600px;
  position: relative;
}

.loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 40%;
  background-color: #76c7c0;
  border-radius: 10px;
  animation: loading 2s linear infinite;
}

@keyframes loading {
  0% {
    left: -80%;
  }
  100% {
    left: 100%;
  }
}
</style>