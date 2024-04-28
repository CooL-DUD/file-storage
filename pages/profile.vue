<script setup lang="ts">
import {useStoreAlias} from "~/composables/store/useStoreAlias";
import {useStoreIsAuth} from "../composables/store/useStoreIsAuth";
import {useIsAuth} from "~/composables/session/useIsAuth";
import {useHeaders} from "~/composables/session/useHeaders";
import {dataURLtoBlob} from "~/utils/dataUrlToBlob";
import {getProfile} from "~/composables/useProfile";
import {useStoreProfile} from "~/composables/store/useStoreProfile";
definePageMeta({
  middleware: "auth",
})
const { db, user } = useGUN()

const profileInfo = useStoreProfile()
const userAlias = useStoreAlias()

const inputFile = ref(null)

getProfile()

function handleLogout() {
  useIsAuth().setIsAuth(false);
  useRouter().push('/auth')
}

function handleChangeAvatar() {
  inputFile.value.click()
}

function handleFileInputChange(event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const fileData = event.target.result; // File data (Base64 string or ArrayBuffer)
      // Send the file data to the backend using fetch or XMLHttpRequest
      setProfileAvatar(fileData);
    };
    // Read the file as data URL (Base64 string)
    reader.readAsDataURL(file);
  }
}

async function setProfileAvatar(fileData) {
  try {
    const response = await $fetch('/api/profile/avatar', {
      method: 'POST',
      headers: useHeaders(),
      body: {
        avatar: fileData
      }
    })

    if (response.statusCode === 200) {
      profileInfo.value.avatar = URL.createObjectURL(dataURLtoBlob(fileData))
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div>
    <div class="relative h-[200px]">
      <div class="absolute inset-0 bg-profile bg-gray-300"></div>
      <div
          class="absolute bottom-0 left-1/2
                 translate-x-[-50%] translate-y-[30%]
                 w-[200px] h-[200px] rounded-full
                 border-2 border-white bg-gray-400
                 flex items-center justify-center
                 text-gray-100
">
<!--        <img src="https://api.dicebear.com/8.x/bottts-neutral/svg?randomizeIds=false&size=200&radius=50" alt="">-->
        <div v-if="profileInfo?.avatar" class="rounded-full overflow-hidden w-full h-full">
          <img :src="profileInfo.avatar" alt="avatar">
        </div>
        <Icon v-else name="iconamoon:profile-fill" size="180"/>

        <button @click="handleChangeAvatar" class="absolute right-4 bottom-0 rounded-full flex items-center justify-center p-2 bg-blue-700 text-white">
          <Icon name="mdi:edit-outline" size="24"/>
        </button>
      </div>
    </div>

    <div v-if="profileInfo" class="container py-20 pt-[100px] flex flex-col gap-8 text-xl">
      <UIInput v-model="profileInfo.first_name" :label="'Ваше имя'"/>
      <UIInput v-model="profileInfo.last_name" :label="'Ваша фамилия'"/>
      <UIInput v-model="profileInfo.email" :label="'Ваша почта'"/>

      <UIBtn @click="handleLogout">Выйти из системы</UIBtn>
    </div>

    <input
        ref="inputFile"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleFileInputChange"
    >
  </div>
</template>

<style scoped>
.bg-profile {
  background-size: cover;
  filter: blur(3px);
}
</style>