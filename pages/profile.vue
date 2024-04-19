<script setup lang="ts">
import {useStoreAlias} from "~/composables/store/useStoreAlias";
import {useStoreIsAuth} from "../composables/store/useStoreIsAuth";
definePageMeta({
  middleware: "auth",
})
const { db, user } = useGUN()

const profileInfo = ref(null)
const userAlias = useStoreAlias()

getProfile()

function getProfile() {
  if (userAlias.value) {
    db.get('profile').get(userAlias.value).once((data) => {
      if (data) {
        profileInfo.value = {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name
        }
      }
    })
  }
}
</script>

<template>
  <div>
    <div class="relative h-[200px]">
      <div class="absolute inset-0 bg-profile"></div>
      <div class="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[30%] w-[200px] h-[200px] rounded-full border-2 border-white bg-gray-200">
        <img src="https://api.dicebear.com/8.x/bottts-neutral/svg?randomizeIds=false&size=200&radius=50" alt="">
      </div>
    </div>

    <div v-if="profileInfo" class="container py-20 pt-[100px] flex flex-col gap-8 text-xl">
      <UIInput v-model="profileInfo.first_name" :label="'Ваше имя'"/>
      <UIInput v-model="profileInfo.last_name" :label="'Ваша фамилия'"/>
      <UIInput v-model="profileInfo.email" :label="'Ваша почта'"/>
    </div>
  </div>
</template>

<style scoped>
.bg-profile {
  background: url("https://random.imagecdn.app/1400/150");
  background-size: cover;
  filter: blur(3px);
}
</style>