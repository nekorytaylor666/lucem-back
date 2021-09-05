import { Field, ObjectType } from "@nestjs/graphql";
import { Appointment } from "src/modules/appointment/model/appointment.interface";
import { AppointmentGraph } from "src/modules/appointment/model/appointment.model";
import { Modify } from "src/utils/modifyType";
import { Schedule } from "./schedule.interface";


@ObjectType()
export class ScheduleGraph implements Modify<Schedule, {
    _id: string,
    appointmentIds: string[],
    doctorId: string
}>{
    @Field()
    _id: string;

    @Field()
    date: Date;

    @Field(() => [String])
    appointmentIds: string[];

    @Field(() => [AppointmentGraph])
    appointments: AppointmentGraph[];

    @Field()
    doctorId: string;

    constructor(schedule: Partial<Schedule> & { appointments?: Appointment[] }) {
        if (schedule._id) this._id = schedule._id.toHexString()
        if (schedule.date) this.date = schedule.date;
        if (schedule.appointmentIds) this.appointmentIds = schedule.appointmentIds.map((val) => val.toHexString());
        if (schedule.doctorId) this.doctorId = schedule.doctorId.toHexString();
        if (schedule.appointments) this.appointments = schedule.appointments.map((val) => new AppointmentGraph({...val}))
    }
}