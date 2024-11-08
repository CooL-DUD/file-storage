<script setup lang="ts">
import useFileList from "~/composables/files/useFileList";
import {uploadFiles} from "~/composables/useFiles";
import {useStoreFilesLoading} from "~/composables/store/useStoreFilesLoading";

// File Management
const { files, addFiles, removeFile } = useFileList()
const emit = defineEmits(['uploaded'])
const filesLoading = useStoreFilesLoading()

function onInputChange(e) {
  addFiles(e.target.files)
  e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
}

async function handleUploadFiles() {
  filesLoading.value = true
  await uploadFiles(files.value)
  emit('uploaded')
}
</script>

<template>
<div>
  <FilesDropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
    <label for="file-input">
				<span v-if="dropZoneActive">
					<span>Бросьте файлы здесь</span>
					<span class="smaller">чтобы загрузить</span>
				</span>
      <span v-else>
					<span>Перенесите файлы сюда</span>
					<span class="smaller">
						или <strong><em>нажмите</em></strong> чтобы выбрать
					</span>
				</span>

      <input type="file" id="file-input" multiple @change="onInputChange" />
    </label>
    <ul class="image-list" v-show="files.length">
      <FilesFilePreview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
    </ul>
  </FilesDropZone>
  <!--  <button class="upload-button">Upload</button>-->
  <UIBtn @click="handleUploadFiles" v-if="files.length" class="mx-auto flex items-center gap-2 mt-3">
    <Icon name="material-symbols:upload" size="24"/>
    Upload
  </UIBtn>

  <Transition>
    <div v-if="filesLoading" class="white-bg fixed inset-0 flex items-center justify-center">
      <UILoaderSections class="w-[300px]"/>
    </div>
  </Transition>
</div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.drop-area {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  border-radius: 24px;
  transition: .2s ease;
  border: 1px dashed #ccc;

  &[data-active=true] {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #ffffffcc;
  }
}

label {
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  text-align: center;

  span {
    display: block;
  }

  input[type=file]:not(:focus-visible) {
    // Visually Hidden Styles taken from Bootstrap 5
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  .smaller {
    font-size: 16px;
    font-weight: 400;
  }
}

.image-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}

.upload-button {
  display: block;
  appearance: none;
  border: 0;
  border-radius: 50px;
  padding: 0.75rem 3rem;
  margin: 1rem auto;
  font-size: 1.25rem;
  font-weight: bold;
  background: #369;
  color: #fff;
  text-transform: uppercase;
}
</style>