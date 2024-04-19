import {useStoreIsAuth} from "~/composables/store/useStoreIsAuth";
import {useIsAuth} from "~/composables/session/useIsAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const isAuth = useStoreIsAuth()

    if (!isAuth.value) {
        useRouter().push('/auth')
    }
})