import type {LoginParams, RegisterParams} from "~/types/Auth";
import {useCookieAlias} from "~/composables/cookie/useCookieAlias";

export function useLogin(data: LoginParams, profile = null) {
    const { $toast, $toastError } = useNuxtApp()
    const router = useRouter()
    const { user } = useGUN()
    user.auth(data.username, data.password, (ack) => {
        console.log(ack)
        if (ack.err) {
            $toastError(ack.err)
        } else {
            useCookieAlias().setCookieAlias(data.username)
            $toast('User logged in successfully! Redirecting to profile page...')
            setTimeout(() => {
                router.push('/profile')
            }, 3000)
        }
    })
}

export function useRegister(data: RegisterParams) {
    const { $toast, $toastError } = useNuxtApp()
    const router = useRouter()
    const { user, db } = useGUN()

    user.create(data.username, data.password, (ack) => {
        console.log(ack)
        if (ack.err) {
            $toastError(ack.err)
        } else {
            useCookieAlias().setCookieAlias(data.username)

            db.get('profile').get(data.username).put({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.username
            }, (ack) => {
                console.log('put', ack)
                if (ack.err) {
                    $toastError(ack.err)
                } else {
                    $toast('User created successfully! Redirecting to profile page...')
                    setTimeout(() => {
                        router.push('/profile')
                    }, 3000)
                }
            })
        }
    })
}