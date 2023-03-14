import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import TimeContainer from "components/atoms/TimeContainer";

// import helper Funcs
import {
    getTimeSlots,
    getDayName,
    getTime as getTimeFromStr,
} from "src/helper/";

import { useAppointment } from "@recoil/hooks";

import {
    getDay,
    getHours,
    setDay,
    format,
    setHours,
    getMinutes,
    setMinutes,
    addWeeks,
    isAfter,
    getDate,
    getTime,
} from "date-fns";
import { GetDoctorByID_getDoctorByID } from "@graphqlTypes/GetDoctorByID";
import ru from "date-fns/locale/ru";
import {
    GetAllDoctors_getAllDoctors,
    GetAllDoctors_getAllDoctors_upcomingBookings,
} from "@graphqlTypes/GetAllDoctors";
interface AppointmentTimetableProps {
    doctor: GetDoctorByID_getDoctorByID | GetAllDoctors_getAllDoctors;
}

const AppointmentTimetable: React.FC<AppointmentTimetableProps> = ({
    doctor,
}) => {
    // if (doctor === undefined || doctor === null) return <></>;
    if (!doctor) return <></>;

    const [appointmentData, { setAppointmentDoctor, setTime, setShow }] =
        useAppointment();

    const [selectedDay, setSelectedDay] = useState(0);

    const workWeekScheduleDeclaration = () => {
        const scheduleDeclaration = [];
        for (let weekIndex = 0; weekIndex < 3; weekIndex++) {
            const workWeekSchedule =
                convertWorkTimesToWorkWeekScheduleDeclaration(
                    doctor?.workTimes,
                    weekIndex,
                );
            scheduleDeclaration.push(workWeekSchedule);
        }
        console.log(scheduleDeclaration);
        return scheduleDeclaration.flat(1);
    };

    const workWeekSchedule = useMemo(
        () =>
            workWeekScheduleDeclaration().map((day) => {
                console.log("startTime:", day.startTime);
                const today = new Date();
                const currentStartTime = isAfter(day.startTime, today)
                    ? today
                    : day.startTime;
                const resettedStartTime = setMinutes(
                    currentStartTime,
                    getMinutes(currentStartTime) > 30 ? 30 : 0,
                );
                console.log(resettedStartTime);
                return getTimeSlots(
                    resettedStartTime,
                    day.endTime,
                    doctor.upcomingBookings,
                );
            }),
        [workWeekScheduleDeclaration],
    );

    const selectedWorkDaySchedule = useMemo(
        () => workWeekSchedule[selectedDay],
        [selectedDay],
    );

    const currentSelectedDay = format(
        new Date(selectedWorkDaySchedule?.[0]?.time?.start || new Date()),
        "EEEE, dd MMMM",
        {
            locale: ru,
        },
    );
    const handleDayChange = (index: number) => {
        const toDay = index > 0 ? selectedDay + 1 : selectedDay - 1;
        const toDaySchedule = workWeekSchedule[toDay];
        if (!toDaySchedule || toDaySchedule.length === 0) {
            return;
        }
        setSelectedDay(toDay);
    };
    return (
        <>
            <p className="text-gray-400 mb-2">Выберите время записи на прием</p>
            <div className="space-y-2">
                <div className="flex justify-between space-x-1">
                    <button
                        disabled={selectedDay === 0}
                        className="bg-gray-100 px-2 py-2 rounded cursor-pointer"
                        onClick={() => handleDayChange(-1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 17l-5-5m0 0l5-5m-5 5h12"
                            />
                        </svg>
                    </button>
                    <div className="flex bg-gray-100 items-center justify-center flex-1 rounded px-4 lg:px-12 py-2 space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-xs lg:text-base">
                            {currentSelectedDay}
                        </p>
                    </div>
                    <button
                        className="bg-gray-100 px-2 py-2 rounded cursor-pointer"
                        onClick={(event) => {
                            event.preventDefault();
                            handleDayChange(1);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </button>
                </div>
                <TimetableGrid>
                    {workWeekSchedule[selectedDay]?.map((val, i) => {
                        return (
                            <TimeContainer
                                key={i}
                                show={(() =>
                                    isAfter(
                                        new Date(val.time.start),
                                        new Date(),
                                    ))()}
                                setTime={() => {
                                    setTime({
                                        start: val?.time.start,
                                        end: val?.time.end,
                                    });
                                }}
                                setDoctor={() =>
                                    setAppointmentDoctor(doctor as any)
                                }
                                time={getTimeFromStr(val.time.start)}
                                isBooked={val.isBooked}
                                setShow={() => setShow(!appointmentData.show)}
                            />
                        );
                    })}
                </TimetableGrid>
            </div>
        </>
    );
};

const checkWorkTimes = (Component) => (props: AppointmentTimetableProps) => {
    const { doctor } = props;
    if (!doctor.workTimes) {
        return (
            <div className="h-full">
                <p className="text-gray-400 mb-2">
                    Нет доступного времени для записи
                </p>
                <div></div>
            </div>
        );
    }
    return <Component {...props} />;
};

const convertWorkTimesToWorkWeekScheduleDeclaration = (
    workTimes,
    addWeek = 0,
) => {
    return workTimes
        .map(({ startTime, endTime }) => {
            const weekStart = addWeeks(new Date(), addWeek);
            const today = new Date();
            const start = new Date(startTime);
            const end = new Date(endTime);

            const startHours = getHours(start);

            const endHours = getHours(end);

            const startMinutes = getMinutes(start);
            const endMinutes = getMinutes(end);
            const startWeekDay = getDay(start);

            const endWeekDay = getDay(end);

            const startDate = setDay(
                setHours(setMinutes(weekStart, startMinutes), startHours),
                startWeekDay,
            );

            const isAfterToday = isAfter(startDate, today);
            if (!isAfterToday) {
                return null;
            }
            return {
                startTime: setDay(
                    setHours(setMinutes(weekStart, startMinutes), startHours),
                    startWeekDay,
                ),
                endTime: setDay(
                    setHours(setMinutes(weekStart, endMinutes), endHours),
                    endWeekDay,
                ),
            };
        })
        .filter((val) => val);
};

export default checkWorkTimes(AppointmentTimetable);

const TimetableGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    grid-gap: 0.5rem;
`;
