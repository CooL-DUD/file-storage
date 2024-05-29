import {useStoreAlias} from "~/composables/store/useStoreAlias";
import {useHeaders} from "~/composables/session/useHeaders";

export async function uploadFile(file) {
    const { $toast, $toastError } = useNuxtApp()
    console.log(file)
    // const { db } = useGUN()
    const userAlias = useStoreAlias()

    const date = new Date().toISOString();
    const data = {
        file_base64: await convertFileToBase64(file),
        file_name: file.name,
        size: file.size,
        type: file.type,
        uploaded_date: date
    }
    // new Promise((resolve, reject) => {
    //     db.get('files').get(userAlias.value).get(index).put(data, (ack) => {
    //         console.log('put files', ack)
    //         if (ack.err) {
    //             $toastError(ack.err)
    //             reject(false)
    //         } else {
    //             $toast('Файл загружен')
    //             resolve(true)
    //         }
    //     })
    // })

    const response = await $fetch('/api/files', {
        method: 'POST',
        body: data,
        headers: useHeaders()
    })

    if (response.statusCode === 200) {
        $toast('Файл добавлен')
    }
}

export function uploadFiles(files) {
    console.log(files)
    return Promise.all(files.map((file) => uploadFile(file.file)))
}