import { Service } from "src/modules/service/model/service.interface";
import { User } from "src/modules/user/model/user.interface";
import { Appointment } from "./appointment.interface";


export interface AppointmentAddictive extends Appointment {
    service?: Service,
    user?: User;
}
