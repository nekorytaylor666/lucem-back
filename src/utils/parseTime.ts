const weekTime = 3600000 * 24 * 7;
const startTime = 345600000;

export const parseTime = (_date: Date): Date => {
    return new Date(((_date.getTime() - startTime) % weekTime) + startTime);
};
