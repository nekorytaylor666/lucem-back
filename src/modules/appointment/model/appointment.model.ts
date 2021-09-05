import { Field, ObjectType } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { Appointment } from "./appointment.interface";


@ObjectType()
export class AppointmentGraph implements Modify<Appointment, {
    _id: string,
    serviceId: string,
    userId: string
}> {
    @Field()
    _id: string;
    
    @Field()
    serviceId: string;

    @Field()
    date: Date;

    @Field()
    userId: string;

    constructor(appointment: Partial<Appointment>) {
        if (appointment._id) this._id = appointment._id.toHexString();
        if (appointment.serviceId) this.serviceId = appointment.serviceId.toHexString();
        if (appointment.date) this.date = appointment.date;
        if (appointment.userId) this.userId = appointment.userId.toHexString();
    }
}