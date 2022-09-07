import React from "react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getRandomPatient } from "@core/mock/patiences";
import styled from "styled-components";
import { PatientEntity } from "@core/types/patient/IPatient";
import getAdminLayout from "components/layouts/adminLayout";

const AdminPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold capitalize">Расписание</h1>
                <div className="">
                    <button className="mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </button>
                    <button className=" text-purple-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    nowIndicator
                    dayHeaderClassNames="font-light text-left text-dark-grey w-full"
                    slotLabelClassNames="font-light text-left text-dark-grey w-full"
                    locale={{ code: "ru" }}
                    editable={true}
                    eventMinHeight={100}
                    allDaySlot={false}
                    titleFormat={{ month: "short", day: "numeric" }}
                    headerToolbar={{
                        start: "prev", // will normally be on the left. if RTL, will be on the right
                        center: "title",
                        end: "next", // will normally be on the right. if RTL, will be on the left
                    }}
                    expandRows={true}
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: true,
                    }}
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        omitZeroMinute: false,
                        meridiem: "short",
                    }}
                    slotMinTime={{ hours: 8 }}
                    slotMaxTime={{ hours: 21 }}
                    slotDuration={{ minutes: 30 }}
                    eventContent={renderEventContent}
                    initialEvents={[
                        {
                            extendedProps: {
                                patient: getRandomPatient(),
                                type: "upcoming",
                            },
                            title: "Первичный осмотр",
                            start: new Date(2021, 8, 24, 9, 0),
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                        },
                        {
                            extendedProps: {
                                patient: getRandomPatient(),
                                type: "upcoming",
                            },
                            title: "Первичный осмотр",
                            start: new Date(2021, 8, 25, 13, 0),
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                        },
                        {
                            extendedProps: {
                                patient: getRandomPatient(),
                                type: "canceled",
                            },
                            title: "Первичный осмотр",
                            start: new Date(2021, 8, 3, 8, 0),
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                        },
                        {
                            extendedProps: {
                                patient: getRandomPatient(),
                                type: "canceled",
                            },
                            title: "Первичный осмотр",
                            start: new Date(2021, 8, 23, 13, 0),
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                        },
                    ]}
                />
            </div>
        </div>
    );
};

interface EventTemplate {
    type: string;
    eventContainer: {
        backgroundColor: string;
        accentColor: string;
        contentColor: string;
    };
    subtitle: {
        icon?: JSX.Element;
        label: JSX.Element;
    };
}

interface EventTemplateDict {
    [key: string]: EventTemplate;
}
const eventTemplates: EventTemplateDict = {
    canceled: {
        type: "CANCELED",
        eventContainer: {
            backgroundColor: "#FFE5E5",
            accentColor: "#F6828C",
            contentColor: "#7e7e7e",
        },
        subtitle: {
            icon: (
                <>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </>
            ),
            label: (
                <p className="text-sm text-error font-light">Отмена пациента</p>
            ),
        },
    },
    upcoming: {
        type: "UPCOMING",
        eventContainer: {
            backgroundColor: "#F3E5FF",
            accentColor: "#6900CE",
            contentColor: "#000000",
        },
        subtitle: {
            label: (
                <p className="text-sm text-base-300 font-light">
                    Первичный прием
                </p>
            ),
        },
    },
};
const getTemplate = (type: string) => eventTemplates[type];

const renderEventContent = (eventInfo: EventContentArg) => {
    const { event } = eventInfo;
    const { patient, type }: { patient: PatientEntity; type: string } =
        event.extendedProps as any;
    const { eventContainer } = getTemplate(type);
    return (
        <EventContainer
            {...eventContainer}
            className="w-full h-full p-2 rounded flex flex-col justify-start    "
        >
            <div className="flex items-center justify-start mb-2">
                <div className="avatar w-8 mr-2">
                    <img
                        className="object-cover rounded-full"
                        src={patient?.avatarUrl}
                        alt="avatar"
                    />
                </div>
                <p className="text-sm truncate text-current  ">
                    {patient?.fullName}
                </p>
            </div>
            <EventSubtitle type={type} />
        </EventContainer>
    );
};

interface EventSubtitleProps {
    type: string;
}

const EventSubtitle: React.FC<EventSubtitleProps> = ({ type }) => {
    const subtitle = getTemplate(type)?.subtitle;
    return (
        <div className="flex items-center justify-start">
            {subtitle?.icon && (
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 text-error mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {subtitle?.icon}
                    </svg>
                </div>
            )}
            {subtitle?.label}
        </div>
    );
};

interface EventContainerProps {
    backgroundColor: string;
    accentColor: string;
    contentColor: string;
}

const EventContainer = styled.div<EventContainerProps>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-left: solid 12px ${({ accentColor }) => accentColor};
    color: ${({ contentColor }) => contentColor};
`;

export default AdminPage;
