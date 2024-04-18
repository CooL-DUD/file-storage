<script setup lang="ts">

</script>

<template>
<header class="flex gap-4 items-center fixed top-0 left-0 right-0 w-full z-50 p-4 bg-blue-700 text-white">
  <div class="container flex justify-between items-center gap-6">
    <nuxt-link to="/">
      <IconLogo class="h-[50px] w-[160px]"/>
    </nuxt-link>
<!--    <div>search</div>-->
    <nuxt-link to="/profile" class="flex items-center justify-center h-[50px] w-[50px]">
      <img src="https://api.dicebear.com/8.x/bottts-neutral/svg?randomizeIds=false&size=80&radius=50" alt="">
    </nuxt-link>
  </div>
</header>
</template>

<style scoped>

</style>