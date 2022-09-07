export const getTime = (date: string): string => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return formatDigits(hours) + ":" + formatDigits(minutes);
};
const formatDigits = (number: number): string => {
    return number < 10 ? "0" + number : number.toString();
};
