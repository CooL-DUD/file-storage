import {useCookieToken} from "~/composables/cookie/useCookieToken";

export const useHeaders = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookieToken().getCookieToken().value}`,
        "Accept-Language": 'ru'
    };
}