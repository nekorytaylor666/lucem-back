//accepts work times in format: "09:00" - "18:00"

import { setDay, setHours, setMinutes } from "date-fns";

//parse time string to minute and hours number
export const parseTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return {
        hours: parseInt(hours, 10),
        minutes: parseInt(minutes, 10),
    };
};

interface WorkTime {
    startTime: string;
    endTime: string;
}

export const createWorkTimesFromStartEndTimes = (
    startTimeString: string,
    endTimeString: string,
): WorkTime[] => {
    const startTime = parseTime(startTimeString);
    const endTime = parseTime(endTimeString);
    const workTimes = [];
    const lastWorkDayIndex = 6;
    const defaultYear = 2020;
    for (
        //start from monday
        let weekDayIndex = 1;
        weekDayIndex < lastWorkDayIndex;
        weekDayIndex++
    ) {
        //we are setting hours and minutes in Date UTC constructor to avoid timezone issues. Set day of date fns is for weekday since we are setting day of week
        const workDay = {
            startTime: setDay(
                new Date(
                    defaultYear,
                    0,
                    0,
                    startTime.hours,
                    startTime.minutes,
                    0,
                ),
                weekDayIndex,
                { weekStartsOn: 1 },
            ).toISOString(),
            endTime: setDay(
                new Date(defaultYear, 0, 0, endTime.hours, endTime.minutes, 0),
                weekDayIndex,
                { weekStartsOn: 1 },
            ).toISOString(),
        };
        workTimes.push(workDay);
    }
    return workTimes;
};
