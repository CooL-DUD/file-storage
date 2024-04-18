<script setup>
import {useStoreAlias} from "~/composables/store/useStoreAlias.ts";

const { db, user } = useGUN()

const userAlias = useStoreAlias()
const uploadFileElement = ref(null)
const downloadUrl = ref({
  url: '',
  file_name: ''
})
const files = ref([])

const userData = ref({
  username: '',
  password: ''
})

const showUploadFiles = ref(false)
onMounted(() => {
  getFiles()
})

function handleCloseModal() {
  showUploadFiles.value = false
  getFiles()
}

function getFiles() {
  console.log('get files')
  db.get('files').get(userAlias.value).map().once((data, key) => {
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
      Add files
    </UIBtn>
    <FilesUploaderModal v-if="showUploadFiles" @close="handleCloseModal"/>

    <div class="p-3">
      <table class="files-table">
        <thead>
        <tr>
          <th>File name</th>
          <th>Uploaded date</th>
          <th>File size</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="file in files" :key="file.date" class="text-sm">
          <td class="text-base font-medium">{{ file.file_name }}</td>
          <td>{{ formatDate(file.date) }}</td>
          <td>{{ formatBytes(file.size) }}</td>
          <td>
            <a :href="file.url"
               :download="file.file_name"
               class="text-green-700"
            >
              <Icon name="lucide:download" size="24"/>
            </a>
          </td>
        </tr>
        </tbody>
        <tr v-for="file in files" :key="file.date">
          <a
              v-if="file.url"
              :href="file.url"
              :download="file.file_name"
              class="flex items-center gap-3 text-sm"
          >

          </a>
        </tr>
      </table>
    </div>

<!--    <form @submit.prevent="deleteUser">-->
<!--      <input type="text" v-model="userData.username">-->
<!--      <input type="password" v-model="userData.password">-->
<!--      <button>confirm</button>-->
<!--    </form>-->
  </div>
</template>

<style lang="scss" scoped>
</style>