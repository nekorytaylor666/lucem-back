import React from "react";
import styled from "styled-components";
import TimeContainer from "../../atoms/TimeContainer";

interface AppointmentTimetableProps {
    showModal: boolean;
    setShowModal: any;
}

export const AppointmentTimetable: React.FC<AppointmentTimetableProps> = ({
    showModal,
    setShowModal,
}) => {
    const mockTimes = [
        { time: "13:00", isBooked: false },
        { time: "13:30", isBooked: true },
        { time: "14:00", isBooked: false },
        { time: "14:30", isBooked: false },
        { time: "15:00", isBooked: true },
        { time: "15:30", isBooked: true },
        { time: "16:00", isBooked: false },
        { time: "16:30", isBooked: true },
        { time: "17:00", isBooked: false },
        { time: "17:00", isBooked: true },
        { time: "17:00", isBooked: false },
    ];
    return (
        <>
            <p className="text-gray-400 mb-2">Выберите время записи на прием</p>
            <div className="space-y-2">
                <div className="flex justify-between space-x-1">
                    <div className="bg-gray-100 px-2 py-2 rounded cursor-pointer">
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
                    </div>
                    <div className="flex bg-gray-100 items-center justify-center flex-1 rounded px-12 py-2 space-x-2">
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
                        <p>Сегодня, 30.07.2021</p>
                    </div>
                    <div className="bg-gray-100 px-2 py-2 rounded cursor-pointer">
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
                    </div>
                </div>
                <TimetableGrid className="">
                    {mockTimes.map((val, i) => {
                        return (
                            <TimeContainer
                                key={i}
                                time={val.time}
                                isBooked={val.isBooked}
                                show={showModal}
                                setShow={setShowModal}
                            />
                        );
                    })}
                </TimetableGrid>
            </div>
        </>
    );
};

const TimetableGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    grid-gap: 0.5rem;
`;
