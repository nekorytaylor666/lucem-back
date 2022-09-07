import { Booking } from "./booking";

export interface Timeline {
    _id: string;
    booking?: Booking[];
    endDate: string;
    startDate: string;
}
