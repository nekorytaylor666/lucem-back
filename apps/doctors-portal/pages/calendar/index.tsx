import React, { useEffect, useState } from "react";

import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import styled from "styled-components";
import Modal from "components/atoms/Modal";
import { useRecoilState } from "recoil";
import { addDays, format, Locale, subDays, subYears } from "date-fns";
import ru from "date-fns/locale/ru";
import { useRouter } from "next/router";
import { doctorEventsState } from "@recoil/atoms/doctorEvents";
import {
    GET_BOOKINGS_OF_DOCTOR,
    GET_UPCOMING_QUERIES,
} from "src/api/queries/bookings";
import { CalendarEvent, getTemplate } from "@core/lib/events";
import { PatientEntity } from "@core/types/patient/IPatient";
import { Booking, BookingProgress } from "@core/types/bookings/IBookings";
import Link from "next/link";
import { startSessionMutation } from "@src/api/mutations/session";
import { getDoctorTokens } from "@src/utils/getToken";
import { useQuery } from "@apollo/client";
import { cancelBooking } from "@src/api/mutations/cancel-bookings";
import {
    getBookingsOfDoctor,
    getBookingsOfDoctorVariables,
} from "@graphqlTypes/getBookingsOfDoctor";

const AdminPage: React.FC = () => {
    const { token, doctorId } = getDoctorTokens();
    const [showPatientDetailsModal, setShowPatientDetailsModal] =
        useState(false);
    const [eventDetailsModalData, setEventDetailsModalData] =
        useState<EventDataDTO | null>(null);
    const [today, setToday] = useState(new Date());

    const [events, setEvents] = useRecoilState(doctorEventsState);
    const router = useRouter();
    const { data: bookingsRes, loading: bookingsLoading } = useQuery<
        getBookingsOfDoctor,
        getBookingsOfDoctorVariables
    >(GET_BOOKINGS_OF_DOCTOR, {
        variables: {
            doctorId,
            firstDate: subYears(today, 1),

            secondDate: addDays(today, 14),
        },
        context: {
            // example of setting the headers with context per operation
            headers: {
                Authorization: token,
            },
        },
    });

    const bookings = bookingsRes?.getBookingsByDoctorIdAndDates;
    const onStartSession = async (event: any) => {
        await startSessionMutation(
            { bookingId: event.bookingId },
            { token: token },
        );
        setShowPatientDetailsModal(false);
    };

    useEffect(() => {
        if (events.length === 0) {
            if (bookings && !bookingsLoading)
                setEvents(convertBookingToEvents(bookings));
        }
    }, [bookings, bookingsLoading]);
    if (bookingsLoading) {
        return <div>Loading</div>;
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold capitalize">Расписание</h1>
                {/* <div className="">
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
                </div> */}
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
                    slotMinTime={{ hours: 0 }}
                    slotMaxTime={{ hours: 24 }}
                    slotDuration={{ minutes: 30 }}
                    eventContent={renderEventContent}
                    eventClick={({ event }) => {
                        if (event.extendedProps.type === "On") {
                            return router.push(
                                `/patients/${event.extendedProps.patient._id}`,
                            );
                        }
                        if (event.extendedProps.type !== "Upcoming") return;
                        setShowPatientDetailsModal(true);
                        setEventDetailsModalData({
                            patient: event?.extendedProps
                                ?.patient as PatientEntity,
                            startDate: event?.start ?? new Date(),
                            title: event.title,
                            bookingId: event?.extendedProps?.booking?._id,
                        });
                    }}
                    events={events}
                />
            </div>
            {eventDetailsModalData && (
                <AppointmentDetailModal
                    active={showPatientDetailsModal}
                    eventData={eventDetailsModalData}
                    onClose={() => setShowPatientDetailsModal(false)}
                    onSessionStart={(event) => {
                        onStartSession(event);
                        setShowPatientDetailsModal(false);
                    }}
                    onSessionCancel={async (event) => {
                        await cancelBooking(event.bookingId, token);
                        alert("Запись отменена");
                        setShowPatientDetailsModal(false);
                    }}
                ></AppointmentDetailModal>
            )}
        </div>
    );
};

const convertBookingToEvents = (bookings: Booking[]) => {
    const calendarEvents = bookings.map(
        (booking) => new CalendarEvent(booking),
    );
    return calendarEvents.map(({ title, start, ...extendedProps }) => {
        return {
            title,
            backgroundColor: "transparent",
            borderColor: "transparent",
            start,
            extendedProps: { ...extendedProps },
        };
    });
};
interface EventDataDTO {
    title: string;
    startDate: Date;
    patient: PatientEntity;
    bookingId: string;
}
interface AppointmentDetailModalProps {
    active: boolean;
    eventData: EventDataDTO;
    onClose: () => void;
    onSessionStart: (eventData: EventDataDTO) => void;
    onSessionCancel: (eventData: EventDataDTO) => void;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({
    active,
    eventData,
    onClose,
    onSessionStart,
    onSessionCancel,
}) => {
    return (
        <Modal active={active}>
            <div className="w-2/5 bg-light-grey relative p-6 rounded-lg">
                <button
                    onClick={onClose}
                    className="btn btn-ghost p-0 absolute top-0 right-0 m-4"
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div>
                    <h3 className="font-medium text-xl">Первичный прием</h3>
                    <p>
                        {format(eventData.startDate, "dd.MM.yyyy hh:mm", {
                            locale: ru,
                        })}
                    </p>
                    <div className=" shadow-xl w-full flex items-center justify-between p-4 rounded-md mb-4">
                        <div className="flex items-center">
                            <div className="flex flex-col items-start">
                                <p className="font-medium text-xl">
                                    {eventData.patient.fullName}
                                </p>
                                <p>{eventData.patient.phoneNumber}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-base-300">Мужчина, 23 года</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href={`/patients/${eventData.patient._id}`}>
                            <div
                                onClick={() => {
                                    onSessionStart(eventData);
                                }}
                                className="btn btn-primary py-2 text-lg text-center"
                            >
                                Перейти к пациенту
                            </div>
                        </Link>
                        <button
                            onClick={() => onSessionCancel(eventData)}
                            className="btn btn-outline btn-primary py-2 text-lg"
                        >
                            Отменить прием
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const renderEventContent = (eventInfo: EventContentArg) => {
    const { event } = eventInfo;
    const { type, patient } = event.extendedProps as {
        type: BookingProgress;
        patient: PatientEntity;
    };
    const eventTemplate = getTemplate(type) ?? null;
    return (
        eventTemplate && (
            <EventContainer
                {...eventTemplate.eventContainer}
                className="w-full h-full p-2 rounded flex flex-col justify-start    "
            >
                <div className="flex items-center justify-start mb-2">
                    <p className="text-sm truncate text-current  ">
                        {patient?.fullName}
                    </p>
                </div>
                <EventSubtitle type={type} />
            </EventContainer>
        )
    );
};

interface EventSubtitleProps {
    type: BookingProgress;
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
