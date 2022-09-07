import React, { useEffect, useState } from "react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import styled from "styled-components";
import Modal from "components/atoms/Modal";
import { useRecoilState } from "recoil";
import {
    addDays,
    addMinutes,
    format,
    getHours,
    Locale,
    subDays,
    subYears,
} from "date-fns";
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
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";

import {
    getBookingsOfDoctor,
    getBookingsOfDoctorVariables,
} from "@graphqlTypes/getBookingsOfDoctor";
import { GET_UPCOMING_BOOKINGS } from "@src/api/queries/getUpcomingBookings";
import AppointmentModal from "components/atoms/AppointmentModal";
import { useAppointment } from "@recoil/hooks/useAppointment";
import { GET_DOCTORS_SEARCH } from "@src/api/queries/getDoctorSearch";
import { GetDoctorSearch } from "@graphqlTypes/GetDoctorSearch";
import { getUpcomingBookingsOfDoctor } from "@graphqlTypes/getUpcomingBookingsOfDoctor";
import { GetAppointmentBlanksOfUserVariables } from "@graphqlTypes/GetAppointmentBlanksOfUser";
import {
    GetBookingsByDate,
    GetBookingsByDateVariables,
} from "@graphqlTypes/GetBookingsByDate";
import { addMonths } from "date-fns";
import { useDisclosure } from "@chakra-ui/react";
import CalendarPage from "components/pages/CalendarPage/CalendarPage";
const CalendarPageContainer: React.FC = () => {
    return (
        <div>
            <CalendarPage></CalendarPage>
        </div>
    );
};

export default CalendarPageContainer;
