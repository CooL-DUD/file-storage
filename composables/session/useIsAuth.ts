export function useIsAuth() {
    const isAuth = useCookie('isAuth')
    function setIsAuth(_isAuth: boolean) {
        isAuth.value = _isAuth
    }
    function getIsAuth() {
        return isAuth.value
    }
    return { getIsAuth, setIsAuth }
}