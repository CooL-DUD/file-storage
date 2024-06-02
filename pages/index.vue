<script setup>
import {useStoreAlias} from "~/composables/store/useStoreAlias.ts";
import {useHeaders} from "~/composables/session/useHeaders.ts";
definePageMeta({
  middleware: "auth",
})
// const { db, user } = useGUN()
const { $toast, $toastError } = useNuxtApp()

const userAlias = useStoreAlias()
const files = ref([])
const downloadFile = ref({})
const downloadLink = ref(null)

const showUploadFiles = ref(false)

getFiles()

function handleCloseModal() {
  showUploadFiles.value = false
  getFiles()
}

async function getFiles() {
  files.value = []
  // console.log('getfiles', userAlias.value)
  // db.get('files').get(userAlias.value).map().once((data, key) => {
  //   console.log('getfiles2', data)
  //   if (data) {
  //     const blob = base64toBlob(data.file_base64)
  //     let file = {
  //       file_base64: data.file_base64,
  //       file_name: data.file_name,
  //       size: data.size,
  //       type: data.type,
  //       url: URL.createObjectURL(blob),
  //       date: key
  //     }
  //     if (Object.keys(file).length)
  //       files.value.push(file);
  //   }
  // })
  // console.log(files.value)

  const response = await $fetch('/api/files', {
    method: 'GET',
    headers: useHeaders()
  })
  if (response.statusCode === 200) {
    files.value = response.data
  }
}

async function handleDownloadFile(file_id) {
  const response = await $fetch(`/api/files/${file_id}`, {
    method: 'GET',
    headers: useHeaders()
  })
  if (response.statusCode === 200) {
    downloadFile.value = {
      url: URL.createObjectURL(base64toBlob(response.data.file_base64)),
      file_name: response.data.file_name
    }
    setTimeout(() => {
      downloadLink.value.click()
    }, 1000)
  }
}

async function deleteFile(file_id) {
  // db.get('files').get(userAlias.value).get(file.date).put(null, (ack) => {
  //   if (ack.ok) {
  //     $toast('Файл успешно удален')
  //     getFiles()
  //   }
  // })
  const response = await $fetch(`/api/files/${file_id}`, {
    method: 'DELETE',
    headers: useHeaders()
  })
  if (response.statusCode === 200) {
    files.value = files.value.filter(file => file._id !== file_id)
    $toast('Файл удален')
  }

}

function copyShareLink(file_id) {

  const copyText = document.getElementById(`copy-${file_id}`);
  console.log(copyText)

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
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
          <th>Nº</th>
          <th>Название</th>
          <th>Дата загрузки</th>
          <th>Размер</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(file, index) in files" :key="file._id" class="text-sm">
          <td>{{index + 1}}</td>
          <td class="text-base font-medium">{{ file.file_name }}</td>
          <td>{{ formatDate(file.uploaded_date) }}</td>
          <td>{{ formatBytes(file.size) }}</td>
          <td>
            <div class="grid grid-cols-3 gap-3 justify-between">
<!--              <a :href="file.url"-->
<!--                 :download="file.file_name"-->
<!--                 class="text-green-700 block"-->
<!--              >-->
<!--                <Icon name="lucide:download" size="24"/>-->
<!--              </a>-->
              <button @click="handleDownloadFile(file._id)"
                 class="text-green-500 block"
              >
                <Icon name="lucide:download" size="24"/>
              </button>
              <button @click="copyShareLink(file._id)"
                 class="text-blue-500 block"
              >
                <Icon name="ph:share" size="24"/>
              </button>

              <button @click="deleteFile(file._id)" class="text-red-500 block">
                <Icon name="mi:delete" size="24"/>
              </button>
            </div>
            <input class="hidden" :id="`copy-${file._id}`" type="text" :value="`http://localhost:3000/storage/files/${file.url}`">
          </td>
        </tr>
        </tbody>
      </table>

      <div class="flex items-center justify-center text-3xl text-center" v-else>
        Нет файлов.
      </div>
    </div>

    <a ref="downloadLink" :href="downloadFile.url" :download="downloadFile.file_name" class="hidden">download</a>
  </div>
</template>

<style lang="scss" scoped>
tbody tr:hover {
  cursor: pointer;
  background-color: rgba(0, 123, 255, 0.1);
  color: #3b82f6;
}
</style>