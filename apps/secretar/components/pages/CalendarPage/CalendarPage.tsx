import React, { useEffect, useState } from "react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import styled from "styled-components";
import Modal from "components/atoms/Modal";
import { useRecoilState } from "recoil";
import { format, getHours, subYears } from "date-fns";
import ru from "date-fns/locale/ru";
import { useRouter } from "next/router";
import { doctorEventsState } from "@recoil/atoms/doctorEvents";
import { CalendarEvent, getTemplate } from "@core/lib/events";
import { PatientEntity } from "@core/types/patient/IPatient";
import { BookingProgress } from "@core/types/bookings/IBookings";
import Link from "next/link";
import { startSessionMutation } from "@src/api/mutations/session";
import { getDoctorTokens } from "@src/utils/getToken";
import { useQuery } from "@apollo/client";
import { cancelBooking } from "@src/api/mutations/cancel-bookings";
import { GET_UPCOMING_BOOKINGS } from "@src/api/queries/getUpcomingBookings";
import AppointmentModal from "components/atoms/AppointmentModal";
import { useAppointment } from "@recoil/hooks/useAppointment";
import { GET_DOCTORS_SEARCH } from "@src/api/queries/getDoctorSearch";
import { GetDoctorSearch } from "@graphqlTypes/GetDoctorSearch";
import {
    GetBookingsByDate,
    GetBookingsByDateVariables,
} from "@graphqlTypes/GetBookingsByDate";
import { addMonths } from "date-fns";
import { useDisclosure } from "@chakra-ui/react";
import { AppointmentDetailModal } from "./components/AppointmentDetailModal";
import AppointmentFinishModal from "./components/AppointmentFinishModal";
import { useGetBookingsByDateQuery, Booking, Maybe } from "@lucem/shared-gql";
import { EventDataDTO } from "./types/calendarTypes";

const CalendarPage: React.FC = () => {
    const { token, doctorId } = getDoctorTokens();
    const [showPatientDetailsModal, setShowPatientDetailsModal] =
        useState(false);
    const [eventDetailsModalData, setEventDetailsModalData] =
        useState<EventDataDTO | null>(null);
    const [today, setToday] = useState(new Date());
    const [events, setEvents] = useRecoilState(doctorEventsState);
    const router = useRouter();
    const [appointmentData, { setAppointmentDoctor, setTime, setShow }] =
        useAppointment();
    const {
        isOpen: isOpenFinishEvent,
        onClose: onCloseFinishEvent,
        onOpen: onOpenFinishEvent,
    } = useDisclosure();

    const { data: bookingsRes, loading: bookingsLoading } =
        useGetBookingsByDateQuery({
            variables: {
                firstDate: subYears(today, 1),

                secondDate: addMonths(today, 1),
            },
            context: {
                // example of setting the headers with context per operation
                headers: {
                    Authorization: token,
                },
            },
        });

    console.log(bookingsRes?.getBookingsByDate);
    const { data, loading: patientLoading } =
        useQuery<GetDoctorSearch>(GET_DOCTORS_SEARCH);
    const bookings: Booking[] = bookingsRes?.getBookingsByDate;

    const onStartSession = async (event: any) => {
        await startSessionMutation(
            { bookingId: event.bookingId },
            { token: token },
        );
        setShowPatientDetailsModal(false);
    };
    const doctors = data?.getAllDoctors;
    useEffect(() => {
        if (events.length === 0) {
            if (bookings && !bookingsLoading)
                setEvents(convertBookingToEvents(bookings));
        }
        setAppointmentDoctor(null);
    }, [bookings, bookingsLoading, patientLoading, doctors]);
    useEffect(() => {
        if (bookings && !bookingsLoading) {
            if (!appointmentData.doctor) {
                return setEvents(convertBookingToEvents(bookings));
            }
            const curDoctorId = appointmentData?.doctor?._id;

            setEvents(
                convertBookingToEvents(
                    bookings.filter((b) => {
                        return b.doctor?._id === curDoctorId;
                    }),
                ),
            );
        }
    }, [appointmentData.doctor]);

    if (bookingsLoading || patientLoading) {
        return <div>Loading</div>;
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className=" flex flex-col">
                    <h1 className="text-4xl font-bold capitalize">
                        Расписание
                    </h1>
                    <div className=" form-control">
                        <label className=" label">Выберите доктора</label>
                        <select
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    return setAppointmentDoctor(null);
                                }
                                const selectedIndex = e.target.value;

                                setAppointmentDoctor(doctors[selectedIndex]);
                                console.log(doctors[selectedIndex]);
                            }}
                            className="select select-bordered"
                            id="doctors"
                        >
                            <option value="">Все</option>
                            {doctors?.map((doctor, index) => (
                                <option value={index}>{doctor.fullName}</option>
                            ))}
                        </select>
                    </div>
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
                    slotMinTime={{
                        hours: appointmentData?.doctor
                            ? getHours(
                                  new Date(
                                      appointmentData?.doctor?.workTimes?.[0]?.startTime,
                                  ),
                              )
                            : 6,
                    }}
                    slotMaxTime={{
                        hours: appointmentData?.doctor
                            ? getHours(
                                  new Date(
                                      appointmentData?.doctor?.workTimes?.[0]?.endTime,
                                  ),
                              )
                            : 21,
                    }}
                    slotDuration={{ minutes: 30 }}
                    eventContent={renderEventContent}
                    eventClick={({ event }) => {
                        if (event.extendedProps.type === "On") {
                            setEventDetailsModalData({
                                patient: event?.extendedProps
                                    ?.patient as PatientEntity,
                                startDate: event?.start ?? new Date(),
                                title: event.title,
                                bookingId: event?.extendedProps?.booking?._id,
                            });
                            return onOpenFinishEvent();
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
            <AppointmentModal></AppointmentModal>
            <AppointmentFinishModal
                eventData={eventDetailsModalData}
                isOpen={isOpenFinishEvent}
                onClose={onCloseFinishEvent}
            ></AppointmentFinishModal>
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

const renderEventContent = (eventInfo: EventContentArg) => {
    const { event } = eventInfo;
    const { type, patient, service, booking } = event.extendedProps as {
        type: BookingProgress;
        patient: PatientEntity;
        service: any;
    };
    console.log("props:", event.extendedProps);
    const eventTemplate = getTemplate(type) ?? null;
    return (
        eventTemplate && (
            <EventContainer
                {...eventTemplate.eventContainer}
                className="w-full h-full p-2 rounded flex flex-col justify-start    "
            >
                <div className="flex items-start justify-start mb-2 flex-col gap-1">
                    <p className="text-sm truncate text-current  flex flex-col ">
                        <span>Пациент:</span>
                        {patient?.fullName}
                    </p>
                    <p className="text-sm truncate text-current font-medium  flex flex-col">
                        <span>Доктор:</span>
                        {booking?.doctor?.fullName}
                    </p>
                </div>
                <EventSubtitle service={service} type={type} />
            </EventContainer>
        )
    );
};

interface EventSubtitleProps {
    type: BookingProgress;
    service: any;
}

const EventSubtitle: React.FC<EventSubtitleProps> = ({ type, service }) => {
    const subtitle = getTemplate(type)?.subtitle;
    console.log("service:", service);
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
            <div className="flex flex-col gap-2">
                {subtitle?.label}
                {service?.name}
            </div>
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

export default CalendarPage;
