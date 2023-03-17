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
    isActive: boolean;
}

export const createWorkTimesFromStartEndTimes = (
    workTimes: WorkTime[],
): WorkTime[] => {
    const lastWorkDayIndex = 7;
    const defaultYear = 2020;

    const payload = workTimes.map((el, weekDayIndex) => {
        const startTime = parseTime(el.startTime);
        const endTime = parseTime(el.endTime);
        console.log("payloa item", el.isActive);
        return {
            startTime: setDay(
                setHours(
                    setMinutes(new Date(), startTime.minutes),
                    startTime.hours,
                ),
                weekDayIndex,
                { weekStartsOn: 0 },
            ).toISOString(),
            endTime: setDay(
                setHours(
                    setMinutes(new Date(), endTime.minutes),
                    endTime.hours,
                ),
                weekDayIndex,
                { weekStartsOn: 0 },
            ).toISOString(),
            isActive: el.isActive,
        };
    });
    // for (
    //     //start from monday
    //     let weekDayIndex = 0;
    //     weekDayIndex < lastWorkDayIndex;
    //     weekDayIndex++
    // ) {
    //     //we are setting hours and minutes in Date UTC constructor to avoid timezone issues. Set day of date fns is for weekday since we are setting day of week
    //     const workDay = {
    //         startTime: setDay(
    //             new Date(
    //                 defaultYear,
    //                 0,
    //                 0,
    //                 startTime.hours,
    //                 startTime.minutes,
    //                 0,
    //             ),
    //             weekDayIndex,
    //             { weekStartsOn: 1 },
    //         ).toISOString(),
    //         endTime: setDay(
    //             new Date(defaultYear, 0, 0, endTime.hours, endTime.minutes, 0),
    //             weekDayIndex,
    //             { weekStartsOn: 1 },
    //         ).toISOString(),
    //     };
    //     workTimes.push(workDay);
    // }
    return payload;
};
