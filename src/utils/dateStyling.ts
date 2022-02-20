export function dateStyling(args: { date: Date; locale: string }) {
    const { date, locale } = args;
    const weekDay = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(
        date,
    );
    const monthYearDay = new Intl.DateTimeFormat(locale).format(date);
    const time = date.toLocaleTimeString(locale).slice(0, -3);
    return `${time} ${monthYearDay} ${weekDay}`;
}
