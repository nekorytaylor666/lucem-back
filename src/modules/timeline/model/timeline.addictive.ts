import { Booking } from "src/modules/booking/model/booking.interface";
import { Doctor } from "src/modules/doctor/model/doctor.interface";
import { Timeline } from "./timeline.interface";


export interface TimelineAddictive extends Timeline {
    doctor?: Doctor,
    booking?: Booking[];
}