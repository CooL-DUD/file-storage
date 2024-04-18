<script setup lang="ts">
const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 top-[82px] z-10 bg-gray-200 flex items-center justify-center p-4">
    <div class="container absolute top-[24px] m-auto">
      <button @click="handleClose" class="p-3 rounded-full bg-gray-100 text-red-600">
        <Icon name="majesticons:close" size="24"/>
      </button>
    </div>
    <FilesFileUploader class="w-full max-w-[800px]"/>
  </div>
</template>

<style scoped>

</style>