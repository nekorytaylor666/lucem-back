import { Booking } from "src/modules/booking/model/booking.interface";
import { Session } from "./session.interface";


export interface SessionAddictive extends Session {
    booking?: Booking;
}