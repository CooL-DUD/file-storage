<script setup>
import {useStoreAlias} from "~/composables/store/useStoreAlias.ts";
definePageMeta({
  middleware: "auth",
})
const { db, user } = useGUN()
const { $toast, $toastError } = useNuxtApp()

const userAlias = useStoreAlias()
const files = ref([])

const showUploadFiles = ref(false)

getFiles()

function handleCloseModal() {
  showUploadFiles.value = false
  getFiles()
}

function getFiles() {
  files.value = []
  console.log('getfiles', userAlias.value)
  db.get('files').get(userAlias.value).map().once((data, key) => {
    console.log('getfiles2', data)
    if (data) {
      const blob = base64toBlob(data.file_base64)
      let file = {
        file_base64: data.file_base64,
        file_name: data.file_name,
        size: data.size,
        type: data.type,
        url: URL.createObjectURL(blob),
        date: key
      }
      if (Object.keys(file).length)
        files.value.push(file);
    }
  })
  console.log(files.value)
}

function deleteFile(file) {
  db.get('files').get(userAlias.value).get(file.date).put(null, (ack) => {
    if (ack.ok) {
      $toast('Файл успешно удален')
      getFiles()
    }
  })
}

// function deleteUser() {
//   user.delete(userData.value.username, userData.value.password, (ack) => {
//     console.log(ack)
//   })
// }
</script>

<template>
  <div class="container relative py-10">


    <UIBtn @click="showUploadFiles = true" class="flex gap-2 items-center">
      <Icon name="mingcute:add-line" size="24"/>
      Добавить файлы
    </UIBtn>
    <FilesUploaderModal v-if="showUploadFiles" @close="handleCloseModal"/>

    <div class="p-3">
      <table v-if="files.length" class="files-table">
        <thead>
        <tr>
          <th>Название</th>
          <th>Дата загрузки</th>
          <th>Размер</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="file in files" :key="file.date" class="text-sm">
          <td class="text-base font-medium">{{ file.file_name }}</td>
          <td>{{ formatDate(file.date) }}</td>
          <td>{{ formatBytes(file.size) }}</td>
          <td>
            <div class="grid grid-cols-2 gap-3 justify-between">
              <a :href="file.url"
                 :download="file.file_name"
                 class="text-green-700 block"
              >
                <Icon name="lucide:download" size="24"/>
              </a>

              <button @click="deleteFile(file)" class="text-red-700 block">
                <Icon name="mi:delete" size="24"/>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-center text-3xl text-center" v-else>
        Нет файлов.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>