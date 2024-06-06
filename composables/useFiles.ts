import {useStoreAlias} from "~/composables/store/useStoreAlias";
import {useHeaders} from "~/composables/session/useHeaders";
import {useStoreFilesLoading} from "~/composables/store/useStoreFilesLoading";
import {useCookieSynchronization} from "~/composables/cookie/useCookieSynchronization";

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
    const {setCookieSynchronization, getCookieSynchronization} = useCookieSynchronization()
    const sync = getCookieSynchronization()
    console.log(files)
    return Promise.all(files.map((file) => uploadFile(file.file))).then(() => {
        useStoreFilesLoading().value = false
        startRandomCountdown()
    })

    function getRandomCountdown() {
        // Generate a random number between 1 and 10
        return Math.floor(Math.random() * 4) + 4;
    }

    function startRandomCountdown() {
        sync.value.secondsR = 3
        sync.value.seconds1 = getRandomCountdown()
        sync.value.seconds2 = getRandomCountdown()
        sync.value.seconds3 = getRandomCountdown()

        runIntervals()
    }

    function runIntervals() {
        if (sync.value.secondsR > 0) {
            const intervalR = setInterval(() => {
                sync.value.secondsR--;
                if (sync.value.secondsR <= 0) {
                    clearInterval(intervalR);
                }
            }, 1000);
        }
        if (sync.value.seconds1 > 0) {
            const interval1 = setInterval(() => {
                sync.value.seconds1--;
                if (sync.value.seconds1 <= 0) {
                    clearInterval(interval1);
                }
            }, 1000);
        }
        if (sync.value.seconds2 > 0) {
            const interval2 = setInterval(() => {
                sync.value.seconds2--;
                if (sync.value.seconds2 <= 0) {
                    clearInterval(interval2);
                }
            }, 1000);
        }
        if (sync.value.seconds3 > 0) {
            const interval3 = setInterval(() => {
                sync.value.seconds3--;
                if (sync.value.seconds3 <= 0) {
                    clearInterval(interval3);
                }
            }, 1000);
        }

    }
}