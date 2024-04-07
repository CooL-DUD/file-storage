<script setup>
import GUN from 'gun';
const db = GUN();

const uploadFileElement = ref(null)

const downloadUrl = ref({
  url: '',
  file_name: ''
})
async function uploadFile() {
  const data = {
    file_base64: await convertFileToBase64(uploadFileElement.value.files[0]),
    file_name: uploadFileElement.value.files[0].name,
    size: uploadFileElement.value.files[0].size,
    type: uploadFileElement.value.files[0].type,
  }
  db.get('files').get('alias').put(data, (ack) => {
    console.log('put file', ack)
  })
}

function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; // Remove data URL prefix
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

function getFiles() {
  console.log(db.get('alias').get('files').map())
  // db.get('alias').get('files', (ack) => {
  //   const blob = base64toBlob(ack.put.file_base64)
  //   downloadUrl.value = {
  //     url: URL.createObjectURL(blob),
  //     file_name: ack.put.file_name,
  //   }
  // })
}

function base64toBlob(base64Data) {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray]);
}
</script>

<template>
  <div>
    <form @submit.prevent="uploadFile">
      <input type="file" ref="uploadFileElement"/>
      <button>upload</button>
    </form>

    <button @click="getFiles">get file</button>

    <a v-if="downloadUrl.url" :href="downloadUrl.url" :download="downloadUrl.file_name">download</a>
  </div>
</template>

<style lang="scss" scoped>

</style>