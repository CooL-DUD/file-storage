export function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Define arrays for month names and suffixes for days
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daySuffixes = ['st', 'nd', 'rd', 'th'];

    // Extract day, month, and year
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Get the suffix for the day
    let daySuffix;
    if (day >= 11 && day <= 13) {
        daySuffix = 'th';
    } else {
        daySuffix = daySuffixes[(day - 1) % 10] || 'th';
    }

    // Format the date string
    const formattedDate = `${day}${daySuffix} ${months[month]} ${year}`;

    return formattedDate;
}