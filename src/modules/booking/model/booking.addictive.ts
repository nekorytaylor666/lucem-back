import { Service } from "src/modules/service/model/service.interface";
import { Timeline } from "src/modules/timeline/model/timeline.interface";
import { User } from "src/modules/user/model/user.interface";
import { Booking } from "./booking.interface";


export interface BookingAddictive extends Omit<Booking, "serviceId" | "timelineId" | "userId"> {
    service?: Service;
    timeline?: Timeline;
    user?: User;
}