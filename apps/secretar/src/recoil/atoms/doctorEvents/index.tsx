import { Booking, BookingProgress } from "@core/types/bookings/IBookings";
import { PatientEntity } from "@core/types/patient/IPatient";
import { DateInput } from "@fullcalendar/react";
import { atom } from "recoil";
export interface FullCalendarEvent {
    title: string;
    backgroundColor: string;
    borderColor: string;
    start: DateInput | undefined;
    extendedProps: {
        patient: PatientEntity;
        type: BookingProgress;
        booking: Booking;
    };
}

export const doctorEventsState = atom<FullCalendarEvent[]>({
    key: "doctorEventsState",
    default: [],
});
