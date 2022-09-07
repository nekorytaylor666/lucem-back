export const getMonthAndDay = (date: string): string => {
    const months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    return `${day} ${months[month]}`;
};
