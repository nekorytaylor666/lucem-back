import { AppointmentAddictive } from "src/modules/appointment/model/appointment.addictive";
import { Appointment } from "src/modules/appointment/model/appointment.interface";
import { DoctorAddictives } from "src/modules/doctor/model/doctor.addictives";
import { Schedule } from "./schedule.interface";

export interface ScheduleAddictives extends Schedule {
    appointments?: AppointmentAddictive[],
    doctor?: DoctorAddictives
};