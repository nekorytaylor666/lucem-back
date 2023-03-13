import { GetAllDoctors_getAllDoctors_upcomingBookings } from "@graphqlTypes/GetAllDoctors";
import { addHours, addMinutes, getHours, format } from "date-fns";

export const getTimeSlots = (
    startDate: string | Date,
    endDate: string | Date,
    upcomingBookings: GetAllDoctors_getAllDoctors_upcomingBookings[],
): { time: { start: string; end: string }; isBooked: boolean }[] => {
    const bookings = upcomingBookings?.map((booking) => {
        return {
            startDate: booking.startDate,
            endDate: booking.endDate,
            id: booking._id,
            formatedStartDate: format(
                new Date(booking.startDate),
                "HH:mm dd/MM/yyyy",
            ),
        };
    });
    const timeSlots = [];
    const startHours = new Date(startDate).getUTCHours();
    const endHours = new Date(endDate).getUTCHours();
    const periods =
        endHours > startHours
            ? Math.ceil(endHours - startHours)
            : Math.ceil(startHours - endHours);
    const date = new Date(startDate);

    for (let i = 0; i < periods * 2; i++) {
        const timeslot = {
            time: {
                start: addMinutes(date, i * 30).toISOString(),
                end: addMinutes(addHours(date, i), 30).toISOString(),
            },
        };
        const formattedTimeSlot = format(
            new Date(timeslot.time.start),
            "HH:mm dd/MM/yyyy",
        );
        const isBooked = bookings?.some(
            (booking) => formattedTimeSlot === booking.formatedStartDate,
        );
        timeSlots.push({
            ...timeslot,
            isBooked,
        });
    }

    return timeSlots;
};
