import type {LoginParams} from "~/types/Auth";

export function useLogin(data: LoginParams) {
    const { $toast, $toastError } = useNuxtApp()
    const router = useRouter()
    const { user } = useGUN()
    user.auth(data.username, data.password, (ack) => {
        if (ack.err) {
            $toastError(ack.err)
        } else {
            $toast('User logged in successfully! Redirecting to profile page...')
            setTimeout(() => {
                router.push('/profile')
            }, 3000)
        }
    })
}