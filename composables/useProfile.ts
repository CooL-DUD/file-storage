import {useHeaders} from "~/composables/session/useHeaders";
import {useStoreProfile} from "~/composables/store/useStoreProfile";

export async function getProfile() {
    // if (userAlias.value) {
    //   console.log('get profile', userAlias.value)
    //   db.get('profile').get(userAlias.value).once((data) => {
    //     console.log('getting profile', data)
    //     if (data) {
    //       profileInfo.value = {
    //         email: data.email,
    //         first_name: data.first_name,
    //         last_name: data.last_name
    //       }
    //     }
    //   })
    // }
    const response = await $fetch('/api/profile', {
        method: "GET",
        headers: useHeaders()
    })
    if (response.statusCode === 200) {
        useStoreProfile().value = response.data
        return response.data
    }
}