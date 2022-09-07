export const getDayName = (date: string) => {
    const day = new Date(date).getDay();
    const days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    return days[day];
};
