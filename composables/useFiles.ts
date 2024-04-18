import {useStoreAlias} from "~/composables/store/useStoreAlias";

export async function uploadFile(file) {
    console.log(file)
    const { db } = useGUN()
    const userAlias = useStoreAlias()
    const data = {
        file_base64: await convertFileToBase64(file),
        file_name: file.name,
        size: file.size,
        type: file.type,
    }

    const index = new Date().toISOString();
    db.get('files').get(userAlias.value).get(index).put(data, (ack) => {
        console.log('put files', ack)
    })
}

export function uploadFiles(files) {
    console.log(files)
    return Promise.all(files.map((file) => uploadFile(file.file)))
}