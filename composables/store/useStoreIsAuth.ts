import {useIsAuth} from "~/composables/session/useIsAuth";

export function useStoreIsAuth() {
    return useState('isAuth', () => useIsAuth().getIsAuth())
}