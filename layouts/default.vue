<script setup lang="ts">
import {getProfile} from "~/composables/useProfile";

getProfile()
</script>

<template>
  <div>
    <Header/>
    <main class="pt-[82px]">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>

</style>