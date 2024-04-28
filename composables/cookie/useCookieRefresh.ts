export function useCookieRefresh() {

    const cookieRefresh = useCookie('refresh', {
        expires: getNextMonth(),
    })
    function setCookieRefresh (refresh: string) {
        cookieRefresh.value = refresh
        return cookieRefresh
    }
    function getCookieRefresh () {
        return cookieRefresh
    }

    function getNextMonth() {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth();

        currentMonth++;

        const currentYear = currentDate.getFullYear();
        let daysInNextMonth = new Date(currentYear, currentMonth, 0).getDate();

        if (currentDay > daysInNextMonth) {
            currentDay = daysInNextMonth;
        }
        const nextMonthDate = new Date(currentYear, currentMonth, currentDay);
        return nextMonthDate;
    }

    return { getCookieRefresh , setCookieRefresh }
}