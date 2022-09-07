export const getDate = (date: string): string => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${day}.${month}.${year}`;
};
