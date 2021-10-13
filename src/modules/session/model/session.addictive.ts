import { Booking } from "src/modules/booking/model/booking.interface";
import { Doctor } from "src/modules/doctor/model/doctor.interface";
import { User } from "src/modules/user/model/user.interface";
import { Session } from "./session.interface";


export interface SessionAddictive extends Session {
    booking?: Booking;

}