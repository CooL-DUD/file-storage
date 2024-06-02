<script setup lang="ts">
import {useStoreProfile} from "~/composables/store/useStoreProfile";
import ThemeToggle from "~/components/UI/ThemeToggle.vue";

const profile = useStoreProfile()
</script>

<template>
<header class="flex gap-4 items-center fixed top-0 left-0 right-0 w-full z-50 p-4 primary-bg text-white">
  <div class="container flex justify-between items-center gap-6">
    <div class="flex items-center gap-4">
      <nuxt-link to="/">
        <IconLogo class="h-[50px] w-[160px]"/>
      </nuxt-link>

      <nuxt-link v-if="profile?.role === 'admin'" to="/admin/users" class="font-medium">
        Админ панель
      </nuxt-link>

      <nuxt-link to="/contact-us">
        Контакты
      </nuxt-link>
    </div>
<!--    <div>search</div>-->
    <div class="flex items-center gap-4 h-[50px]">
      <ThemeToggle class="text-[10px]"/>
      <nuxt-link to="/profile" class="flex items-center justify-center h-[50px] w-[50px] overflow-hidden rounded-full bg-gray-400">
        <div v-if="profile?.avatar" class="rounded-full overflow-hidden w-full h-full">
          <img :src="profile.avatar" alt="avatar">
        </div>
        <Icon v-else name="iconamoon:profile-fill" size="40"/>

      </nuxt-link>
    </div>
  </div>
</header>
</template>

<style scoped>

</style>