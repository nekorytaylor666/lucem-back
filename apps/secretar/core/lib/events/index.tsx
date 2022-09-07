import { Booking, BookingProgress } from "@core/types/bookings/IBookings";
import { PatientEntity } from "../../types/patient/IPatient";

export class CalendarEvent {
    start: Date;
    title: string;
    patient: PatientEntity;
    type: BookingProgress;
    booking: Booking;
    service: any;

    constructor(booking: Booking) {
        this.title = booking.service.name;
        this.start = new Date(booking.startDate);
        this.patient = booking.user;
        this.service = booking.service;
        this.type = parseBookingProgress(
            booking.progress as keyof typeof bookingProgressHashMap,
        );
        this.booking = booking;
    }

    getEventTemplate(): EventTemplate | undefined {
        return getTemplate(this.type);
    }
}

interface EventTemplate {
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
const bookingProgressHashMap = {
    Ongoing: BookingProgress.ON,
    Upcoming: BookingProgress.UPCOMING,
    Done: BookingProgress.DONE,
    Canceled: BookingProgress.CANCELED,
};
const parseBookingProgress = (value: keyof typeof bookingProgressHashMap) => {
    return bookingProgressHashMap[value] ?? null;
};

const eventTemplateDict = new Map<BookingProgress, EventTemplate>([
    [
        BookingProgress.CANCELED,
        {
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
                    <p className="text-sm text-error font-light">
                        Отмена пациента
                    </p>
                ),
            },
        },
    ],
    [
        BookingProgress.ON,
        {
            eventContainer: {
                backgroundColor: "#eefaef",
                accentColor: "#8ff78b",
                contentColor: "#000000",
            },
            subtitle: {
                label: (
                    <p className="text-sm text-base-300 font-light">
                        Текущий прием
                    </p>
                ),
            },
        },
    ],
    [
        BookingProgress.UPCOMING,
        {
            eventContainer: {
                backgroundColor: "#F3E5FF",
                accentColor: "#6900CE",
                contentColor: "#000000",
            },
            subtitle: {},
        },
    ],
]);

export const getTemplate = (type: BookingProgress) =>
    eventTemplateDict.get(type);
