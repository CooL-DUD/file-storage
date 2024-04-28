export function useCookieToken() {
    const cookieToken = useCookie('token', {
        maxAge: 1000 * 60 * 60,
    })
    function setCookieToken (token: string) {
        cookieToken.value = token
        return cookieToken
    }
    function getCookieToken () {
        return cookieToken
    }
    return { getCookieToken , setCookieToken }
}