export const getDayName = (date: string) => {
    const day = new Date(date).getDay();
    const days = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ];
    return days[day];
};
