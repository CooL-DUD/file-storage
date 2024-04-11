<script setup lang="ts">
const props = defineProps<{
  label?: string,
  id?: string,
  type?: string,
  placeholder?: string,
}>()

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-3">
    <label
        v-if="label"
        :for="id"
        class="text-base font-medium"
    >
      {{ label }}
    </label>

    <input
        v-model="model"
        :id="id"
        :type="type ? type : 'text'"
        :placeholder="placeholder"
        class="px-4 py-3 rounded-xl border border-gray-300"
    />
  </div>
</template>

<style scoped>

</style>