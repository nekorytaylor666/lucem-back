import { Booking } from "./booking";

export interface Session {
    _id: string;
    booking: Booking;
    count: number;
    endDate: string;
    startDate: string;
}
