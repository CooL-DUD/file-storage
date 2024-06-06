export function useCookieSynchronization() {
    const sync = useCookie('sync')
    sync.value = {
        secondsR: sync.value?.secondsR > 0 ? sync.value?.secondsR : 0,
        seconds1: sync.value?.seconds1 > 0 ? sync.value?.seconds1 : 0,
        seconds2: sync.value?.seconds2 > 0 ? sync.value?.seconds2 : 0,
        seconds3: sync.value?.seconds3 > 0 ? sync.value?.seconds3 : 0,
    }

    function setCookieSynchronization(newValue: string) {
        sync.value = newValue
    }
    function getCookieSynchronization() {
        return sync
    }

    return { getCookieSynchronization, setCookieSynchronization }
}