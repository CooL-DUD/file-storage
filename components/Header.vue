<script setup lang="ts">
import {useStoreProfile} from "~/composables/store/useStoreProfile";

const profile = useStoreProfile()
</script>

<template>
<header class="flex gap-4 items-center fixed top-0 left-0 right-0 w-full z-50 p-4 bg-blue-700 text-white">
  <div class="container flex justify-between items-center gap-6">
    <nuxt-link to="/">
      <IconLogo class="h-[50px] w-[160px]"/>
    </nuxt-link>
<!--    <div>search</div>-->
    <nuxt-link to="/profile" class="flex items-center justify-center h-[50px] w-[50px] overflow-hidden rounded-full bg-gray-400">
      <div v-if="profile?.avatar" class="rounded-full overflow-hidden w-full h-full">
        <img :src="profile.avatar" alt="avatar">
      </div>
      <Icon v-else name="iconamoon:profile-fill" size="40"/>

    </nuxt-link>
  </div>
</header>
</template>

<style scoped>

</style>