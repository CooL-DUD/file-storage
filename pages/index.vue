<script setup>
const { db, user } = useGUN()

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
getFiles()

async function uploadFile() {
  const data = {
    file_base64: await convertFileToBase64(uploadFileElement.value.files[0]),
    file_name: uploadFileElement.value.files[0].name,
    size: uploadFileElement.value.files[0].size,
    type: uploadFileElement.value.files[0].type,
  }

  const index = new Date().toISOString();
  db.get('files').get('alias').get(index).put(data, (ack) => {
    console.log('put file', ack)
  })
}


function getFiles() {
  console.log('get files')
  db.get('files').get('alias').map().on((data, key) => {
    console.log(key)
    const blob = base64toBlob(data.file_base64)
    let file = {
      file_base64: data.file_base64,
      file_name: data.file_name,
      size: data.size,
      type: data.type,
      url: URL.createObjectURL(blob),
      date: key
    }
    console.log(Object.keys(file).length)
    if (Object.keys(file).length)
      files.value.push(file);
  })
  // db.get('alias').get('files', (ack) => {
  //   const blob = base64toBlob(ack.put.file_base64)
  //   downloadUrl.value = {
  //     url: URL.createObjectURL(blob),
  //     file_name: ack.put.file_name,
  //   }
  // })
}

function deleteUser() {
  user.delete(userData.value.username, userData.value.password, (ack) => {
    console.log(ack)
  })
  // const users = db.get('users')
  //
  // users.get(userData.value.username).put(null, (ack) => {
  //   console.log('delete user', ack)
  // })
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="uploadFile">
      <input type="file" ref="uploadFileElement"/>
      <button>upload</button>
    </form>

    <a v-if="downloadUrl.url" :href="downloadUrl.url" :download="downloadUrl.file_name">download</a>

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
            >download</a>
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

    <form @submit.prevent="deleteUser">
      <input type="text" v-model="userData.username">
      <input type="password" v-model="userData.password">
      <button>confirm</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>