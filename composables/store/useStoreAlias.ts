import {useCookieAlias} from "~/composables/cookie/useCookieAlias";

export function useStoreAlias() {
    return useState('user_alias', () => useCookieAlias().getCookieAlias())
}