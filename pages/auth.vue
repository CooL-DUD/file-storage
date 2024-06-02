<script setup lang="ts">
// const { db, user } = useGUN()
import video from "../assets/videos/space.MP4"
const router = useRouter()
const { $toast, $toastError } = useNuxtApp()

definePageMeta({
  layout: 'none',
})
//something
enum AuthForms {
  Login = 0,
  Register = 1
}

const formOrder = ref(AuthForms.Login)
</script>

<template>
  <div class="bg-black bg-opacity-35 text-white">
    <video id="video-background" autoplay muted Loop>
      <source :src="video" type="video/mp4">
    </video>
    <AuthLogin v-if="formOrder === AuthForms.Login" @redirect="formOrder = AuthForms.Register"/>
    <AuthRegister v-else-if="formOrder === AuthForms.Register" @redirect="formOrder = AuthForms.Login"/>
  </div>
</template>

<style scoped>
#video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>