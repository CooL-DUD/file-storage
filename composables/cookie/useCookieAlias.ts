export function useCookieAlias() {
    const cookieAlias = useCookie('user_alias')
    function setCookieAlias (alias: string) {
        cookieAlias.value = alias
        return cookieAlias
    }
    function getCookieAlias () {
        return cookieAlias
    }
    return { getCookieAlias , setCookieAlias }
}